import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import sharp from 'sharp';

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

export interface UploadOptions {
  folder?: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  generateThumbnail?: boolean;
}

// Helper function to generate unique filename
function generateUniqueFilename(originalName: string, folder?: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  const sanitizedName = originalName
    .split('.')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .substring(0, 50);
  
  const filename = `${sanitizedName}-${timestamp}-${randomString}.${extension}`;
  return folder ? `${folder}/${filename}` : filename;
}

// Upload image to DigitalOcean Spaces
export async function uploadImage(
  buffer: Buffer,
  originalName: string,
  options: UploadOptions = {}
): Promise<{ url: string; thumbnailUrl?: string }> {
  const {
    folder = 'uploads',
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 85,
    generateThumbnail = true,
  } = options;

  try {
    // Process main image
    const processedImage = await sharp(buffer)
      .resize(maxWidth, maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality })
      .toBuffer();

    // Generate unique filename
    const filename = generateUniqueFilename(originalName, folder);
    const webpFilename = filename.replace(/\.[^.]+$/, '.webp');

    // Upload main image
    const uploadCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: webpFilename,
      Body: processedImage,
      ContentType: 'image/webp',
      ACL: 'public-read',
      CacheControl: 'public, max-age=31536000',
    });

    await s3Client.send(uploadCommand);
    const imageUrl = `${CDN_URL}/${webpFilename}`;

    // Generate and upload thumbnail if requested
    let thumbnailUrl: string | undefined;
    if (generateThumbnail) {
      const thumbnail = await sharp(buffer)
        .resize(400, 300, {
          fit: 'cover',
          position: 'center',
        })
        .webp({ quality: 70 })
        .toBuffer();

      const thumbnailFilename = webpFilename.replace(/\.webp$/, '-thumb.webp');
      
      const thumbnailCommand = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: thumbnailFilename,
        Body: thumbnail,
        ContentType: 'image/webp',
        ACL: 'public-read',
        CacheControl: 'public, max-age=31536000',
      });

      await s3Client.send(thumbnailCommand);
      thumbnailUrl = `${CDN_URL}/${thumbnailFilename}`;
    }

    return { url: imageUrl, thumbnailUrl };
  } catch (error) {
    console.error('Error uploading image to DigitalOcean Spaces:', error);
    throw new Error('Failed to upload image');
  }
}

// Upload multiple images
export async function uploadMultipleImages(
  files: { buffer: Buffer; originalName: string }[],
  options: UploadOptions = {}
): Promise<{ url: string; thumbnailUrl?: string }[]> {
  const uploadPromises = files.map((file) =>
    uploadImage(file.buffer, file.originalName, options)
  );
  
  return Promise.all(uploadPromises);
}

// Delete image from DigitalOcean Spaces
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Extract key from CDN URL
    const key = imageUrl.replace(`${CDN_URL}/`, '');
    
    const deleteCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(deleteCommand);

    // Also try to delete thumbnail if it exists
    const thumbnailKey = key.replace(/\.webp$/, '-thumb.webp');
    const deleteThumbnailCommand = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: thumbnailKey,
    });
    
    try {
      await s3Client.send(deleteThumbnailCommand);
    } catch (error) {
      // Thumbnail might not exist, ignore error
    }
  } catch (error) {
    console.error('Error deleting image from DigitalOcean Spaces:', error);
    throw new Error('Failed to delete image');
  }
}

// Generate presigned URL for direct upload (optional, for large files)
export async function generatePresignedUploadUrl(
  filename: string,
  folder: string = 'uploads'
): Promise<string> {
  const key = generateUniqueFilename(filename, folder);
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ACL: 'public-read',
  });

  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600, // 1 hour
  });

  return presignedUrl;
}

// Validate file type
export function isValidImageType(filename: string): boolean {
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const extension = filename.split('.').pop()?.toLowerCase();
  return validExtensions.includes(extension || '');
}

// Validate file size (in bytes)
export function isValidFileSize(sizeInBytes: number, maxSizeInMB: number = 10): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return sizeInBytes <= maxSizeInBytes;
}