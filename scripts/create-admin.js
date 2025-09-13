import 'dotenv/config';
import { AuthService } from '../lib/db/services/auth-service.js';

async function createAdmin() {
  try {
    console.log('🔐 Creating admin user...');
    
    // Check if admin already exists
    const adminExists = await AuthService.adminExists();
    
    if (adminExists) {
      console.log('✅ Admin user already exists');
      
      // Test login
      const loginResult = await AuthService.authenticateUser(
        process.env.ADMIN_EMAIL || 'admin@example.com',
        process.env.ADMIN_PASSWORD || 'admin123'
      );
      
      if (loginResult.success) {
        console.log('✅ Admin login test successful');
        console.log('👤 Admin user:', loginResult.user.email);
      } else {
        console.log('❌ Admin login test failed:', loginResult.message);
      }
    } else {
      console.log('📝 Creating new admin user...');
      
      const admin = await AuthService.createAdminUser(
        process.env.ADMIN_EMAIL || 'admin@example.com',
        process.env.ADMIN_PASSWORD || 'admin123',
        'Admin User'
      );
      
      console.log('✅ Admin user created successfully');
      console.log('👤 Email:', admin.email);
      console.log('🔑 Password: admin123');
    }
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure your .env.local file exists');
    console.log('2. Check your DATABASE_URL is correct');
    console.log('3. Ensure the database is accessible');
  }
}

createAdmin();
