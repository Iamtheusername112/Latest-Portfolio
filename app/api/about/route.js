import { NextResponse } from 'next/server';
import { AboutService } from '@/lib/db/services/about-service';

export async function GET() {
  try {
    const aboutContent = await AboutService.ensureAboutContentExists();
    return NextResponse.json(aboutContent);
  } catch (error) {
    console.error('Error fetching about content:', error);
    
    // Return a proper JSON error response
    return NextResponse.json(
      { 
        error: 'Failed to fetch about content',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
