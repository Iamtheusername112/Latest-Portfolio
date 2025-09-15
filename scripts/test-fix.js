#!/usr/bin/env node

// Test the fix by importing and testing the service directly
import { ContactMessagesService } from '../lib/db/services/contact-messages-service.js';

async function testFix() {
  console.log('🔍 Testing the fix...\n');

  try {
    console.log('Testing getMessageStats...');
    const stats = await ContactMessagesService.getMessageStats();
    console.log('✅ getMessageStats works!');
    console.log('Stats:', stats);
    
    console.log('\nTesting getAllMessages...');
    const messages = await ContactMessagesService.getAllMessages();
    console.log('✅ getAllMessages works!');
    console.log(`Found ${messages.length} messages`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

testFix();
