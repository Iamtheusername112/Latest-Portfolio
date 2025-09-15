#!/usr/bin/env node

// Simple test to see what's happening
console.log('Starting test...');

try {
  console.log('Importing modules...');
  const { ContactMessagesService } = await import('../lib/db/services/contact-messages-service.js');
  console.log('Modules imported successfully');

  console.log('Testing getMessageStats...');
  const stats = await ContactMessagesService.getMessageStats();
  console.log('Success! Stats:', stats);
  
} catch (error) {
  console.error('Error occurred:');
  console.error('Message:', error.message);
  console.error('Stack:', error.stack);
  console.error('Name:', error.name);
}
