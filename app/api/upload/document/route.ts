import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client for DigitalOcean Spaces
const s3Client = new S3Client({
  endpoint: process.env.AWS_S3_ENDPOINT_URL || 'https://blr1.digitaloceanspaces.com',
  region: process.env.AWS_S3_REGION_NAME || 'blr1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_STORAGE_BUCKET_NAME || 'infrascapes-website';
const CDN_URL = process.env.AWS_LOCATION_CDN || 'https://infrascapes-website.blr1.cdn.digitaloceanspaces.com';

// Validate file type
function isValidDocumentType(filename: string): boolean {
  const validExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
  const extension = filename.split('.').pop()?.toLowerCase();
  return validExtensions.includes(extension || '');
}

// Generate unique filename
function generateUniqueFilename(originalName: string, folder: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop()?.toLowerCase() || 'pdf';
  const sanitizedName = originalName
    .split('.')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .substring(0, 50);
  
  return `${folder}/${sanitizedName}-${timestamp}-${randomString}.${extension}`;
}

// Get content type based on file extension
function getContentType(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();
  const contentTypes: { [key: string]: string } = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  };
  return contentTypes[extension || ''] || 'application/octet-stream';
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication in production
    if (process.env.NODE_ENV === 'production') {
      const authToken = request.cookies.get('auth-token')?.value;
      if (!authToken) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const formData = await request.formData();
    const file = formData.get('document') as File;
    const folder = formData.get('folder') as string || 'documents';

    const missing: string[] = [];
    if (!process.env.AWS_ACCESS_KEY_ID) missing.push('AWS_ACCESS_KEY_ID');
    if (!process.env.AWS_SECRET_ACCESS_KEY) missing.push('AWS_SECRET_ACCESS_KEY');
    if (!process.env.AWS_STORAGE_BUCKET_NAME) missing.push('AWS_STORAGE_BUCKET_NAME');
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required environment variables: ${missing.join(', ')}` },
        { status: 500 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!isValidDocumentType(file.name)) {
      return NextResponse.json(
        { error: `Invalid file type: ${file.name}. Only PDF and Office documents are allowed.` },
        { status: 400 }
      );
    }

    // Validate file size (100MB max for documents)
    const maxSizeInMB = 100;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return NextResponse.json(
        { error: `File too large: ${file.name}. Maximum size is ${maxSizeInMB}MB.` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Generate unique filename
    const filename = generateUniqueFilename(file.name, folder);
    const contentType = getContentType(file.name);

    // Upload to DigitalOcean Spaces
    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: buffer,
      ContentType: contentType,
      ACL: 'public-read',
      CacheControl: 'public, max-age=31536000',
      ContentDisposition: `inline; filename="${file.name}"`,
    });

    await s3Client.send(uploadCommand);
    const documentUrl = `${CDN_URL}/${filename}`;

    return NextResponse.json({
      success: true,
      data: {
        url: documentUrl,
        filename: file.name,
        size: file.size,
        type: contentType,
      },
    });
  } catch (error: any) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload document' },
      { status: 500 }
    );
  }
}
