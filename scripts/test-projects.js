#!/usr/bin/env node

import { ProjectsService } from '../lib/db/services/projects-service.js';

async function testProjects() {
  console.log('🧪 Testing Projects System...\n');

  try {
    // Test 1: Get all projects
    console.log('1. Testing getAllProjects...');
    const allProjects = await ProjectsService.getAllProjects();
    console.log(`   ✅ Found ${allProjects.length} projects`);
    
    // Test 2: Get public projects
    console.log('\n2. Testing getPublicProjects...');
    const publicProjects = await ProjectsService.getPublicProjects();
    console.log(`   ✅ Found ${publicProjects.length} public projects`);
    
    // Test 3: Get project statistics
    console.log('\n3. Testing getProjectStats...');
    const stats = await ProjectsService.getProjectStats();
    console.log(`   ✅ Total projects: ${stats.total}`);
    console.log(`   ✅ Average progress: ${stats.averageProgress}%`);
    console.log(`   ✅ Status breakdown:`, stats.byStatus);
    
    // Test 4: Create a test project
    console.log('\n4. Testing createProject...');
    const testProject = {
      title: 'Test Project',
      description: 'This is a test project created by the test script.',
      shortDescription: 'Test project for verification',
      technologies: ['JavaScript', 'Node.js', 'React'],
      category: 'Web Application',
      status: 'in_progress',
      priority: 'high',
      progress: 75,
      featured: false,
      isPublic: true,
      teamSize: 1,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/test',
      order: 999
    };
    
    const createdProject = await ProjectsService.createProject(testProject);
    console.log(`   ✅ Created project: ${createdProject.title} (ID: ${createdProject.id})`);
    
    // Test 5: Update the test project
    console.log('\n5. Testing updateProject...');
    const updatedProject = await ProjectsService.updateProject(createdProject.id, {
      progress: 90,
      status: 'testing'
    });
    console.log(`   ✅ Updated project progress to ${updatedProject.progress}% and status to ${updatedProject.status}`);
    
    // Test 6: Get project by ID
    console.log('\n6. Testing getProjectById...');
    const fetchedProject = await ProjectsService.getProjectById(createdProject.id);
    console.log(`   ✅ Fetched project: ${fetchedProject.title}`);
    
    // Test 7: Get projects by status
    console.log('\n7. Testing getProjectsByStatus...');
    const testingProjects = await ProjectsService.getProjectsByStatus('testing');
    console.log(`   ✅ Found ${testingProjects.length} projects with 'testing' status`);
    
    // Test 8: Delete the test project
    console.log('\n8. Testing deleteProject...');
    const deletedProject = await ProjectsService.deleteProject(createdProject.id);
    console.log(`   ✅ Deleted project: ${deletedProject.title}`);
    
    console.log('\n🎉 All tests passed! Projects system is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testProjects();
