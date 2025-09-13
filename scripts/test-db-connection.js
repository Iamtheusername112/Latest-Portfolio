import 'dotenv/config';
import { db } from '../lib/db/config.js';

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    
    // Test a simple query
    const result = await db.execute('SELECT 1 as test');
    console.log('✅ Database connection successful');
    console.log('📊 Test query result:', result);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your .env.local file exists');
    console.log('2. Verify DATABASE_URL is correct');
    console.log('3. Ensure your Neon database is active');
  }
}

testConnection();
