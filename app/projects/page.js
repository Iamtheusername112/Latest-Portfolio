'use client'

import Header from '@/components/header'
import DynamicFooter from '@/components/dynamic-footer'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Calendar, Clock, Users, Target, Award, AlertCircle, Play, Pause, XCircle, CheckCircle, Image } from 'lucide-react'

function DynamicProjects() {
  const [projectsData, setProjectsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects data...')
        const response = await fetch('/api/projects')
        console.log('Response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Projects data received:', data)
          setProjectsData(data)
        } else {
          console.error('Failed to fetch projects data, status:', response.status)
          const errorText = await response.text()
          console.error('Error response:', errorText)
          setError('Failed to load projects')
        }
      } catch (error) {
        console.error('Error fetching projects data:', error)
        setError('Network error while loading projects')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Project status configuration
  const projectStatuses = {
    planning: { 
      label: 'Planning', 
      icon: Target, 
      color: 'bg-blue-500 text-white border-blue-600',
      progressColor: 'bg-blue-500'
    },
    in_progress: { 
      label: 'In Progress', 
      icon: Play, 
      color: 'bg-yellow-500 text-white border-yellow-600',
      progressColor: 'bg-yellow-500'
    },
    testing: { 
      label: 'Testing', 
      icon: AlertCircle, 
      color: 'bg-orange-500 text-white border-orange-600',
      progressColor: 'bg-orange-500'
    },
    deployed: { 
      label: 'Deployed', 
      icon: CheckCircle, 
      color: 'bg-green-500 text-white border-green-600',
      progressColor: 'bg-green-500'
    },
    completed: { 
      label: 'Completed', 
      icon: Award, 
      color: 'bg-purple-500 text-white border-purple-600',
      progressColor: 'bg-purple-500'
    },
    on_hold: { 
      label: 'On Hold', 
      icon: Pause, 
      color: 'bg-gray-500 text-white border-gray-600',
      progressColor: 'bg-gray-400'
    },
    cancelled: { 
      label: 'Cancelled', 
      icon: XCircle, 
      color: 'bg-red-500 text-white border-red-600',
      progressColor: 'bg-red-400'
    }
  }

  const projectPriorities = {
    low: { label: 'Low', color: 'bg-green-500 text-white border-green-600' },
    medium: { label: 'Medium', color: 'bg-yellow-500 text-white border-yellow-600' },
    high: { label: 'High', color: 'bg-orange-500 text-white border-orange-600' },
    urgent: { label: 'Urgent', color: 'bg-red-500 text-white border-red-600' }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (isLoading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            My Projects
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {error}. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  if (!projectsData || projectsData.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            My Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            No projects available at the moment. Check back soon!
          </p>
        </div>
      </section>
    )
  }

  // Filter public projects only
  const publicProjects = projectsData.filter(project => project.isPublic !== false)

  return (
    <section className="py-20 px-4 bg-muted/30">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            My Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and ongoing projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {publicProjects.map((project, index) => {
            const status = projectStatuses[project.status] || projectStatuses.planning
            const priority = projectPriorities[project.priority] || projectPriorities.medium
            const StatusIcon = status.icon
            
            return (
              <motion.div key={project.id} variants={itemVariants}>
                <div className="group h-full bg-background/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 rounded-lg overflow-hidden">
                  <div className="p-4 sm:p-6 h-full flex flex-col">
                    {/* Project Image */}
                    {project.imageUrl ? (
                      <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-3 sm:mb-4">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error('Image failed to load:', project.imageUrl)
                            e.target.style.display = 'none'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    ) : (
                      <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-3 sm:mb-4 bg-muted/20 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Image className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-xs sm:text-sm">No image</p>
                        </div>
                      </div>
                    )}

                    {/* Project Header */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors pr-2">
                          {project.title}
                        </h3>
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            <span className="hidden sm:inline">{status.label}</span>
                          </span>
                          {project.priority && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priority.color}`}>
                              <span className="hidden sm:inline">{priority.label}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Project Description */}
                      <p className="text-muted-foreground text-sm mb-3 sm:mb-4 line-clamp-3">
                        {project.shortDescription || project.description}
                      </p>

                      {/* Project Meta */}
                      <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                        {project.category && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Target className="h-3 w-3" />
                            <span>{project.category}</span>
                          </div>
                        )}
                        
                        {project.startDate && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(project.startDate).toLocaleDateString()}</span>
                          </div>
                        )}

                        {project.teamSize > 1 && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{project.teamSize} team members</span>
                          </div>
                        )}

                        {project.progress !== undefined && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full transition-all duration-500 ${status.progressColor}`}
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-3 sm:mb-4">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-auto">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-xs sm:text-sm px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="hidden sm:inline">Live</span>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-xs sm:text-sm px-3 py-2 border border-border text-foreground rounded-md hover:bg-accent transition-colors flex items-center justify-center gap-1"
                          >
                            <Github className="h-3 w-3" />
                            <span className="hidden sm:inline">Code</span>
                          </a>
                        )}
                        {project.demoUrl && !project.liveUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-xs sm:text-sm px-3 py-2 border border-border text-foreground rounded-md hover:bg-accent transition-colors flex items-center justify-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="hidden sm:inline">Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Empty State */}
        {publicProjects.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-12">
            <div className="text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
              <p>Projects will appear here once they are added through the admin dashboard.</p>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Interested in working together? Let's discuss your project!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Get In Touch
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <DynamicProjects />
      </main>
      <DynamicFooter />
    </div>
  )
}