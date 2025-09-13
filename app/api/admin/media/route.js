import { NextResponse } from 'next/server';
import { MediaService } from '@/lib/db/services/media-service';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let mediaFiles;
    if (search) {
      mediaFiles = await MediaService.searchMediaFiles(search);
    } else if (category) {
      mediaFiles = await MediaService.getMediaFilesByCategory(category);
    } else {
      mediaFiles = await MediaService.getAllMediaFiles();
    }

    return NextResponse.json(mediaFiles);
  } catch (error) {
    console.error('Error fetching media files:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media files' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newMediaFile = await MediaService.createMediaFile(data);
    return NextResponse.json(newMediaFile);
  } catch (error) {
    console.error('Error creating media file:', error);
    return NextResponse.json(
      { error: 'Failed to create media file' },
      { status: 500 }
    );
  }
}
