import { NextResponse } from 'next/server';
import { AppearanceService } from '@/lib/db/services/appearance-service';

// GET - Get appearance settings
export async function GET() {
  try {
    const appearanceSettings = await AppearanceService.ensureAppearanceSettingsExist();
    return NextResponse.json(appearanceSettings);
  } catch (error) {
    console.error('Error fetching appearance settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch appearance settings',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// PUT - Update appearance settings
export async function PUT(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.colors || !data.typography || !data.layout || !data.theme) {
      return NextResponse.json(
        { error: 'All appearance categories (colors, typography, layout, theme) are required' },
        { status: 400 }
      );
    }

    const updatedSettings = await AppearanceService.updateAppearanceSettings(data);
    
    return NextResponse.json({
      success: true,
      message: 'Appearance settings updated successfully',
      settings: updatedSettings
    });
  } catch (error) {
    console.error('Error updating appearance settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update appearance settings',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
