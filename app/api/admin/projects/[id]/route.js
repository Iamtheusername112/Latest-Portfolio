import { NextResponse } from 'next/server';
import { ProjectsService } from '@/lib/db/services/projects-service';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const project = await ProjectsService.getProjectById(parseInt(id));
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
    const { id } = await params;
    console.log(`Updating project ${id} with data:`, data);

    const updatedProject = await ProjectsService.updateProject(parseInt(id), data);
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
        projectId: id
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    console.log(`DELETE request received for project ${id}`);
    
    if (!id || isNaN(parseInt(id))) {
      console.error('Invalid project ID:', id);
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }
    
    console.log(`Attempting to delete project ${id} from database`);
    const deletedProject = await ProjectsService.deleteProject(parseInt(id));
    console.log('Delete result:', deletedProject);
    
    if (!deletedProject) {
      console.log(`Project ${id} not found in database`);
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    console.log('Project deleted successfully:', deletedProject);
    return NextResponse.json({ 
      message: 'Project deleted successfully',
      deletedProject 
    });
  } catch (error) {
    console.error('Error in DELETE API:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { 
        error: 'Failed to delete project',
        details: error.message,
        projectId: id 
      },
      { status: 500 }
    );
  }
}