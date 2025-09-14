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
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
