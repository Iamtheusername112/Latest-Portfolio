import { db } from '../config'
import { cvContent } from '../schema'
import { eq } from 'drizzle-orm'

export class CVService {
  // Get CV content
  static async getCVContent() {
    try {
      const result = await db
        .select()
        .from(cvContent)
        .where(eq(cvContent.isActive, true))
        .limit(1)
      
      return result[0] || null
    } catch (error) {
      console.error('Error fetching CV content:', error)
      throw error
    }
  }

  // Update CV content
  static async updateCVContent(data) {
    try {
      const existing = await this.getCVContent()

      // Filter out fields that shouldn't be updated
      const { id, createdAt, ...cleanData } = data

      if (existing) {
        const result = await db
          .update(cvContent)
          .set({
            ...cleanData,
            updatedAt: new Date(),
          })
          .where(eq(cvContent.id, existing.id))
          .returning()
        return result[0]
      } else {
        const result = await db
          .insert(cvContent)
          .values({
            ...cleanData,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning()
        return result[0]
      }
    } catch (error) {
      console.error('Error updating CV content:', error)
      throw error
    }
  }

  // Create initial CV content
  static async createInitialCVContent() {
    const defaultData = {
      fullName: 'Iwu Francis Chisom',
      title: 'Full Stack Web Developer',
      email: 'iwufrancischisom20@gmail.com',
      phone: '+234 123 456 7890',
      location: 'Nigeria',
      website: 'https://iwufrancis.com',
      linkedin: 'https://linkedin.com/in/iwufrancis',
      github: 'https://github.com/iwufrancis',
      summary: 'Passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems and make a difference.',
      technicalSkills: {
        frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
        tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code', 'Linux'],
        languages: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS']
      },
      softSkills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Project Management', 'Leadership'],
      experience: [
        {
          title: 'Full Stack Developer',
          company: 'Freelance',
          period: '2022 - Present',
          description: 'Developed full-stack web applications using React, Next.js, and Node.js. Built responsive, user-friendly interfaces and robust backend systems.',
          achievements: [
            'Built 20+ web applications for clients across various industries',
            'Improved application performance by 40% through code optimization',
            'Implemented modern development practices and CI/CD pipelines'
          ]
        },
        {
          title: 'Frontend Developer',
          company: 'Tech Solutions Inc',
          period: '2021 - 2022',
          description: 'Focused on creating responsive and interactive user interfaces using React and modern CSS frameworks.',
          achievements: [
            'Developed responsive web applications for mobile and desktop',
            'Collaborated with design team to implement pixel-perfect UIs',
            'Reduced page load times by 30% through optimization techniques'
          ]
        }
      ],
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          school: 'University of Technology',
          year: '2018 - 2022',
          description: 'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering'
        }
      ],
      projects: [
        {
          name: 'Portfolio Website',
          description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS',
          technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
          link: 'https://iwufrancis.com'
        },
        {
          name: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution with payment integration and admin dashboard',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          link: 'https://github.com/iwufrancis/ecommerce'
        }
      ],
      certifications: [
        {
          name: 'AWS Certified Developer',
          issuer: 'Amazon Web Services',
          date: '2023',
          credentialId: 'AWS-DEV-123456'
        },
        {
          name: 'React Developer Certification',
          issuer: 'Meta',
          date: '2022',
          credentialId: 'META-REACT-789012'
        }
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Spanish', proficiency: 'Intermediate' },
        { language: 'French', proficiency: 'Basic' }
      ],
      additionalInfo: {
        interests: ['Open Source', 'Tech Blogging', 'Photography', 'Travel'],
        volunteer: [
          {
            organization: 'Code for Good',
            role: 'Mentor',
            period: '2022 - Present',
            description: 'Mentoring junior developers and contributing to open source projects'
          }
        ],
        publications: [
          {
            title: 'Building Scalable React Applications',
            publisher: 'Tech Blog',
            date: '2023',
            link: 'https://blog.example.com/scalable-react'
          }
        ]
      },
      template: 'modern',
      colorScheme: 'blue',
      layout: 'single',
      showPhoto: false,
      isActive: true,
      isPublic: true
    }

    try {
      const result = await db
        .insert(cvContent)
        .values({
          ...defaultData,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning()
      return result[0]
    } catch (error) {
      console.error('Error creating initial CV content:', error)
      throw error
    }
  }

  // Get all CVs (for admin)
  static async getAllCVs() {
    try {
      const result = await db
        .select()
        .from(cvContent)
        .orderBy(cvContent.updatedAt)
      
      return result
    } catch (error) {
      console.error('Error fetching all CVs:', error)
      throw error
    }
  }

  // Delete CV
  static async deleteCV(id) {
    try {
      const result = await db
        .delete(cvContent)
        .where(eq(cvContent.id, id))
        .returning()
      
      return result[0]
    } catch (error) {
      console.error('Error deleting CV:', error)
      throw error
    }
  }
}
