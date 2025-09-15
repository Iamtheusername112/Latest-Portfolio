#!/usr/bin/env node

import { db } from '../lib/db/config.js';

async function testDB() {
  console.log('🔍 Testing Database Connection...\n');

  try {
    console.log('1. Testing basic query...');
    const result = await db.execute('SELECT 1 as test');
    console.log(`✅ Database connection successful!`);
    console.log('Result:', result);
    
  } catch (error) {
    console.error('\n❌ Database connection failed:', error.message);
    console.error('\n📝 Full error details:');
    console.error(error);
    process.exit(1);
  }
}

testDB();
