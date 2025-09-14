import { NextResponse } from 'next/server';
import { LogoService } from '@/lib/db/services/logo-service';

export async function GET() {
  try {
    const logo = await LogoService.getLogoSettings();
    
    return NextResponse.json({
      success: true,
      logo
    });
  } catch (error) {
    console.error('Error fetching logo settings:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch logo settings',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const logoData = await request.json();
    
    // Validate required fields based on type
    if (logoData.type === 'text' && !logoData.textContent) {
      return NextResponse.json(
        { success: false, message: 'Text content is required for text logos' },
        { status: 400 }
      );
    }
    
    if (logoData.type === 'image' && !logoData.imageUrl) {
      return NextResponse.json(
        { success: false, message: 'Image URL is required for image logos' },
        { status: 400 }
      );
    }
    
    if (logoData.type === 'svg' && !logoData.svgContent) {
      return NextResponse.json(
        { success: false, message: 'SVG content is required for SVG logos' },
        { status: 400 }
      );
    }

    const logo = await LogoService.updateLogoSettings(logoData);
    
    return NextResponse.json({
      success: true,
      message: 'Logo settings updated successfully',
      logo
    });
  } catch (error) {
    console.error('Error updating logo settings:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update logo settings',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
