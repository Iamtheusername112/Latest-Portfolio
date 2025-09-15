import { NextResponse } from 'next/server';
import { SEOService } from '@/lib/db/services/seo-service';

// GET - Analyze SEO
export async function GET() {
  try {
    const analysis = await SEOService.analyzeSEO();
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing SEO:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze SEO',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
