import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    console.log('🔐 Setting up admin user...');
    
    // Check if admin exists
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'))
      .limit(1);
    
    if (existingAdmin.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists',
        admin: {
          email: existingAdmin[0].email,
          name: existingAdmin[0].name,
          role: existingAdmin[0].role
        }
      });
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('PortfolioAdmin2024!', 12);
    
    const newAdmin = await db
      .insert(users)
      .values({
        email: 'iwufrancis571@gmail.com',
        name: 'Iwu Francis',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    console.log('✅ Admin user created successfully!');
    
    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      admin: {
        email: newAdmin[0].email,
        name: newAdmin[0].name,
        role: newAdmin[0].role,
        id: newAdmin[0].id
      }
    });
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create admin user',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
