import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/db/services/auth-service';

export async function GET(request) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    const result = await AuthService.verifyToken(token);

    if (!result.success) {
      return NextResponse.json(
        { authenticated: false, message: result.message },
        { status: 401 }
      );
    }

    // Ensure user has admin role
    if (result.user.role !== 'admin') {
      return NextResponse.json(
        { authenticated: false, message: 'Access denied. Admin privileges required.' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: result.user
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { authenticated: false, message: 'Token verification failed' },
      { status: 500 }
    );
  }
}
