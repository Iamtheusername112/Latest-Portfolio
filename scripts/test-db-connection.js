#!/usr/bin/env node

import { db } from '../lib/db/config.js';
import { projects } from '../lib/db/schema.js';

async function testDatabaseConnection() {
  console.log('🔍 Testing Database Connection...\n');

  try {
    // Test basic connection
    console.log('1. Testing database connection...');
    
    // Try to select from projects table
    const result = await db.select().from(projects);
    console.log(`✅ Database connection successful!`);
    console.log(`📊 Found ${result.length} projects in database`);
    
    if (result.length > 0) {
      console.log('\n📋 Projects found:');
      result.forEach((project, index) => {
        console.log(`   ${index + 1}. ${project.title || 'Untitled'} (ID: ${project.id})`);
        console.log(`      Status: ${project.status || 'N/A'}`);
        console.log(`      Public: ${project.is_public !== false ? 'Yes' : 'No'}`);
        console.log(`      Featured: ${project.featured ? 'Yes' : 'No'}`);
        console.log('');
      });
    } else {
      console.log('\n💡 No projects found in database. This explains why frontend shows nothing.');
      console.log('   You need to create projects through the admin dashboard.');
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

testDatabaseConnection();