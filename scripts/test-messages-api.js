#!/usr/bin/env node

import { ContactMessagesService } from '../lib/db/services/contact-messages-service.js';

async function testMessagesAPI() {
  console.log('🔍 Testing Contact Messages API...\n');

  try {
    console.log('1. Testing getAllMessages...');
    const messages = await ContactMessagesService.getAllMessages();
    console.log(`✅ getAllMessages successful! Found ${messages.length} messages`);
    
    console.log('\n2. Testing getMessageStats...');
    const stats = await ContactMessagesService.getMessageStats();
    console.log(`✅ getMessageStats successful!`);
    console.log('Stats:', JSON.stringify(stats, null, 2));
    
  } catch (error) {
    console.error('\n❌ API test failed:', error.message);
    console.error('\n📝 Full error details:');
    console.error(error);
    process.exit(1);
  }
}

testMessagesAPI();
