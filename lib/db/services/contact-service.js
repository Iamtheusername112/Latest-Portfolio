import { db } from '../config.js'
import { contactInfo } from '../schema.js'
import { eq } from 'drizzle-orm'

export class ContactService {
  // Get contact information
  static async getContactInfo() {
    try {
      const result = await db.select().from(contactInfo).limit(1)
      const content = result[0] || null

      // Parse JSON fields if they exist
      if (content) {
        if (typeof content.contactDetails === 'string') {
          try {
            content.contactDetails = JSON.parse(content.contactDetails)
          } catch (e) {
            console.warn('Error parsing contactDetails JSON:', e)
            content.contactDetails = []
          }
        }
        if (typeof content.socialLinks === 'string') {
          try {
            content.socialLinks = JSON.parse(content.socialLinks)
          } catch (e) {
            console.warn('Error parsing socialLinks JSON:', e)
            content.socialLinks = []
          }
        }
      }

      return content
    } catch (error) {
      console.error('Error fetching contact info:', error)
      throw error
    }
  }

  // Update contact information
  static async updateContactInfo(data) {
    try {
      // Clean the data to remove any invalid fields and ensure proper types
      const processedData = {
        title: data.title || 'Get In Touch',
        subtitle: data.subtitle || null,
        description: data.description || null,
        contactDetails: Array.isArray(data.contactInfo) ? data.contactInfo : [],
        socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
      }

      const existing = await this.getContactInfo()

      if (existing) {
        const result = await db
          .update(contactInfo)
          .set({
            ...processedData,
            updatedAt: new Date(),
          })
          .where(eq(contactInfo.id, existing.id))
          .returning()
        return result[0]
      } else {
        const result = await db
          .insert(contactInfo)
          .values({
            ...processedData,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning()
        return result[0]
      }
    } catch (error) {
      console.error('Error updating contact info:', error)
      throw error
    }
  }

  // Create initial contact info
  static async createInitialContactInfo() {
    const defaultData = {
      title: 'Get In Touch',
      subtitle:
        "Have a project in mind or want to collaborate? I'd love to hear from you!",
      description:
        "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!",
      contactDetails: [
        {
          type: 'email',
          value: 'iwufrancischisom20@gmail.com',
          href: 'mailto:iwufrancischisom20@gmail.com',
        },
        { type: 'location', value: 'Berlin, Germany', href: '#' },
        { type: 'availability', value: 'Available for remote work', href: '#' },
      ],
      socialLinks: [
        { name: 'GitHub', href: 'https://github.com/Iamtheusername112' },
        {
          name: 'LinkedIn',
          href: 'https://linkedin.com/in/francis-iwu-878973238',
        },
        {
          name: 'Instagram',
          href: 'https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3',
        },
      ],
    }

    return await this.updateContactInfo(defaultData)
  }

  // Initialize contact info if it doesn't exist
  static async ensureContactInfoExists() {
    try {
      const existing = await this.getContactInfo()
      if (!existing) {
        console.log('No contact info found, creating default content...')
        return await this.createInitialContactInfo()
      }
      return existing
    } catch (error) {
      console.error('Error ensuring contact info exists:', error)
      throw error
    }
  }
}
