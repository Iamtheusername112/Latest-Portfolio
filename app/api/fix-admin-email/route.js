import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    console.log('🔧 Fixing admin email to iwufrancis571@gmail.com...');
    
    // Find existing admin user
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'))
      .limit(1);
    
    if (existingAdmin.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No admin user found'
      });
    }
    
    console.log('👤 Found admin user:', existingAdmin[0].email);
    
    // Update the admin user with correct email and password
    const hashedPassword = await bcrypt.hash('PortfolioAdmin2024!', 12);
    
    const updatedAdmin = await db
      .update(users)
      .set({
        email: 'iwufrancis571@gmail.com',
        name: 'Iwu Francis',
        password: hashedPassword,
        updatedAt: new Date()
      })
      .where(eq(users.id, existingAdmin[0].id))
      .returning();
    
    console.log('✅ Admin user updated successfully!');
    console.log('   Old email:', existingAdmin[0].email);
    console.log('   New email:', updatedAdmin[0].email);
    
    return NextResponse.json({
      success: true,
      message: 'Admin user email updated successfully!',
      details: {
        oldEmail: existingAdmin[0].email,
        newEmail: updatedAdmin[0].email,
        newPassword: 'PortfolioAdmin2024!'
      }
    });
    
  } catch (error) {
    console.error('❌ Error updating admin email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update admin email',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
