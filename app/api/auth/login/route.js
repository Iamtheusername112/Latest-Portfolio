import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/db/services/auth-service';
import { db } from '@/lib/db/config';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if admin user exists, create if not
    const adminExists = await AuthService.adminExists();
    if (!adminExists) {
      console.log('Creating default admin user...');
      await AuthService.createDefaultAdmin();
    }

    // Check if we need to update the admin email
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'))
      .limit(1);
    
    if (existingAdmin.length > 0 && existingAdmin[0].email !== 'iwufrancis571@gmail.com') {
      console.log('🔧 Updating admin email from', existingAdmin[0].email, 'to iwufrancis571@gmail.com');
      
      // Update the admin user with correct email and password
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash('PortfolioAdmin2024!', 12);
      
      await db
        .update(users)
        .set({
          email: 'iwufrancis571@gmail.com',
          name: 'Iwu Francis',
          password: hashedPassword,
          updatedAt: new Date()
        })
        .where(eq(users.id, existingAdmin[0].id));
      
      console.log('✅ Admin user updated successfully');
    }

    // Only allow specific admin email
    if (email !== 'iwufrancis571@gmail.com') {
      return NextResponse.json(
        { error: 'Access denied. Only authorized administrators can log in.' },
        { status: 403 }
      );
    }

    const result = await AuthService.authenticateUser(email, password);
    
    console.log('Authentication result:', result);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message || 'Invalid credentials' },
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
