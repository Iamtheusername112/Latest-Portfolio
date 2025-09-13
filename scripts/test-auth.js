import { AuthService } from '../lib/db/services/auth-service.js';

async function testAuthentication() {
  try {
    console.log('🧪 Testing authentication system...');

    // Test admin user creation
    console.log('1. Creating admin user...');
    const admin = await AuthService.createAdminUser(
      'admin@example.com',
      'admin123',
      'Admin User'
    );
    console.log('✅ Admin user created:', admin.email);

    // Test authentication
    console.log('2. Testing authentication...');
    const authResult = await AuthService.authenticateUser('admin@example.com', 'admin123');
    
    if (authResult.success) {
      console.log('✅ Authentication successful:', authResult.user);
      console.log('✅ Token generated:', authResult.token ? 'Yes' : 'No');
    } else {
      console.log('❌ Authentication failed:', authResult.message);
    }

    // Test token verification
    if (authResult.success) {
      console.log('3. Testing token verification...');
      const verifyResult = await AuthService.verifyToken(authResult.token);
      
      if (verifyResult.success) {
        console.log('✅ Token verification successful:', verifyResult.user);
      } else {
        console.log('❌ Token verification failed:', verifyResult.message);
      }
    }

    console.log('🎉 Authentication system test completed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAuthentication();
