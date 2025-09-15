import { NextResponse } from 'next/server';
import { SettingsService } from '@/lib/db/services/settings-service';

// GET - Get all settings or specific category
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (category) {
      const settings = await SettingsService.getSettingsByCategory(category);
      return NextResponse.json(settings);
    }

    // Get all settings
    const settings = await SettingsService.getAllSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch settings',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// PUT - Update settings
export async function PUT(request) {
  try {
    const data = await request.json();
    const { category, settings } = data;

    if (category) {
      // Update specific category
      const updatedSettings = await SettingsService.updateCategory(category, settings);
      return NextResponse.json({
        success: true,
        message: `${category} settings updated successfully`,
        settings: updatedSettings
      });
    } else {
      // Update all settings
      const updatedSettings = await SettingsService.updateSettings(settings);
      return NextResponse.json({
        success: true,
        message: 'Settings updated successfully',
        settings: updatedSettings
      });
    }
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update settings',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// POST - Reset settings or perform actions
export async function POST(request) {
  try {
    const data = await request.json();
    const { action } = data;

    if (action === 'reset') {
      const defaultSettings = await SettingsService.resetToDefault();
      return NextResponse.json({
        success: true,
        message: 'Settings reset to default successfully',
        settings: defaultSettings
      });
    }

    if (action === 'create-default') {
      const defaultSettings = await SettingsService.createDefaultSettings();
      return NextResponse.json({
        success: true,
        message: 'Default settings created successfully',
        settings: defaultSettings
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error performing settings action:', error);
    return NextResponse.json(
      { 
        error: 'Failed to perform settings action',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
