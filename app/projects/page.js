'use client'

import Header from '@/components/header'
import DynamicFooter from '@/components/dynamic-footer'
import { useEffect, useState } from 'react'
import { useThemeContext } from '@/contexts/theme-context'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useThemeContext()

  useEffect(() => {
    // Always show fallback projects immediately
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

    // Set fallback projects immediately
    setProjects(fallbackProjects)
    setLoading(false)

    // Try to fetch from API in background
    fetch('/api/projects')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setProjects(data)
        }
      })
      .catch((error) => {
        console.log('Using fallback projects:', error.message)
      })
  }, [])

  return (
    <div className='min-h-screen'>
      <Header />
      <main>
        <section className='py-20 px-4 bg-muted/30'>
          <div className='max-w-6xl mx-auto'>
            {/* Section Header */}
            <div className='text-center mb-16'>
              <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
                My Projects
              </h2>
              <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
                A showcase of my recent work and ongoing projects
              </p>
            </div>

            {/* Projects Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
              {projects.map((project) => {
                const statusColors = {
                  planning: 'bg-blue-500 text-white',
                  in_progress: 'bg-yellow-500 text-white',
                  testing: 'bg-orange-500 text-white',
                  completed: 'bg-green-500 text-white',
                  deployed: 'bg-purple-500 text-white',
                  on_hold: 'bg-gray-500 text-white',
                  cancelled: 'bg-red-500 text-white',
                }

                const statusColor =
                  statusColors[project.status] || 'bg-gray-500 text-white'

                return (
                  <div
                    key={project.id}
                    className='group h-full bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 rounded-lg overflow-hidden'
                  >
                    <div className='p-4 sm:p-6 h-full flex flex-col'>
                      {/* Project Image */}
                      <div className='relative w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-3 sm:mb-4 bg-muted/20 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center'>
                        <div className='text-center text-muted-foreground'>
                          <div className='text-4xl mb-2'>💻</div>
                          <p className='text-xs sm:text-sm'>Project Image</p>
                        </div>
                      </div>

                      {/* Project Header */}
                      <div className='flex-1 flex flex-col'>
                        <div className='flex items-start justify-between mb-2 sm:mb-3'>
                          <h3 className='text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors pr-2'>
                            {project.title}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
                          >
                            {project.status?.replace('_', ' ') || 'Unknown'}
                          </span>
                        </div>

                        {/* Project Description */}
                        <p className='text-muted-foreground text-sm mb-3 sm:mb-4 line-clamp-3'>
                          {project.description}
                        </p>

                        {/* Technologies */}
                        {project.technologies &&
                          project.technologies.length > 0 && (
                            <div className='mb-3 sm:mb-4'>
                              <div className='flex flex-wrap gap-1'>
                                {project.technologies
                                  .slice(0, 3)
                                  .map((tech, techIndex) => (
                                    <span
                                      key={techIndex}
                                      className='px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md'
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                {project.technologies.length > 3 && (
                                  <span className='px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md'>
                                    +{project.technologies.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                        {/* Action Buttons */}
                        <div className='flex gap-2 mt-auto'>
                          {project.liveUrl && project.liveUrl !== '#' && (
                            <a
                              href={project.liveUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              className={`flex-1 text-xs sm:text-sm px-3 py-2 text-white rounded-md transition-colors flex items-center justify-center gap-1 font-semibold ${theme.buttonPrimary}`}
                            >
                              <svg
                                className='h-3 w-3 drop-shadow-lg'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                style={{ color: 'white' }}
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                                />
                              </svg>
                              <span className='font-bold drop-shadow-lg' style={{ color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)' }}>Live</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Call to Action */}
            <div className='text-center mt-16'>
              <p className='text-muted-foreground mb-6'>
                Interested in working together? Let's discuss your project!
              </p>
              <a
                href='#contact'
                className='inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200'
              >
                Get In Touch
                <svg
                  className='ml-2 w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <DynamicFooter />
    </div>
  )
}
