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
      return result;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  // Get featured projects
  static async getFeaturedProjects() {
    try {
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.featured, true))
        .orderBy(asc(projects.order), desc(projects.createdAt));
      return result;
    } catch (error) {
      console.error('Error fetching featured projects:', error);
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
      const result = await db
        .insert(projects)
        .values({
          ...data,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Update project
  static async updateProject(id, data) {
    try {
      const result = await db
        .update(projects)
        .set({
          ...data,
          updatedAt: new Date()
        })
        .where(eq(projects.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
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
