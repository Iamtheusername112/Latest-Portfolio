import { NextResponse } from 'next/server';
import { ProjectsService } from '@/lib/db/services/projects-service.js';

export async function GET() {
  try {
    console.log('Fetching public projects...');
    
    // Get only public projects
    const projects = await ProjectsService.getPublicProjects();
    
    console.log(`Found ${projects.length} public projects`);
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching public projects:', error);
    
    // Return a proper JSON error response
    return NextResponse.json(
      { 
        error: 'Failed to fetch projects',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
