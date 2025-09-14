"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Clock, Users, Target, Award, AlertCircle, Play, Pause, XCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const DynamicProjects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects data...');
        const response = await fetch('/api/projects');
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Projects data received:', data);
          setProjectsData(data);
        } else {
          console.error('Failed to fetch projects data, status:', response.status);
          const errorText = await response.text();
          console.error('Error response:', errorText);
        }
      } catch (error) {
        console.error('Error fetching projects data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [refreshKey]);

  const handleRefresh = () => {
    console.log('Refreshing projects data...');
    setRefreshKey(prev => prev + 1);
  };

  // Project status configuration
  const projectStatuses = {
    planning: { label: 'Planning', icon: Target, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    in_progress: { label: 'In Progress', icon: Play, color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    testing: { label: 'Testing', icon: AlertCircle, color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
    deployed: { label: 'Deployed', icon: CheckCircle, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    completed: { label: 'Completed', icon: Award, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    on_hold: { label: 'On Hold', icon: Pause, color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
    cancelled: { label: 'Cancelled', icon: XCircle, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

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
    );
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
    );
  }

  // Filter public projects only
  const publicProjects = projectsData.filter(project => project.isPublic !== false);

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
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              My Projects
            </h2>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-full hover:bg-muted/50 transition-colors"
              title="Refresh data from admin"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="h-5 w-5 text-muted-foreground hover:text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>
            </button>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and ongoing projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {publicProjects.map((project, index) => {
            const status = projectStatuses[project.status] || projectStatuses.planning;
            const StatusIcon = status.icon;

            return (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="group h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Project Image */}
                    {project.imageUrl && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}

                    {/* Project Header */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </div>

                      {/* Project Description */}
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {project.shortDescription || project.description}
                      </p>

                      {/* Project Meta */}
                      <div className="space-y-2 mb-4">
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
                                className="bg-primary h-1.5 rounded-full transition-all duration-500" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 4).map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 4 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                                +{project.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-auto">
                        {project.liveUrl && (
                          <Button 
                            asChild 
                            size="sm" 
                            className="flex-1"
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Live
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button 
                            asChild 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.demoUrl && !project.liveUrl && (
                          <Button 
                            asChild 
                            variant="outline" 
                            size="sm"
                            className="flex-1"
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
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
      </motion.div>
    </section>
  );
};

export default DynamicProjects;
