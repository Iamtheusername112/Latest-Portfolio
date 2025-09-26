import { NextResponse } from 'next/server'
import { ProjectsService } from '@/lib/db/services/projects-service.js'

export async function GET() {
  try {
    console.log('Fetching public projects...')

    // Get only public projects
    const projects = await ProjectsService.getPublicProjects()

    console.log(`Found ${projects.length} public projects`)

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching public projects:', error)

    // Return fallback projects data instead of error
    const fallbackProjects = [
      {
        id: 1,
        title: 'Portfolio Website',
        description:
          'A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features dynamic content management, admin dashboard, and mobile-responsive design.',
        imageUrl: '/logo.svg',
        technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
        liveUrl: 'https://iwufrancis.com',
        githubUrl: 'https://github.com/iwufrancis/portfolio',
        featured: true,
        status: 'completed',
        priority: 'high',
        isPublic: true,
      },
      {
        id: 2,
        title: 'E-commerce Platform',
        description:
          'Full-stack e-commerce solution with payment integration, inventory management, and comprehensive admin dashboard.',
        imageUrl: '/logo.svg',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
        status: 'in_progress',
        priority: 'high',
        isPublic: true,
      },
      {
        id: 3,
        title: 'Task Management App',
        description:
          'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        imageUrl: '/logo.svg',
        technologies: ['Next.js', 'TypeScript', 'Socket.io', 'MongoDB'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        status: 'testing',
        priority: 'medium',
        isPublic: true,
      },
      {
        id: 4,
        title: 'Weather Dashboard',
        description:
          'Responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
        imageUrl: '/logo.svg',
        technologies: ['React', 'Chart.js', 'OpenWeather API', 'CSS Modules'],
        liveUrl: '#',
        githubUrl: '#',
        featured: false,
        status: 'completed',
        priority: 'low',
        isPublic: true,
      },
    ]

    return NextResponse.json(fallbackProjects)
  }
}
