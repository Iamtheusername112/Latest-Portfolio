import { NextResponse } from 'next/server';
import { AboutService } from '@/lib/db/services/about-service';

export async function GET() {
  try {
    const aboutContent = await AboutService.ensureAboutContentExists();
    return NextResponse.json(aboutContent);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about content' },
      { status: 500 }
    );
  }
}
