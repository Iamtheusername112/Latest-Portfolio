'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ModernProjects() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [projectsData, setProjectsData] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleNavClick = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // Fetch projects data from API
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await fetch('/api/public/projects')
        const data = await response.json()
        setProjectsData(data.projects)
      } catch (error) {
        console.error('Error fetching projects data:', error)
        // Fallback data
        setProjectsData([
          {
            id: 1,
            title: 'E-Commerce Platform',
            description:
              'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
            imageUrl: '/api/placeholder/600/400',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            liveUrl: '#',
            githubUrl: '#',
            featured: true,
          },
          {
            id: 2,
            title: 'Task Management App',
            description:
              'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
            imageUrl: '/api/placeholder/600/400',
            technologies: ['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL'],
            liveUrl: '#',
            githubUrl: '#',
            featured: true,
          },
          {
            id: 3,
            title: 'Weather Dashboard',
            description:
              'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
            imageUrl: '/api/placeholder/600/400',
            technologies: ['Vue.js', 'Chart.js', 'OpenWeather API'],
            liveUrl: '#',
            githubUrl: '#',
            featured: false,
          },
          {
            id: 4,
            title: 'Portfolio Website',
            description:
              'A responsive portfolio website with smooth animations, dark mode, and contact form integration.',
            imageUrl: '/api/placeholder/600/400',
            technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
            liveUrl: '#',
            githubUrl: '#',
            featured: false,
          },
          {
            id: 5,
            title: 'Social Media Dashboard',
            description:
              'A comprehensive social media management dashboard with analytics, scheduling, and engagement tracking.',
            imageUrl: '/api/placeholder/600/400',
            technologies: ['React', 'Express', 'Redis', 'AWS'],
            liveUrl: '#',
            githubUrl: '#',
            featured: true,
          },
          {
            id: 6,
            title: 'AI Chat Application',
            description:
              'An intelligent chat application powered by AI with natural language processing and smart responses.',
            imageUrl: '/api/placeholder/600/400',
            technologies: ['React', 'OpenAI API', 'WebSocket', 'Node.js'],
            liveUrl: '#',
            githubUrl: '#',
            featured: false,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjectsData()
  }, [])

  const featuredProjects =
    projectsData?.filter((project) => project.featured) || []
  const otherProjects =
    projectsData?.filter((project) => !project.featured) || []

  if (loading) {
    return (
      <section className='py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden'>
        <div className='container mx-auto px-4'>
          <div className='text-center'>
            <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <p className='text-gray-600'>Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
            My{' '}
            <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Projects
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            A collection of projects that showcase my skills and passion for
            creating innovative digital solutions.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className='mb-20'>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-3xl font-bold text-gray-900 mb-12 text-center'
          >
            Featured Projects
          </motion.h3>

          <div className='grid lg:grid-cols-2 gap-8'>
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className='group relative'
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className='bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg'>
                  <div className='relative overflow-hidden'>
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className='w-full h-64 object-cover'
                      />
                    ) : (
                      <div className='w-full h-64 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'>
                        <span className='text-white text-lg font-semibold'>
                          Project Image
                        </span>
                      </div>
                    )}

                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className='absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center gap-4'
                    >
                      <motion.a
                        href={project.liveUrl}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className='px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-colors'
                      >
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className='px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition-colors'
                      >
                        GitHub
                      </motion.a>
                    </motion.div>
                  </div>

                  <div className='p-6'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-3'>
                      {project.title}
                    </h3>
                    <p className='text-gray-600 mb-4 leading-relaxed'>
                      {project.description}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className='px-3 py-1 bg-gray-100 text-purple-600 rounded-full text-sm font-medium'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other Projects Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-3xl font-bold text-gray-900 mb-12 text-center'
          >
            More Projects
          </motion.h3>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='group'
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className='bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg'>
                  <div className='relative overflow-hidden'>
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className='w-full h-48 object-cover'
                      />
                    ) : (
                      <div className='w-full h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center'>
                        <span className='text-white font-semibold'>
                          Project Image
                        </span>
                      </div>
                    )}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className='absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center'
                    >
                      <div className='flex gap-3'>
                        <motion.a
                          href={project.liveUrl}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className='px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-semibold hover:bg-purple-600 transition-colors'
                        >
                          Demo
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className='px-4 py-2 border border-white text-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-colors'
                        >
                          Code
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>

                  <div className='p-4'>
                    <h3 className='text-lg font-bold text-gray-900 mb-2'>
                      {project.title}
                    </h3>
                    <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                      {project.description}
                    </p>

                    <div className='flex flex-wrap gap-1'>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className='px-2 py-1 bg-gray-100 text-purple-600 rounded text-xs font-medium'
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className='px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs'>
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mt-16'
        >
          <motion.button
            onClick={() => handleNavClick('#contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg'
          >
            Let's Work Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
