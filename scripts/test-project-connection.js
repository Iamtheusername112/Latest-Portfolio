#!/usr/bin/env node

import { ProjectsService } from '../lib/db/services/projects-service.js';

async function testProjectConnection() {
  console.log('🔍 Testing Project Database Connection...\n');

  try {
    // Test 1: Get all projects
    console.log('1. Testing getAllProjects...');
    const allProjects = await ProjectsService.getAllProjects();
    console.log(`   ✅ Found ${allProjects.length} projects`);
    
    if (allProjects.length > 0) {
      console.log('   📋 Projects found:');
      allProjects.forEach((project, index) => {
        console.log(`      ${index + 1}. ${project.title} (Status: ${project.status || 'N/A'}, Public: ${project.isPublic !== false ? 'Yes' : 'No'})`);
      });
    }

    // Test 2: Get public projects
    console.log('\n2. Testing getPublicProjects...');
    const publicProjects = await ProjectsService.getPublicProjects();
    console.log(`   ✅ Found ${publicProjects.length} public projects`);
    
    if (publicProjects.length > 0) {
      console.log('   📋 Public projects:');
      publicProjects.forEach((project, index) => {
        console.log(`      ${index + 1}. ${project.title}`);
      });
    }

    // Test 3: Get project statistics
    console.log('\n3. Testing getProjectStats...');
    const stats = await ProjectsService.getProjectStats();
    console.log(`   ✅ Total projects: ${stats.total}`);
    console.log(`   ✅ Average progress: ${stats.averageProgress}%`);
    console.log(`   ✅ Status breakdown:`, stats.byStatus);
    
    console.log('\n🎉 Database connection successful! Projects system is working.');
    
    if (allProjects.length === 0) {
      console.log('\n💡 No projects found. You can create projects through the admin dashboard.');
    }
    
  } catch (error) {
    console.error('\n❌ Database connection failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testProjectConnection();
