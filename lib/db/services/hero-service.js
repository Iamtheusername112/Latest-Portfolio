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
      name: "Iwu Francis",
      title: "Full Stack Web Developer",
      description: "I create beautiful, functional, and user-centered digital experiences that bring ideas to life. Passionate about clean code, modern technologies, and continuous learning.",
      cvUrl: "/cv.pdf",
      profileImageUrl: "",
      backgroundImageUrl: "",
      backgroundVideoUrl: "",
      backgroundType: "gradient",
      primaryButtonText: "View My Work",
      primaryButtonAction: "scroll",
      primaryButtonLink: "",
      secondaryButtonText: "Download CV",
      secondaryButtonAction: "download",
      secondaryButtonLink: "/cv.pdf",
      showScrollIndicator: true,
      scrollIndicatorText: "Scroll Down",
      socialLinks: {
        github: "https://github.com/Iamtheusername112",
        linkedin: "https://linkedin.com/in/francis-iwu-878973238",
        instagram: "https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3",
        email: "mailto:iwufrancis571@gmail.com"
      },
      customCss: "",
      isActive: true
    };

    return await this.updateHeroContent(defaultData);
  }
}
