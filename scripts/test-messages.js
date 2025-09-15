#!/usr/bin/env node

import { db } from '../lib/db/config.js';
import { contactMessages } from '../lib/db/schema.js';

async function testMessagesTable() {
  console.log('🔍 Testing Contact Messages Table...\n');

  try {
    // Test basic connection
    console.log('1. Testing database connection...');
    
    // Try to select from contact_messages table
    const result = await db.select().from(contactMessages);
    console.log(`✅ Database connection successful!`);
    console.log(`📊 Found ${result.length} messages in database`);
    
    if (result.length > 0) {
      console.log('\n📋 Messages found:');
      result.forEach((message, index) => {
        console.log(`   ${index + 1}. ${message.name || 'Unknown'} - ${message.subject || 'No Subject'}`);
        console.log(`      Email: ${message.email || 'N/A'}`);
        console.log(`      Status: ${message.status || 'N/A'}`);
        console.log(`      Read: ${message.is_read ? 'Yes' : 'No'}`);
        console.log(`      Created: ${message.created_at || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('\n💡 No messages found in database.');
    }
    
  } catch (error) {
    console.error('\n❌ Database connection failed:', error.message);
    console.error('\n🔧 Possible solutions:');
    console.error('   1. Check if .env.local file exists with correct DATABASE_URL');
    console.error('   2. Verify database credentials are correct');
    console.error('   3. Make sure database server is accessible');
    console.error('   4. Run npm run db:push to apply migrations');
    console.error('\n📝 Full error details:');
    console.error(error);
    process.exit(1);
  }
}

testMessagesTable();
