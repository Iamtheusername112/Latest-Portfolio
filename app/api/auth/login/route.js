import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/db/services/auth-service';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if admin user exists, create if not
    const adminExists = await AuthService.adminExists();
    if (!adminExists) {
      console.log('Creating default admin user...');
      await AuthService.createDefaultAdmin();
    }

    const result = await AuthService.authenticateUser(email, password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 401 }
      );
    }

    // Set HTTP-only cookie for security
    const response = NextResponse.json({
      success: true,
      user: result.user
    });

    response.cookies.set('admin-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
