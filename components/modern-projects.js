'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Target, Play, AlertCircle, CheckCircle, Award, Pause, XCircle } from 'lucide-react'

export default function ModernProjects() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [projectsData, setProjectsData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Project status configuration with stage order
  const projectStatuses = {
    planning: { label: 'Planning', icon: Target, color: 'bg-blue-500 text-white', badgeColor: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300', stage: 1 },
    in_progress: { label: 'In Progress', icon: Play, color: 'bg-yellow-500 text-white', badgeColor: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300', stage: 2 },
    testing: { label: 'Testing', icon: AlertCircle, color: 'bg-orange-500 text-white', badgeColor: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300', stage: 3 },
    deployed: { label: 'Deployed', icon: CheckCircle, color: 'bg-green-500 text-white', badgeColor: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300', stage: 4 },
    completed: { label: 'Completed', icon: Award, color: 'bg-purple-500 text-white', badgeColor: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300', stage: 5 },
    on_hold: { label: 'On Hold', icon: Pause, color: 'bg-gray-500 text-white', badgeColor: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300', stage: 0 },
    cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-red-500 text-white', badgeColor: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300', stage: 0 }
  }

  // Development stages in order
  const developmentStages = [
    { key: 'planning', label: 'Planning', icon: Target },
    { key: 'in_progress', label: 'Development', icon: Play },
    { key: 'testing', label: 'Testing', icon: AlertCircle },
    { key: 'deployed', label: 'Deployed', icon: CheckCircle },
    { key: 'completed', label: 'Completed', icon: Award }
  ]

  // Function to render project stage tracker
  const ProjectStageTracker = ({ currentStatus }) => {
    const status = projectStatuses[currentStatus] || projectStatuses.planning
    const currentStage = status.stage
    const isOnHoldOrCancelled = currentStatus === 'on_hold' || currentStatus === 'cancelled'

    if (isOnHoldOrCancelled) {
      return (
        <div className='flex items-center justify-center py-2'>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${status.badgeColor}`}>
            {currentStatus === 'on_hold' ? <Pause className='h-4 w-4' /> : <XCircle className='h-4 w-4' />}
            {status.label}
          </span>
        </div>
      )
    }

    return (
      <div className='py-3'>
        {/* Desktop/Tablet View */}
        <div className='hidden md:flex items-center justify-between'>
          {developmentStages.map((stage, index) => {
            const StageIcon = stage.icon
            const isCompleted = currentStage > index + 1
            const isCurrent = currentStage === index + 1
            const isPending = currentStage < index + 1

            return (
              <div key={stage.key} className='flex items-center flex-1'>
                <div className='flex flex-col items-center flex-1'>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110 shadow-lg'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    <StageIcon className='h-5 w-5' />
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium text-center ${
                      isCurrent
                        ? 'text-purple-600 dark:text-purple-400 font-semibold'
                        : isCompleted
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
                {index < developmentStages.length - 1 && (
                  <div className='flex-1 h-1 mx-2 relative' style={{ maxWidth: '80px' }}>
                    <div className='absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full' />
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile View */}
        <div className='md:hidden space-y-2'>
          {developmentStages.map((stage, index) => {
            const StageIcon = stage.icon
            const isCompleted = currentStage > index + 1
            const isCurrent = currentStage === index + 1
            const isPending = currentStage < index + 1

            return (
              <div key={stage.key} className='flex items-center gap-3'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <StageIcon className='h-4 w-4' />
                </div>
                <div className='flex-1'>
                  <div className='h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
                    <div
                      className={`h-full transition-all duration-500 ${
                        isCurrent
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : isCompleted
                          ? 'bg-green-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      style={{ width: isCurrent ? '50%' : isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                </div>
                <span
                  className={`text-xs font-medium min-w-[80px] ${
                    isCurrent
                      ? 'text-purple-600 dark:text-purple-400 font-semibold'
                      : isCompleted
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

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
      <section className='py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden'>
        <div className='container mx-auto px-4'>
          <div className='text-center'>
            <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <p className='text-gray-600 dark:text-gray-300'>Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-20 left-10 w-96 h-96 bg-purple-200 dark:bg-purple-800 rounded-full filter blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-pink-200 dark:bg-pink-800 rounded-full filter blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
            My{' '}
            <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Projects
            </span>
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
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
            className='text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center'
          >
            Featured Projects
          </motion.h3>

          <div className='grid lg:grid-cols-2 gap-8'>
            {featuredProjects.map((project, index) => {
              const status = projectStatuses[project.status] || projectStatuses.planning
              const StatusIcon = status.icon

              return (
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
                <div className='bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 transform hover:scale-105 shadow-lg'>
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
                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
                      {project.title}
                    </h3>
                    
                    {/* Project Stage Tracker */}
                    {project.status && (
                      <div className='mb-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700'>
                        <ProjectStageTracker currentStatus={project.status} />
                      </div>
                    )}

                    <p className='text-gray-600 dark:text-gray-300 mb-4 leading-relaxed'>
                      {project.description}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              )
            })}
          </div>
        </div>

        {/* Other Projects Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center'
          >
            More Projects
          </motion.h3>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {otherProjects.map((project, index) => {
              const status = projectStatuses[project.status] || projectStatuses.planning
              const StatusIcon = status.icon

              return (
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
                <div className='bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 transform hover:scale-105 shadow-lg'>
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
                    <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
                      {project.title}
                    </h3>

                    {/* Project Stage Tracker */}
                    {project.status && (
                      <div className='mb-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700'>
                        <ProjectStageTracker currentStatus={project.status} />
                      </div>
                    )}
                    
                    <p className='text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2'>
                      {project.description}
                    </p>

                    <div className='flex flex-wrap gap-1'>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-purple-600 dark:text-purple-400 rounded text-xs font-medium'
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs'>
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
              )
            })}
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
