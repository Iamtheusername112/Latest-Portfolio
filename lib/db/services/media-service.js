import { db } from '../config.js';
import { mediaFiles } from '../schema.js';
import { eq, desc, asc, like, or } from 'drizzle-orm';

export class MediaService {
  // Get all media files
  static async getAllMediaFiles() {
    try {
      const result = await db
        .select()
        .from(mediaFiles)
        .orderBy(desc(mediaFiles.createdAt));
      return result;
    } catch (error) {
      console.error('Error fetching media files:', error);
      throw error;
    }
  }

  // Get media files by category
  static async getMediaFilesByCategory(category) {
    try {
      const result = await db
        .select()
        .from(mediaFiles)
        .where(eq(mediaFiles.category, category))
        .orderBy(desc(mediaFiles.createdAt));
      return result;
    } catch (error) {
      console.error('Error fetching media files by category:', error);
      throw error;
    }
  }

  // Search media files
  static async searchMediaFiles(query) {
    try {
      const result = await db
        .select()
        .from(mediaFiles)
        .where(
          or(
            like(mediaFiles.name, `%${query}%`),
            like(mediaFiles.alt, `%${query}%`)
          )
        )
        .orderBy(desc(mediaFiles.createdAt));
      return result;
    } catch (error) {
      console.error('Error searching media files:', error);
      throw error;
    }
  }

  // Get media file by ID
  static async getMediaFileById(id) {
    try {
      const result = await db
        .select()
        .from(mediaFiles)
        .where(eq(mediaFiles.id, id))
        .limit(1);
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching media file:', error);
      throw error;
    }
  }

  // Create media file
  static async createMediaFile(data) {
    try {
      const result = await db
        .insert(mediaFiles)
        .values({
          ...data,
          uploadedAt: new Date(),
          createdAt: new Date()
        })
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error creating media file:', error);
      throw error;
    }
  }

  // Update media file
  static async updateMediaFile(id, data) {
    try {
      const result = await db
        .update(mediaFiles)
        .set(data)
        .where(eq(mediaFiles.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error updating media file:', error);
      throw error;
    }
  }

  // Delete media file
  static async deleteMediaFile(id) {
    try {
      const result = await db
        .delete(mediaFiles)
        .where(eq(mediaFiles.id, id))
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error deleting media file:', error);
      throw error;
    }
  }

  // Get media statistics
  static async getMediaStats() {
    try {
      const allFiles = await this.getAllMediaFiles();
      
      const stats = {
        total: allFiles.length,
        byType: {},
        byCategory: {},
        totalSize: 0
      };

      allFiles.forEach(file => {
        // Count by type
        stats.byType[file.type] = (stats.byType[file.type] || 0) + 1;
        
        // Count by category
        stats.byCategory[file.category] = (stats.byCategory[file.category] || 0) + 1;
        
        // Calculate total size (simplified - in real app, parse size string)
        const sizeInMB = parseFloat(file.size.replace(' MB', ''));
        stats.totalSize += sizeInMB;
      });

      return stats;
    } catch (error) {
      console.error('Error getting media stats:', error);
      throw error;
    }
  }

  // Create initial media files
  static async createInitialMediaFiles() {
    const defaultFiles = [
      {
        name: "hero-background.jpg",
        type: "image",
        size: "2.4 MB",
        url: "/api/placeholder/400/300",
        alt: "Hero section background",
        category: "backgrounds"
      },
      {
        name: "profile-picture.png",
        type: "image",
        size: "1.2 MB",
        url: "/api/placeholder/300/300",
        alt: "Profile picture",
        category: "profile"
      },
      {
        name: "project-screenshot-1.png",
        type: "image",
        size: "3.1 MB",
        url: "/api/placeholder/600/400",
        alt: "E-commerce project screenshot",
        category: "projects"
      }
    ];

    try {
      const results = [];
      for (const file of defaultFiles) {
        const result = await this.createMediaFile(file);
        results.push(result);
      }
      return results;
    } catch (error) {
      console.error('Error creating initial media files:', error);
      throw error;
    }
  }
}
