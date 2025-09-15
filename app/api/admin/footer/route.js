import { NextResponse } from 'next/server';
import { FooterService } from '@/lib/db/services/footer-service';

// GET - Get footer settings
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'preview') {
      const preview = await FooterService.getFooterPreview();
      return NextResponse.json(preview);
    }

    // Get all footer settings
    const settings = await FooterService.getFooterSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching footer settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch footer settings',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// PUT - Update footer settings
export async function PUT(request) {
  try {
    const data = await request.json();
    const { settings } = data;

    const updatedSettings = await FooterService.updateFooterSettings(settings);
    return NextResponse.json({
      success: true,
      message: 'Footer settings updated successfully',
      settings: updatedSettings
    });
  } catch (error) {
    console.error('Error updating footer settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update footer settings',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// POST - Reset footer or perform actions
export async function POST(request) {
  try {
    const data = await request.json();
    const { action } = data;

    if (action === 'reset') {
      const defaultSettings = await FooterService.resetToDefault();
      return NextResponse.json({
        success: true,
        message: 'Footer settings reset to default successfully',
        settings: defaultSettings
      });
    }

    if (action === 'create-default') {
      const defaultSettings = await FooterService.createDefaultFooterSettings();
      return NextResponse.json({
        success: true,
        message: 'Default footer settings created successfully',
        settings: defaultSettings
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error performing footer action:', error);
    return NextResponse.json(
      { 
        error: 'Failed to perform footer action',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
