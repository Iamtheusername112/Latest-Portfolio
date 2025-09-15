// Test script to verify schema imports
try {
  const { settings } = require('./lib/db/schema.js');
  console.log('✅ settings import successful:', settings);
} catch (error) {
  console.error('❌ settings import failed:', error.message);
}

try {
  const { seoSettings } = require('./lib/db/schema.js');
  console.log('✅ seoSettings import successful:', seoSettings);
} catch (error) {
  console.error('❌ seoSettings import failed:', error.message);
}
