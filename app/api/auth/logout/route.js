import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('🔄 Processing logout request...');
    
    const response = NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    });
    
    // Clear the admin token cookie
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    // Also clear any other potential auth cookies
    response.cookies.set('admin-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    console.log('✅ Logout successful - cookies cleared');
    return response;
    
  } catch (error) {
    console.error('❌ Logout error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Logout failed',
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
