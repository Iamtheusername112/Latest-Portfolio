#!/usr/bin/env node

import { ProjectsService } from '../lib/db/services/projects-service.js';

async function createTestProject() {
  console.log('🚀 Creating test project...\n');

  try {
    // Create a test project
    const testProject = {
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with Next.js, featuring dynamic content management and responsive design.',
      shortDescription: 'Modern portfolio with admin dashboard',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'PostgreSQL'],
      category: 'Web Application',
      status: 'completed',
      priority: 'high',
      progress: 100,
      featured: true,
      isPublic: true,
      teamSize: 1,
      liveUrl: 'http://localhost:3001',
      githubUrl: 'https://github.com/yourusername/portfolio',
      order: 1,
      startDate: new Date('2024-01-01').toISOString(),
      endDate: new Date('2024-12-31').toISOString(),
      estimatedHours: 200,
      actualHours: 180,
      challenges: 'Implementing dynamic content management system with real-time updates.',
      solutions: 'Used Next.js API routes with Drizzle ORM for database management.',
      lessonsLearned: 'Learned advanced Next.js patterns and database optimization techniques.'
    };
    
    const createdProject = await ProjectsService.createProject(testProject);
    console.log(`✅ Test project created successfully!`);
    console.log(`   Title: ${createdProject.title}`);
    console.log(`   ID: ${createdProject.id}`);
    console.log(`   Status: ${createdProject.status}`);
    console.log(`   Public: ${createdProject.isPublic}`);
    
    // Verify the project was created
    const allProjects = await ProjectsService.getAllProjects();
    console.log(`\n📊 Total projects in database: ${allProjects.length}`);
    
    const publicProjects = await ProjectsService.getPublicProjects();
    console.log(`📊 Public projects: ${publicProjects.length}`);
    
    console.log('\n🎉 Test project creation successful!');
    
  } catch (error) {
    console.error('\n❌ Failed to create test project:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createTestProject();
