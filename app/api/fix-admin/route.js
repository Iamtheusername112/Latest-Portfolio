import { NextResponse } from 'next/server'
import { db } from '@/lib/db/config'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    console.log('🔧 Fixing admin user email...')

    // Find existing admin user
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'))
      .limit(1)

    if (existingAdmin.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No admin user found to update',
      })
    }

    console.log('👤 Found existing admin:', existingAdmin[0].email)

    // Update the admin user with correct email and password
    const hashedPassword = await bcrypt.hash('PortfolioAdmin2024!', 12)

    const updatedAdmin = await db
      .update(users)
      .set({
        email: 'iwufrancischisom20@gmail.com',
        name: 'Iwu Francis',
        password: hashedPassword,
        updatedAt: new Date(),
      })
      .where(eq(users.id, existingAdmin[0].id))
      .returning()

    console.log('✅ Admin user updated successfully!')
    console.log('   Old email:', existingAdmin[0].email)
    console.log('   New email:', updatedAdmin[0].email)
    console.log('   New password: PortfolioAdmin2024!')

    return NextResponse.json({
      success: true,
      message: 'Admin user updated successfully',
      admin: {
        id: updatedAdmin[0].id,
        email: updatedAdmin[0].email,
        name: updatedAdmin[0].name,
        role: updatedAdmin[0].role,
      },
    })
  } catch (error) {
    console.error('❌ Error updating admin:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update admin user',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
