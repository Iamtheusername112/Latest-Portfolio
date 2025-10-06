import { NextResponse } from 'next/server'
import { CVService } from '@/lib/db/services/cv-service'

export async function GET() {
  try {
    const cv = await CVService.getCVContent()

    if (!cv) {
      return NextResponse.json({
        cv: {
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
            }
          ],
          template: 'modern',
          colorScheme: 'blue',
          layout: 'single',
          showPhoto: false,
          isActive: true,
          isPublic: true
        }
      })
    }

    return NextResponse.json({ cv })
  } catch (error) {
    console.error('Error fetching CV data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch CV data' },
      { status: 500 }
    )
  }
}
