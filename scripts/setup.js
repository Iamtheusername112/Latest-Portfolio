import 'dotenv/config';
import { initializeDatabase } from '../lib/db/init.js';

async function setup() {
  try {
    console.log('🚀 Setting up your portfolio application...\n');

    // Check environment variables
    console.log('1. Checking environment variables...');
    const requiredVars = ['DATABASE_URL', 'JWT_SECRET'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.log('❌ Missing environment variables:', missingVars.join(', '));
      console.log('📝 Please create a .env.local file with the required variables.');
      console.log('💡 See the setup instructions for the complete .env.local template.');
      return;
    }
    
    console.log('✅ Environment variables loaded');

    // Initialize database
    console.log('\n2. Initializing database...');
    await initializeDatabase();
    console.log('✅ Database initialized');

    // Test authentication
    console.log('\n3. Testing authentication system...');
    const { AuthService } = await import('../lib/db/services/auth-service.js');
    
    const authResult = await AuthService.authenticateUser(
      process.env.ADMIN_EMAIL || 'admin@example.com',
      process.env.ADMIN_PASSWORD || 'admin123'
    );
    
    if (authResult.success) {
      console.log('✅ Authentication system working');
      console.log(`👤 Admin user: ${authResult.user.email}`);
    } else {
      console.log('❌ Authentication test failed');
    }

    console.log('\n🎉 Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Visit: http://localhost:3000');
    console.log('3. Admin panel: http://localhost:3000/admin/login');
    console.log(`4. Login with: ${process.env.ADMIN_EMAIL || 'admin@example.com'} / ${process.env.ADMIN_PASSWORD || 'admin123'}`);

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure your .env.local file exists');
    console.log('2. Check your DATABASE_URL is correct');
    console.log('3. Ensure all dependencies are installed: npm install');
  }
}

setup();
