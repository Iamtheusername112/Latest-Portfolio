import { NextResponse } from 'next/server';
import { AboutService } from '@/lib/db/services/about-service';

export async function GET() {
  try {
    const aboutContent = await AboutService.getAboutContent();
    return NextResponse.json(aboutContent);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about content' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const updatedContent = await AboutService.updateAboutContent(data);
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json(
      { error: 'Failed to update about content' },
      { status: 500 }
    );
  }
}
