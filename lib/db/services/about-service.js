import { db } from '../config.js';
import { aboutContent } from '../schema.js';
import { eq } from 'drizzle-orm';

export class AboutService {
  // Get about content
  static async getAboutContent() {
    try {
      const result = await db.select().from(aboutContent).limit(1);
      const content = result[0] || null;
      
      // Parse JSON fields if they exist
      if (content) {
        if (typeof content.stats === 'string') {
          try {
            content.stats = JSON.parse(content.stats);
          } catch (e) {
            console.warn('Error parsing stats JSON:', e);
            content.stats = [];
          }
        }
        if (typeof content.skills === 'string') {
          try {
            content.skills = JSON.parse(content.skills);
          } catch (e) {
            console.warn('Error parsing skills JSON:', e);
            content.skills = [];
          }
        }
        if (typeof content.experiences === 'string') {
          try {
            content.experiences = JSON.parse(content.experiences);
          } catch (e) {
            console.warn('Error parsing experiences JSON:', e);
            content.experiences = [];
          }
        }
      }
      
      return content;
    } catch (error) {
      console.error('Error fetching about content:', error);
      throw error;
    }
  }

  // Update about content
  static async updateAboutContent(data) {
    try {
      // Validate required fields
      if (!data.title || !data.name || !data.description) {
        throw new Error('Title, name, and description are required fields');
      }

      // Clean the data to remove any invalid fields and ensure proper types
      const processedData = {
        title: data.title,
        subtitle: data.subtitle || null,
        name: data.name,
        description: data.description,
        description2: data.description2 || null,
        profileImageUrl: data.profileImageUrl || null,
        backgroundImageUrl: data.backgroundImageUrl || null,
        stats: Array.isArray(data.stats) ? data.stats : [],
        skills: Array.isArray(data.skills) ? data.skills : [],
        experiences: Array.isArray(data.experiences) ? data.experiences : []
      };

      const existing = await this.getAboutContent();
      
      if (existing) {
        const result = await db
          .update(aboutContent)
          .set({
            ...processedData,
            updatedAt: new Date()
          })
          .where(eq(aboutContent.id, existing.id))
          .returning();
        return result[0];
      } else {
        const result = await db
          .insert(aboutContent)
          .values({
            ...processedData,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .returning();
        return result[0];
      }
    } catch (error) {
      console.error('Error updating about content:', error);
      throw error;
    }
  }

  // Create initial about content
  static async createInitialAboutContent() {
    const defaultData = {
      title: "About Me",
      subtitle: "Passionate about creating digital solutions that make a difference",
      name: "Hello! I'm Iwu Francis",
      description: "I'm a passionate full-stack developer with over 5 years of experience building web and mobile applications. I love turning complex problems into simple, beautiful, and intuitive solutions.",
      description2: "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.",
      stats: [
        { label: "Years Experience", value: "5+" },
        { label: "Projects Completed", value: "50+" },
        { label: "Happy Clients", value: "30+" },
        { label: "Client Satisfaction", value: "100%" }
      ],
      skills: [
        {
          category: "Frontend",
          technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
        },
        {
          category: "Backend",
          technologies: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"]
        },
        {
          category: "Mobile",
          technologies: ["React Native", "Expo", "iOS", "Android"]
        },
        {
          category: "Tools",
          technologies: ["Git", "Docker", "AWS", "Vercel", "Figma"]
        }
      ],
      experiences: [
        {
          title: "Senior Full Stack Developer",
          company: "TechCorp Inc.",
          period: "2022 - Present",
          description: "Led development of scalable web applications serving 100k+ users. Implemented microservices architecture and improved performance by 40%."
        },
        {
          title: "Full Stack Developer",
          company: "StartupXYZ",
          period: "2020 - 2022",
          description: "Built and maintained multiple client projects using React, Node.js, and cloud technologies. Collaborated with cross-functional teams to deliver high-quality products."
        },
        {
          title: "Frontend Developer",
          company: "WebAgency",
          period: "2019 - 2020",
          description: "Developed responsive web applications and improved user experience. Worked with designers to implement pixel-perfect interfaces."
        }
      ]
    };

    return await this.updateAboutContent(defaultData);
  }

  // Initialize about content if it doesn't exist
  static async ensureAboutContentExists() {
    try {
      const existing = await this.getAboutContent();
      if (!existing) {
        console.log('No about content found, creating default content...');
        return await this.createInitialAboutContent();
      }
      return existing;
    } catch (error) {
      console.error('Error ensuring about content exists:', error);
      throw error;
    }
  }
}
