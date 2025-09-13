import { NextResponse } from 'next/server';
import { MediaService } from '@/lib/db/services/media-service';

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
    const deletedMediaFile = await MediaService.deleteMediaFile(parseInt(params.id));
    return NextResponse.json(deletedMediaFile);
  } catch (error) {
    console.error('Error deleting media file:', error);
    return NextResponse.json(
      { error: 'Failed to delete media file' },
      { status: 500 }
    );
  }
}
