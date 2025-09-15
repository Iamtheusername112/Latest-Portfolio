import { NextResponse } from 'next/server';
import { SEOService } from '@/lib/db/services/seo-service';

// GET - Get SEO settings
export async function GET() {
  try {
    const seoSettings = await SEOService.ensureSEOSettingsExist();
    return NextResponse.json(seoSettings);
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch SEO settings',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// PUT - Update SEO settings
export async function PUT(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const updatedSettings = await SEOService.updateSEOSettings(data);
    
    return NextResponse.json({
      success: true,
      message: 'SEO settings updated successfully',
      settings: updatedSettings
    });
  } catch (error) {
    console.error('Error updating SEO settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update SEO settings',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
