import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { logoSettings } from '@/lib/db/schema';
import { LogoService } from '@/lib/db/services/logo-service';

export async function GET() {
  try {
    console.log('🧪 Testing logo database...');
    
    // Test database connection
    console.log('1. Testing database connection...');
    const testQuery = await db.select().from(logoSettings).limit(1);
    console.log('✅ Database connection successful');
    
    // Test logo service
    console.log('2. Testing logo service...');
    const logo = await LogoService.createInitialLogoSettings();
    console.log('✅ Logo service working:', logo);
    
    // Test getting logo
    console.log('3. Testing get logo...');
    const currentLogo = await LogoService.getLogoSettings();
    console.log('✅ Current logo:', currentLogo);
    
    return NextResponse.json({
      success: true,
      message: 'Logo database test successful!',
      logo: currentLogo
    });
    
  } catch (error) {
    console.error('❌ Logo database test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Logo database test failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
