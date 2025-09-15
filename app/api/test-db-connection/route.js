import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config.js';
import { users } from '@/lib/db/schema.js';

export async function GET(request) {
  try {
    console.log('🧪 Testing database connection...');
    
    // Test basic database connection
    const result = await db.select().from(users).limit(1);
    console.log('✅ Database connection successful');
    console.log('👥 Users found:', result.length);
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount: result.length,
      users: result
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
