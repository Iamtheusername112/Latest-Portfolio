import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/db/services/auth-service';

export async function GET(request) {
  try {
    console.log('🔍 Debug Auth - Checking request...');
    
    // Get token from cookies
    const token = request.cookies.get('admin-token')?.value;
    console.log('🍪 Token from cookies:', token ? 'Present' : 'Missing');
    
    if (!token) {
      return NextResponse.json({
        debug: true,
        authenticated: false,
        message: 'No admin token found in cookies',
        cookies: Object.fromEntries(request.cookies.getAll().map(cookie => [cookie.name, cookie.value]))
      });
    }

    console.log('🔐 Verifying token...');
    const result = await AuthService.verifyToken(token);
    console.log('✅ Token verification result:', result);

    if (!result.success) {
      return NextResponse.json({
        debug: true,
        authenticated: false,
        message: result.message,
        token: token.substring(0, 20) + '...'
      });
    }

    return NextResponse.json({
      debug: true,
      authenticated: true,
      user: result.user,
      token: token.substring(0, 20) + '...'
    });
  } catch (error) {
    console.error('❌ Debug auth error:', error);
    return NextResponse.json({
      debug: true,
      authenticated: false,
      error: error.message,
      stack: error.stack
    });
  }
}
