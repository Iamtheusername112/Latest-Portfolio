#!/usr/bin/env node

import { db } from '../lib/db/config.js';

async function testDatabase() {
  console.log('🔍 Testing Database Connection...\n');
  
  try {
    // Simple test query
    const result = await db.execute('SELECT 1 as test');
    console.log('✅ Database connection successful!');
    console.log('📊 Test query result:', result);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\n🔧 Possible solutions:');
    console.error('   1. Check if .env.local file exists');
    console.error('   2. Verify DATABASE_URL is correct');
    console.error('   3. Make sure database server is accessible');
    console.error('   4. Check if migrations have been applied');
    console.error('\n📝 Full error:');
    console.error(error);
  }
}

testDatabase();
