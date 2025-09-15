import { NextResponse } from 'next/server';
import { MediaService } from '@/lib/db/services/media-service';
import { unlink } from 'fs/promises';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const mediaFile = await MediaService.getMediaFileById(parseInt(params.id));
    if (!mediaFile) {
      return NextResponse.json(
        { error: 'Media file not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(mediaFile);
  } catch (error) {
    console.error('Error fetching media file:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media file' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const updatedMediaFile = await MediaService.updateMediaFile(parseInt(params.id), data);
    return NextResponse.json(updatedMediaFile);
  } catch (error) {
    console.error('Error updating media file:', error);
    return NextResponse.json(
      { error: 'Failed to update media file' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    console.log(`Deleting media file ${id} from database and file system...`);
    
    // First get the media file to get the file path
    const mediaFile = await MediaService.getMediaFileById(parseInt(id));
    if (!mediaFile) {
      console.log(`Media file ${id} not found in database`);
      return NextResponse.json(
        { error: 'Media file not found' },
        { status: 404 }
      );
    }
    
    // Delete from database
    const deletedMediaFile = await MediaService.deleteMediaFile(parseInt(id));
    console.log(`Media file ${id} deleted from database`);
    
    // Delete physical file if it exists and is in uploads directory
    if (mediaFile.url && mediaFile.url.startsWith('/uploads/')) {
      try {
        const filePath = path.join(process.cwd(), 'public', mediaFile.url);
        await unlink(filePath);
        console.log(`Physical file deleted: ${filePath}`);
      } catch (fileError) {
        console.warn(`Could not delete physical file for ${mediaFile.url}:`, fileError.message);
        // Don't fail the entire operation if file deletion fails
      }
    }
    
    console.log(`Media file ${id} deleted successfully`);
    return NextResponse.json({ 
      message: 'Media file deleted successfully',
      deletedMediaFile 
    });
  } catch (error) {
    console.error('Error deleting media file:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete media file',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
