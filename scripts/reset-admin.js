import 'dotenv/config';
import { AuthService } from '../lib/db/services/auth-service.js';

async function resetAdmin() {
  try {
    console.log('🔐 Resetting admin credentials...');
    
    // Delete existing admin users
    console.log('1. Removing existing admin users...');
    const { db } = await import('../lib/db/config.js');
    const { users } = await import('../lib/db/schema.js');
    const { eq } = await import('drizzle-orm');
    
    await db.delete(users).where(eq(users.role, 'admin'));
    console.log('✅ Existing admin users removed');
    
    // Create new secure admin user
    console.log('2. Creating new secure admin user...');
    const admin = await AuthService.createAdminUser(
      'iwufrancis571@gmail.com',
      'PortfolioAdmin2024!',
      'Iwu Francis'
    );
    
    console.log('✅ New admin user created:');
    console.log('   Email: iwufrancis571@gmail.com');
    console.log('   Password: PortfolioAdmin2024!');
    console.log('   Role: admin');
    
    // Test authentication
    console.log('3. Testing authentication...');
    const authResult = await AuthService.authenticateUser(
      'iwufrancis571@gmail.com',
      'PortfolioAdmin2024!'
    );
    
    if (authResult.success) {
      console.log('✅ Authentication test successful');
      console.log('🎉 Admin reset completed successfully!');
    } else {
      console.log('❌ Authentication test failed:', authResult.message);
    }
    
  } catch (error) {
    console.error('❌ Error resetting admin:', error.message);
  }
}

resetAdmin();
