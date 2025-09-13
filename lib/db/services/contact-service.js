import { db } from '../config.js';
import { contactInfo } from '../schema.js';
import { eq } from 'drizzle-orm';

export class ContactService {
  // Get contact information
  static async getContactInfo() {
    try {
      const result = await db.select().from(contactInfo).limit(1);
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching contact info:', error);
      throw error;
    }
  }

  // Update contact information
  static async updateContactInfo(data) {
    try {
      const existing = await this.getContactInfo();
      
      if (existing) {
        const result = await db
          .update(contactInfo)
          .set({
            ...data,
            updatedAt: new Date()
          })
          .where(eq(contactInfo.id, existing.id))
          .returning();
        return result[0];
      } else {
        const result = await db
          .insert(contactInfo)
          .values({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .returning();
        return result[0];
      }
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }
  }

  // Create initial contact info
  static async createInitialContactInfo() {
    const defaultData = {
      title: "Get In Touch",
      subtitle: "Have a project in mind or want to collaborate? I'd love to hear from you!",
      description: "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!",
      contactDetails: [
        { type: "email", value: "john@example.com", href: "mailto:john@example.com" },
        { type: "phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
        { type: "location", value: "San Francisco, CA", href: "#" }
      ],
      socialLinks: [
        { name: "GitHub", href: "https://github.com" },
        { name: "LinkedIn", href: "https://linkedin.com" },
        { name: "Twitter", href: "https://twitter.com" }
      ]
    };

    return await this.updateContactInfo(defaultData);
  }
}
