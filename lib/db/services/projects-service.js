import { db } from '../config.js';
import { projects } from '../schema.js';
import { eq, desc, asc } from 'drizzle-orm';

export class ProjectsService {
  // Get all projects
  static async getAllProjects() {
    try {
      const result = await db
        .select()
        .from(projects)
        .orderBy(asc(projects.order), desc(projects.createdAt));
      
      // Parse JSON fields
      return result.map(project => this.parseProjectData(project));
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  // Parse project data (JSON fields)
  static parseProjectData(project) {
    if (!project) return null;
    
    const parsed = { ...project };
    
    // Parse JSON fields
    if (typeof parsed.technologies === 'string') {
      try {
        parsed.technologies = JSON.parse(parsed.technologies);
      } catch (e) {
        parsed.technologies = [];
      }
    }
    
    if (typeof parsed.techStack === 'string') {
      try {
        parsed.techStack = JSON.parse(parsed.techStack);
      } catch (e) {
        parsed.techStack = {};
      }
    }
    
    if (typeof parsed.gallery === 'string') {
      try {
        parsed.gallery = JSON.parse(parsed.gallery);
      } catch (e) {
        parsed.gallery = [];
      }
    }
    
    if (typeof parsed.tags === 'string') {
      try {
        parsed.tags = JSON.parse(parsed.tags);
      } catch (e) {
        parsed.tags = [];
      }
    }
    
    return parsed;
  }

  // Get featured projects
  static async getFeaturedProjects() {
    try {
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.featured, true))
        .orderBy(asc(projects.order), desc(projects.createdAt));
      
      return result.map(project => this.parseProjectData(project));
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  }

  // Get projects by status
  static async getProjectsByStatus(status) {
    try {
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.status, status))
        .orderBy(asc(projects.order), desc(projects.createdAt));
      
      return result.map(project => this.parseProjectData(project));
    } catch (error) {
      console.error('Error fetching projects by status:', error);
      throw error;
    }
  }

  // Get public projects only
  static async getPublicProjects() {
    try {
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.isPublic, true))
        .orderBy(asc(projects.order), desc(projects.createdAt));
      
      return result.map(project => this.parseProjectData(project));
    } catch (error) {
      console.error('Error fetching public projects:', error);
      throw error;
    }
  }

  // Get project statistics
  static async getProjectStats() {
    try {
      const allProjects = await this.getAllProjects();
      
      const stats = {
        total: allProjects.length,
        byStatus: {},
        byCategory: {},
        byPriority: {},
        totalProgress: 0,
        averageProgress: 0
      };

      allProjects.forEach(project => {
        // Count by status
        stats.byStatus[project.status] = (stats.byStatus[project.status] || 0) + 1;
        
        // Count by category
        if (project.category) {
          stats.byCategory[project.category] = (stats.byCategory[project.category] || 0) + 1;
        }
        
        // Count by priority
        stats.byPriority[project.priority] = (stats.byPriority[project.priority] || 0) + 1;
        
        // Calculate progress
        stats.totalProgress += project.progress || 0;
      });

      stats.averageProgress = allProjects.length > 0 ? Math.round(stats.totalProgress / allProjects.length) : 0;

      return stats;
    } catch (error) {
      console.error('Error getting project stats:', error);
      throw error;
    }
  }

  // Get project by ID
  static async getProjectById(id) {
    try {
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.id, id))
        .limit(1);
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }

  // Create project
  static async createProject(data) {
    try {
      // Validate required fields
      if (!data.title || !data.description) {
        throw new Error('Title and description are required fields');
      }

      // Clean and process data
      const processedData = this.processProjectData(data);

      const result = await db
        .insert(projects)
        .values({
          ...processedData,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
      
      return this.parseProjectData(result[0]);
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Update project
  static async updateProject(id, data) {
    try {
      // Clean and process data
      const processedData = this.processProjectData(data);

      const result = await db
        .update(projects)
        .set({
          ...processedData,
          updatedAt: new Date()
        })
        .where(eq(projects.id, id))
        .returning();
      
      return this.parseProjectData(result[0]);
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // Process and clean project data
  static processProjectData(data) {
    return {
      title: data.title || '',
      description: data.description || '',
      shortDescription: data.shortDescription || null,
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      techStack: data.techStack && typeof data.techStack === 'object' ? data.techStack : {},
      category: data.category || null,
      status: data.status || 'planning',
      priority: data.priority || 'medium',
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      estimatedHours: data.estimatedHours ? parseInt(data.estimatedHours) : null,
      actualHours: data.actualHours ? parseInt(data.actualHours) : null,
      progress: data.progress ? Math.max(0, Math.min(100, parseInt(data.progress))) : 0,
      liveUrl: data.liveUrl || null,
      githubUrl: data.githubUrl || null,
      demoUrl: data.demoUrl || null,
      documentationUrl: data.documentationUrl || null,
      featured: Boolean(data.featured),
      imageUrl: data.imageUrl || null,
      gallery: Array.isArray(data.gallery) ? data.gallery : [],
      challenges: data.challenges || null,
      solutions: data.solutions || null,
      lessonsLearned: data.lessonsLearned || null,
      client: data.client || null,
      teamSize: data.teamSize ? parseInt(data.teamSize) : 1,
      budget: data.budget ? parseFloat(data.budget) : null,
      tags: Array.isArray(data.tags) ? data.tags : [],
      order: data.order ? parseInt(data.order) : 0,
      isPublic: Boolean(data.isPublic !== false)
    };
  }

  // Delete project
  static async deleteProject(id) {
    try {
      const result = await db
        .delete(projects)
        .where(eq(projects.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Update project order
  static async updateProjectOrder(projectOrders) {
    try {
      const updates = projectOrders.map(({ id, order }) =>
        db.update(projects)
          .set({ order, updatedAt: new Date() })
          .where(eq(projects.id, id))
      );
      
      await Promise.all(updates);
      return true;
    } catch (error) {
      console.error('Error updating project order:', error);
      throw error;
    }
  }

  // Create initial projects
  static async createInitialProjects() {
    const defaultProjects = [
      {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: true,
        order: 1
      },
      {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        technologies: ["Next.js", "TypeScript", "Socket.io", "MongoDB", "Framer Motion"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: true,
        order: 2
      },
      {
        title: "Weather Dashboard",
        description: "A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
        technologies: ["React", "Chart.js", "OpenWeather API", "CSS Modules"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        featured: false,
        order: 3
      }
    ];

    try {
      const results = [];
      for (const project of defaultProjects) {
        const result = await this.createProject(project);
        results.push(result);
      }
      return results;
    } catch (error) {
      console.error('Error creating initial projects:', error);
      throw error;
    }
  }
}
