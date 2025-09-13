import 'dotenv/config';

console.log('🔍 Checking environment variables...\n');

const requiredVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD'
];

let allPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${varName === 'DATABASE_URL' ? 'Set (hidden for security)' : 'Set'}`);
  } else {
    console.log(`❌ ${varName}: Not set`);
    allPresent = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPresent) {
  console.log('🎉 All required environment variables are set!');
  console.log('✅ Your app should work correctly now.');
} else {
  console.log('⚠️  Some environment variables are missing.');
  console.log('📝 Please create a .env.local or .env file with the required variables.');
}

console.log('\n📋 Required variables:');
console.log('- DATABASE_URL: Your Neon PostgreSQL connection string');
console.log('- JWT_SECRET: Secret key for JWT token signing');
console.log('- ADMIN_EMAIL: Default admin email');
console.log('- ADMIN_PASSWORD: Default admin password');
