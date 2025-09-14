import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔍 Debugging hero API...');
    
    // Test database connection
    const { db } = await import('@/lib/db/config.js');
    console.log('✅ Database connection loaded');
    
    // Test schema import
    const { heroContent } = await import('@/lib/db/schema.js');
    console.log('✅ Schema loaded');
    
    // Test simple query
    const result = await db.select().from(heroContent).limit(1);
    console.log('✅ Query executed, result:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Hero API debug successful',
      result: result
    });
  } catch (error) {
    console.error('❌ Hero API debug error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}
