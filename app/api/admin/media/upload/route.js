import { NextResponse } from 'next/server';
import { MediaService } from '@/lib/db/services/media-service.js';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { AuthService } from '@/lib/db/services/auth-service.js';

export async function POST(request) {
  try {
    console.log('🔍 Upload route called');
    console.log('🍪 Cookies:', Object.fromEntries(request.cookies.getAll().map(cookie => [cookie.name, cookie.value])));
    console.log('🔑 Admin token:', request.cookies.get('admin-token')?.value ? 'Present' : 'Missing');
    
    // Manual authentication check since middleware might be causing issues
    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
      console.log('❌ No token found in upload route');
      return NextResponse.json(
        { error: 'Authentication required', message: 'No admin token provided' },
        { status: 401 }
      );
    }

    // Verify token
    try {
      const authResult = await AuthService.verifyToken(token);
      if (!authResult.success || authResult.user.role !== 'admin') {
        console.log('❌ Token verification failed in upload route:', authResult);
        return NextResponse.json(
          { error: 'Access denied', message: 'Admin privileges required' },
          { status: 403 }
        );
      }
      console.log('✅ Authentication successful in upload route');
    } catch (authError) {
      console.error('❌ Auth error in upload route:', authError);
      return NextResponse.json(
        { error: 'Authentication failed', message: 'Token verification failed' },
        { status: 401 }
      );
    }
    
    const formData = await request.formData();
    const file = formData.get('file');
    
    console.log('File received:', file ? {
      name: file.name,
      size: file.size,
      type: file.type
    } : 'No file');
    
    if (!file) {
      console.log('No file provided');
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
    console.log('Uploads directory:', uploadsDir);
    
    try {
      await mkdir(uploadsDir, { recursive: true });
      console.log('Uploads directory created/verified');
    } catch (error) {
      console.log('Directory creation error (might already exist):', error.message);
    }
    
    // Save file to public/uploads directory
    const filePath = path.join(uploadsDir, uniqueFileName);
    console.log('Saving file to:', filePath);
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    console.log('File saved successfully');
    
    // Create URL for the saved file
    const fileUrl = `/uploads/${uniqueFileName}`;
    console.log('File URL:', fileUrl);
    
    const mediaFileData = {
      name: file.name,
      type: fileType,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      url: fileUrl,
      alt: `${fileName} - uploaded file`,
      category: fileType === 'image' ? 'projects' : fileType
    };

    console.log('Creating media file:', mediaFileData);
    
    try {
      const newMediaFile = await MediaService.createMediaFile(mediaFileData);
      return NextResponse.json(newMediaFile);
    } catch (dbError) {
      console.error('Database error creating media file:', dbError);
      
      // Return the file data even if database save fails
      // This allows the upload to work even without database
      const fallbackMediaFile = {
        id: Date.now(), // Generate a temporary ID
        ...mediaFileData,
        uploadedAt: new Date(),
        createdAt: new Date()
      };
      
      console.log('Returning fallback media file:', fallbackMediaFile);
      return NextResponse.json(fallbackMediaFile);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { 
        error: 'Failed to upload file',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
