// Test the exact import from settings-service.js
try {
  const { settings } = require('./lib/db/schema.js');
  console.log('✅ settings import successful');
  console.log('Settings table name:', settings._.name);
} catch (error) {
  console.error('❌ settings import failed:', error.message);
  console.error('Error details:', error);
}
