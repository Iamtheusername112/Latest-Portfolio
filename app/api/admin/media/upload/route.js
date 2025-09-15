import { NextResponse } from 'next/server';
import { MediaService } from '@/lib/db/services/media-service.js';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // For now, we'll create a placeholder URL since we don't have actual file storage
    // In a real app, you'd upload to AWS S3, Cloudinary, or similar service
    const fileType = file.type.startsWith('image/') ? 'image' : 
                    file.type.startsWith('video/') ? 'video' : 'document';
    
    const fileExtension = file.name.split('.').pop();
    const fileName = file.name.replace(/\.[^/.]+$/, '');
    const fileSize = Math.round(file.size / 1024); // KB
    
    // Create unique filename to avoid conflicts
    const timestamp = Date.now();
    const uniqueFileName = `${fileName}_${timestamp}.${fileExtension}`;
    
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }
    
    // Save file to public/uploads directory
    const filePath = path.join(uploadsDir, uniqueFileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    
    // Create URL for the saved file
    const fileUrl = `/uploads/${uniqueFileName}`;
    
    const mediaFileData = {
      name: file.name,
      type: fileType,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      url: fileUrl,
      alt: `${fileName} - uploaded file`,
      category: fileType === 'image' ? 'projects' : fileType
    };

    console.log('Creating media file:', mediaFileData);
    
    const newMediaFile = await MediaService.createMediaFile(mediaFileData);
    
    return NextResponse.json(newMediaFile);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload file',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
