import { NextResponse } from 'next/server';
import { ProjectsService } from '@/lib/db/services/projects-service';

export async function GET(request, { params }) {
  try {
    const project = await ProjectsService.getProjectById(parseInt(params.id));
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log(`Updating project ${params.id} with data:`, data);
    
    const updatedProject = await ProjectsService.updateProject(parseInt(params.id), data);
    console.log('Project updated successfully:', updatedProject);
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to update project',
        details: error.message,
        projectId: params.id
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedProject = await ProjectsService.deleteProject(parseInt(params.id));
    return NextResponse.json(deletedProject);
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
