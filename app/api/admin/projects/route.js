import { NextResponse } from 'next/server';
import { ProjectsService } from '@/lib/db/services/projects-service';

export async function GET() {
  try {
    const projects = await ProjectsService.getAllProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Creating project with data:', data);
    
    const newProject = await ProjectsService.createProject(data);
    console.log('Project created successfully:', newProject);
    
    return NextResponse.json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to create project',
        details: error.message
      },
      { status: 500 }
    );
  }
}
