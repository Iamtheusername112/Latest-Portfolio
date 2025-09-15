import { NextResponse } from 'next/server';
import { SEOService } from '@/lib/db/services/seo-service';

// GET - Generate robots.txt
export async function GET() {
  try {
    const robotsTxt = await SEOService.generateRobotsTxt();
    
    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return NextResponse.json(
      { error: 'Failed to generate robots.txt' },
      { status: 500 }
    );
  }
}
