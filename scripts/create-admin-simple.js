import 'dotenv/config';

async function createAdmin() {
  try {
    console.log('🔐 Creating admin user...');
    console.log('Environment check:');
    console.log('- DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    console.log('- JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
    
    // Import database modules
    const { db } = await import('../lib/db/config.js');
    const { users } = await import('../lib/db/schema.js');
    const { eq } = await import('drizzle-orm');
    const bcrypt = await import('bcryptjs');
    
    console.log('✅ Database modules imported successfully');
    
    // Check if admin exists
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'))
      .limit(1);
    
    if (existingAdmin.length > 0) {
      console.log('❌ Admin user already exists:', existingAdmin[0].email);
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.default.hash('PortfolioAdmin2024!', 12);
    
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
    
    console.log('✅ Admin user created successfully:');
    console.log('   Email: iwufrancis571@gmail.com');
    console.log('   Password: PortfolioAdmin2024!');
    console.log('   Role: admin');
    console.log('   ID:', newAdmin[0].id);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    console.error('Stack:', error.stack);
  }
}

createAdmin();
