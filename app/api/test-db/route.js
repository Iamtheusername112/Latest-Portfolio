import { NextResponse } from 'next/server'
import { db } from '@/lib/db/config'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function GET(request) {
  try {
    console.log('🧪 Testing database connection...')

    // Test basic database connection
    const testQuery = await db.select().from(users).limit(1)
    console.log('✅ Database connection successful')

    // Check for existing admin users
    const adminUsers = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'))
      .limit(5)

    console.log('👥 Admin users found:', adminUsers.length)

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      adminUsers: adminUsers.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      })),
    })
  } catch (error) {
    console.error('❌ Database test failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    console.log('🔐 Creating admin user via test endpoint...')

    // Check if admin exists
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'))
      .limit(1)

    if (existingAdmin.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists',
        admin: {
          id: existingAdmin[0].id,
          email: existingAdmin[0].email,
          name: existingAdmin[0].name,
          role: existingAdmin[0].role,
        },
      })
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('PortfolioAdmin2024!', 12)

    const newAdmin = await db
      .insert(users)
      .values({
        email: 'iwufrancischisom20@gmail.com',
        name: 'Iwu Francis',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    console.log('✅ Admin user created successfully!')

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      admin: {
        id: newAdmin[0].id,
        email: newAdmin[0].email,
        name: newAdmin[0].name,
        role: newAdmin[0].role,
      },
    })
  } catch (error) {
    console.error('❌ Error creating admin:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create admin user',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
