import { db } from '../config.js';
import { heroContent } from '../schema.js';
import { eq } from 'drizzle-orm';

export class HeroService {
  // Get hero content
  static async getHeroContent() {
    try {
      const result = await db.select().from(heroContent).limit(1);
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching hero content:', error);
      throw error;
    }
  }

  // Update hero content
  static async updateHeroContent(data) {
    try {
      const existing = await this.getHeroContent();
      
      if (existing) {
        const result = await db
          .update(heroContent)
          .set({
            ...data,
            updatedAt: new Date()
          })
          .where(eq(heroContent.id, existing.id))
          .returning();
        return result[0];
      } else {
        const result = await db
          .insert(heroContent)
          .values({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .returning();
        return result[0];
      }
    } catch (error) {
      console.error('Error updating hero content:', error);
      throw error;
    }
  }

  // Create initial hero content
  static async createInitialHeroContent() {
    const defaultData = {
      name: "John Doe",
      title: "Full Stack Web Developer",
      description: "I create beautiful, functional, and user-centered digital experiences that bring ideas to life. Passionate about clean code, modern technologies, and continuous learning.",
      cvUrl: "/cv.pdf",
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "mailto:john@example.com"
      }
    };

    return await this.updateHeroContent(defaultData);
  }
}
