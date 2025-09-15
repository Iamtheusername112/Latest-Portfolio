import { NextResponse } from 'next/server';
import { SEOService } from '@/lib/db/services/seo-service';

// GET - Generate sitemap
export async function GET() {
  try {
    const sitemap = await SEOService.generateSitemap();
    
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    );
  }
}
