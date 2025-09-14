import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request) {
  try {
    console.log('🔍 Checking current admin users...');
    
    // Get all admin users
    const adminUsers = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'))
      .limit(10);
    
    console.log('👥 Admin users found:', adminUsers.length);
    
    return NextResponse.json({
      success: true,
      adminUsers: adminUsers.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      }))
    });
    
  } catch (error) {
    console.error('❌ Error checking admin users:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check admin users',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
