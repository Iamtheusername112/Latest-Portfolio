'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Target, Play, AlertCircle, CheckCircle, Award, Pause, XCircle } from 'lucide-react'
import { useThemeContext } from '@/contexts/theme-context'

export default function ModernProjects() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [projectsData, setProjectsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const { theme } = useThemeContext()

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
                        ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white scale-110 shadow-lg'
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
                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
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

        {/* Mobile View - Compact Horizontal */}
        <div className='md:hidden'>
          {/* Current Stage Badge */}
          <div className='flex items-center justify-between mb-2'>
            <span className='text-xs text-gray-500 dark:text-gray-400 font-medium'>Current Stage:</span>
            <div className='flex items-center gap-2'>
              {developmentStages.map((stage) => {
                const StageIcon = stage.icon
                const isCurrent = currentStage === stage.key || (currentStage === 1 && stage.key === 'planning') || (currentStage === 2 && stage.key === 'in_progress') || (currentStage === 3 && stage.key === 'testing') || (currentStage === 4 && stage.key === 'deployed') || (currentStage === 5 && stage.key === 'completed')
                
                if (isCurrent) {
                  return (
                    <span key={stage.key} className='px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full text-xs font-semibold flex items-center gap-1'>
                      <StageIcon className='h-3 w-3' />
                      {stage.label}
                    </span>
                  )
                }
                return null
              })}
            </div>
          </div>
          
          {/* Mini Progress Bar */}
          <div className='flex items-center gap-1'>
            {developmentStages.map((stage, index) => {
              const StageIcon = stage.icon
              const isCompleted = currentStage > index + 1
              const isCurrent = currentStage === index + 1
              
              return (
                <div key={stage.key} className='flex-1'>
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      isCurrent
                        ? 'bg-gradient-to-r from-blue-600 to-blue-800'
                        : isCompleted
                        ? 'bg-green-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                </div>
              )
            })}
          </div>
          
          {/* Stage Labels - Compact */}
          <div className='flex justify-between mt-1'>
            {developmentStages.map((stage, index) => {
              const isCompleted = currentStage > index + 1
              const isCurrent = currentStage === index + 1
              
              return (
                <span
                  key={stage.key}
                  className={`text-[10px] font-medium ${
                    isCurrent
                      ? 'text-blue-600 dark:text-blue-400'
                      : isCompleted
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {stage.label.slice(0, 4)}
                </span>
              )
            })}
          </div>
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

  // Reset to first page when projects data changes
  useEffect(() => {
    setCurrentPage(0)
  }, [projectsData])

  const otherProjects = projectsData || []
  const projectsPerPage = 3
  const totalPages = Math.ceil(otherProjects.length / projectsPerPage)
  const startIndex = currentPage * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const displayedProjects = otherProjects.slice(startIndex, endIndex)

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading) {
    return (
      <section className='py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden'>
        <div className='container mx-auto px-4'>
          <div className='text-center'>
            <div className='w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
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
        <div className='absolute top-20 left-10 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full filter blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-cyan-200 dark:bg-cyan-900 rounded-full filter blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-5xl md:text-6xl font-bold mb-6' style={{ color: 'var(--foreground)' }}>
            My{' '}
            <span className='text-theme-gradient'>
              Projects
            </span>
          </h2>
          <p className='text-xl max-w-3xl mx-auto' style={{ color: 'var(--foreground)' }}>
            A collection of projects that showcase my skills and passion for
            creating innovative digital solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {displayedProjects.map((project, index) => {
              const status = projectStatuses[project.status] || projectStatuses.planning
              const StatusIcon = status.icon

              return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className='group h-full'
              >
                <div className='bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border-2 border-gray-100 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500 shadow-lg hover:shadow-xl h-full flex flex-col'>
                  {/* Image Section */}
                  <div className='relative overflow-hidden h-48'>
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700'
                      />
                    ) : (
                      <div className='w-full h-full bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 flex items-center justify-center'>
                        <span className='text-white font-bold text-lg'>
                          {project.title}
                        </span>
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent'></div>
                    
                    {/* Quick Action Buttons */}
                    <div className='absolute bottom-3 left-3 right-3 flex gap-2'>
                      <motion.a
                        href={project.liveUrl}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 px-3 py-2 backdrop-blur-sm text-white rounded-lg font-semibold text-sm transition-all duration-300 text-center shadow-md flex items-center justify-center gap-1 ${theme.buttonPrimary}`}
                      >
                        <svg className="w-3 h-3 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'white' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span className='font-bold drop-shadow-lg' style={{ color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)' }}>Demo</span>
                      </motion.a>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className='p-4 flex-1 flex flex-col space-y-3'>
                    {/* Title */}
                    <h3 className='text-lg font-bold' style={{ color: 'var(--foreground)' }}>
                      {project.title}
                    </h3>

                    {/* Project Stage Tracker */}
                    {project.status && (
                      <div className='p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700'>
                        <ProjectStageTracker currentStatus={project.status} />
                      </div>
                    )}
                    
                    {/* Description */}
                    <p className='text-sm leading-relaxed line-clamp-2 flex-1' style={{ color: 'var(--muted-foreground)' }}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className='flex flex-wrap gap-1.5'>
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded text-xs font-medium'
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='flex items-center justify-center gap-4 mt-12'
            >
              <motion.button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                whileHover={{ scale: currentPage === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 0 ? 1 : 0.95 }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  currentPage === 0
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : `${theme.buttonPrimary} text-white shadow-lg hover:shadow-xl`
                }`}
                style={currentPage === 0 ? {} : { color: 'white' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </motion.button>

              {/* Page Indicator */}
              <div className='flex items-center gap-2'>
                <span className='text-sm font-medium' style={{ color: 'var(--foreground)' }}>
                  Page {currentPage + 1} of {totalPages}
                </span>
              </div>

              <motion.button
                onClick={handleNext}
                disabled={currentPage >= totalPages - 1}
                whileHover={{ scale: currentPage >= totalPages - 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage >= totalPages - 1 ? 1 : 0.95 }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  currentPage >= totalPages - 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : `${theme.buttonPrimary} text-white shadow-lg hover:shadow-xl`
                }`}
                style={currentPage >= totalPages - 1 ? {} : { color: 'white' }}
              >
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          )}
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
            className='px-8 py-4 btn-theme-primary font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg'
          >
            Let's Work Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
