import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/db/services/auth-service';
import { SECURITY_CONFIG } from '@/lib/security-config';

export async function POST(request) {
  try {
    console.log('🔄 Token refresh requested');
    
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify the current token
    const result = await AuthService.verifyToken(token);
    
    if (!result.success) {
      console.log('❌ Current token is invalid, user needs to re-login');
      return NextResponse.json(
        { error: 'Invalid token, please login again' },
        { status: 401 }
      );
    }

    // Generate a new token
    const jwt = await import('jsonwebtoken');
    const jwtSecret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-2024';
    
    const newToken = jwt.sign(
      { 
        userId: result.user.id, 
        email: result.user.email, 
        role: result.user.role 
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    console.log('✅ New token generated for user:', result.user.email);

    // Set the new token in cookie
    const response = NextResponse.json({
      success: true,
      user: result.user
    });

    response.cookies.set('admin-token', newToken, {
      httpOnly: SECURITY_CONFIG.SESSION.httpOnly,
      secure: SECURITY_CONFIG.SESSION.secure,
      sameSite: SECURITY_CONFIG.SESSION.sameSite,
      maxAge: SECURITY_CONFIG.SESSION.maxAge
    });

    return response;
  } catch (error) {
    console.error('❌ Token refresh error:', error);
    return NextResponse.json(
      { error: 'Token refresh failed' },
      { status: 500 }
    );
  }
}
