import { NextRequest, NextResponse } from 'next/server';
import { 
  uploadImage, 
  uploadMultipleImages, 
  isValidImageType, 
  isValidFileSize 
} from '@/lib/digitalocean-spaces';

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
    const files = formData.getAll('images') as File[];
    const folder = formData.get('folder') as string || 'uploads';
    const type = formData.get('type') as string || 'general';

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

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Validate files
    const maxFileSize = 100; // MB
    for (const file of files) {
      if (!isValidImageType(file.name)) {
        return NextResponse.json(
          { error: `Invalid file type: ${file.name}. Only images are allowed.` },
          { status: 400 }
        );
      }

      if (!isValidFileSize(file.size, maxFileSize)) {
        return NextResponse.json(
          { error: `File too large: ${file.name}. Maximum size is ${maxFileSize}MB.` },
          { status: 400 }
        );
      }
    }

    // Convert files to buffers
    const fileBuffers = await Promise.all(
      files.map(async (file) => ({
        buffer: Buffer.from(await file.arrayBuffer()),
        originalName: file.name,
      }))
    );

    // Set upload options based on type
    const uploadOptions = {
      folder: `${folder}/${type}`,
      maxWidth: type === 'thumbnail' ? 800 : 1920,
      maxHeight: type === 'thumbnail' ? 600 : 1080,
      quality: type === 'thumbnail' ? 75 : 85,
      generateThumbnail: type !== 'thumbnail',
    };

    // Upload single or multiple images
    if (files.length === 1) {
      const result = await uploadImage(
        fileBuffers[0].buffer,
        fileBuffers[0].originalName,
        uploadOptions
      );
      
      return NextResponse.json({
        success: true,
        data: result,
      });
    } else {
      const results = await uploadMultipleImages(fileBuffers, uploadOptions);
      
      return NextResponse.json({
        success: true,
        data: results,
      });
    }
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}

// Delete image endpoint
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const authToken = request.cookies.get('auth-token')?.value;
    if (!authToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Only allow deletion of images from our CDN
    const cdnUrl = process.env.AWS_LOCATION_CDN || 'https://infrascapes-website.blr1.cdn.digitaloceanspaces.com';
    if (!imageUrl.startsWith(cdnUrl)) {
      return NextResponse.json(
        { error: 'Can only delete images from our CDN' },
        { status: 400 }
      );
    }

    const { deleteImage } = await import('@/lib/digitalocean-spaces');
    await deleteImage(imageUrl);

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
}
