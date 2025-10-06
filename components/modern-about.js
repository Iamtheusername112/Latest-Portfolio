'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ModernAbout() {
  const [activeTab, setActiveTab] = useState('about')
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch about data from API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/public/about')
        const data = await response.json()
        setAboutData(data.about)
      } catch (error) {
        console.error('Error fetching about data:', error)
        // Fallback data
        setAboutData({
          title: 'About Me',
          content:
            "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems.",
          skills: [
            'JavaScript',
            'TypeScript',
            'React',
            'Next.js',
            'Node.js',
            'Python',
            'PostgreSQL',
            'MongoDB',
            'AWS',
            'Docker',
          ],
          experience: '5+ years',
          projects: '50+',
          clients: '20+',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  // Professional skills data with detailed information - Always use fallback for consistency
  const skills = [
    {
      name: 'React & Next.js',
      level: 95,
      icon: '⚛️',
      description: 'Expert in building scalable React applications with Next.js, including SSR, SSG, and advanced state management. Specialized in performance optimization and modern React patterns.',
      experience: '4+ years',
      category: 'Frontend',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Node.js & Express',
      level: 90,
      icon: '🟢',
      description: 'Experienced in building robust backend services and APIs using Node.js, Express, and modern JavaScript features. Focus on microservices architecture and API design.',
      experience: '4+ years',
      category: 'Backend',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'TypeScript',
      level: 88,
      icon: '🔷',
      description: 'Proficient in TypeScript for building type-safe applications and improving code quality and maintainability. Expert in advanced TypeScript patterns and generics.',
      experience: '3+ years',
      category: 'Language',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      name: 'Python & Django',
      level: 85,
      icon: '🐍',
      description: 'Skilled in Python for web development, data analysis, and automation with frameworks like Django and Flask. Experience in building scalable web applications.',
      experience: '3+ years',
      category: 'Backend',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      name: 'PostgreSQL',
      level: 87,
      icon: '🐘',
      description: 'Expert in database design, optimization, and complex queries using PostgreSQL and other SQL databases. Specialized in performance tuning and data modeling.',
      experience: '4+ years',
      category: 'Database',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      name: 'AWS Cloud',
      level: 82,
      icon: '☁️',
      description: 'Experienced in cloud architecture, deployment, and management using AWS services like EC2, S3, Lambda, and RDS. Focus on scalable and cost-effective solutions.',
      experience: '2+ years',
      category: 'Cloud',
      color: 'from-blue-500 to-indigo-500',
    },
  ]

  // Dynamic experiences from API data
  const experiences = aboutData?.experiences || [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description:
        'Leading development of scalable web applications and mentoring junior developers.',
      icon: '💼',
    },
    {
      title: 'Frontend Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      description:
        'Built responsive user interfaces and optimized application performance.',
      icon: '🚀',
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      period: '2019 - 2020',
      description:
        'Developed web applications and learned modern development practices.',
      icon: '🎯',
    },
  ]

  if (loading) {
    return (
      <section className='py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden'>
        <div className='container mx-auto px-4'>
          <div className='text-center'>
            <div className='w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <p className='text-gray-900 dark:text-gray-300 font-medium'>Loading about section...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
        </motion.div>

        {/* Tab Navigation */}
        <div className='flex justify-center mb-12'>
          <div className='bg-gray-100 dark:bg-gray-800 rounded-full p-2 flex gap-2'>
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'btn-theme-primary shadow-lg'
                    : 'text-gray-900 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-6xl mx-auto'
        >
          {activeTab === 'about' && (
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='relative'
              >
                <div className='bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-blue-200 dark:border-blue-700'>
                  <div className='bg-white dark:bg-gray-800 rounded-xl p-6 transform -rotate-3 shadow-lg'>
                    <h3 className='text-2xl font-bold mb-4' style={{ color: 'var(--foreground)' }}>
                      My Story
                    </h3>
                    <p className='leading-relaxed mb-4 font-normal' style={{ color: 'var(--foreground)' }}>
                      I'm a passionate full-stack developer with over 5 years of
                      experience creating digital solutions that make a real
                      impact. My journey began with curiosity about how things
                      work, and it evolved into a love for building applications
                      that solve real-world problems.
                    </p>
                    <p className='leading-relaxed font-normal' style={{ color: 'var(--foreground)' }}>
                      When I'm not coding, you'll find me exploring new
                      technologies, contributing to open-source projects, or
                      sharing knowledge with the developer community.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='space-y-6'
              >
                <div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg'>
                  <h4 className='text-xl font-semibold mb-3' style={{ color: 'var(--foreground)' }}>
                    🎯 Mission
                  </h4>
                  <p className='font-normal' style={{ color: 'var(--foreground)' }}>
                    To create technology that enhances human experiences and
                    solves complex problems with elegant solutions.
                  </p>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg'>
                  <h4 className='text-xl font-semibold mb-3' style={{ color: 'var(--foreground)' }}>
                    💡 Philosophy
                  </h4>
                  <p className='font-normal' style={{ color: 'var(--foreground)' }}>
                    I believe in continuous learning, clean code, and putting
                    users at the center of every design decision.
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className='space-y-8'>
              {/* Skills Overview */}
              <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold mb-4' style={{ color: 'var(--foreground)' }}>
                  Technical Skills & Expertise
                </h3>
                <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                  Here's a breakdown of my technical skills with proficiency levels. Each percentage represents my confidence and experience level with that technology.
                </p>
              </div>

              {/* Skills Grid - Show only first 3 skills */}
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {skills.slice(0, 3).map((skill, index) => {
                  const getProficiencyLevel = (level) => {
                    if (level >= 90) return { label: 'Expert', description: 'Advanced mastery, can teach others', color: 'text-green-600' }
                    if (level >= 75) return { label: 'Advanced', description: 'Highly proficient, can lead projects', color: 'text-blue-600' }
                    if (level >= 50) return { label: 'Intermediate', description: 'Comfortable with most tasks', color: 'text-yellow-600' }
                    return { label: 'Learning', description: 'Currently developing skills', color: 'text-gray-600' }
                  }
                  
                  const proficiency = getProficiencyLevel(skill.level)
                  
                  return (
                    <motion.div
                      key={`${skill.name}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group'
                    >
                      {/* Skill Header */}
                      <div className='flex items-start justify-between mb-4'>
                        <div className='flex items-center gap-3'>
                          <div className='text-2xl'>{skill.icon || '💻'}</div>
                          <div>
                            <h3 className='text-lg font-semibold' style={{ color: 'var(--foreground)' }}>
                              {skill.name}
                            </h3>
                            <p className={`text-sm font-medium ${proficiency.color}`}>
                              {proficiency.label}
                            </p>
                          </div>
                        </div>
                        <span className='text-theme-accent font-bold text-lg'>
                          {skill.level}%
                        </span>
                      </div>

                      {/* Skill Description */}
                      <p className='text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed'>
                        {skill.description || `${proficiency.description} in ${skill.name}.`}
                      </p>

                      {/* Progress Bar with Context */}
                      <div className='space-y-2'>
                        <div className='flex justify-between text-xs text-gray-500 dark:text-gray-400'>
                          <span>Proficiency Level</span>
                          <span>{proficiency.label} ({skill.level}%)</span>
                        </div>
                        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden'>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className={`h-3 rounded-full bg-gradient-to-r ${skill.color} shadow-sm`}
                          />
                        </div>
                      </div>

                      {/* Experience Context */}
                      {skill.experience && (
                        <div className='mt-4 pt-3 border-t border-gray-200 dark:border-gray-700'>
                          <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                            <span>⏱️</span>
                            <span>{skill.experience} of experience</span>
                          </div>
                        </div>
                      )}

                      {/* Skill Category */}
                      {skill.category && (
                        <div className='mt-2'>
                          <span className='inline-block px-2 py-1 text-xs font-medium bg-theme-accent/10 text-theme-accent rounded-full'>
                            {skill.category}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Skills Legend */}
              <div className='bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
                <h4 className='text-lg font-semibold mb-4' style={{ color: 'var(--foreground)' }}>
                  Understanding the Proficiency Levels
                </h4>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 bg-gray-500 rounded-full'></div>
                    <div>
                      <p className='font-medium text-sm'>Learning (0-49%)</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>Currently developing skills</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 bg-yellow-500 rounded-full'></div>
                    <div>
                      <p className='font-medium text-sm'>Intermediate (50-74%)</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>Comfortable with most tasks</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 bg-blue-500 rounded-full'></div>
                    <div>
                      <p className='font-medium text-sm'>Advanced (75-89%)</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>Highly proficient, can lead projects</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 bg-green-500 rounded-full'></div>
                    <div>
                      <p className='font-medium text-sm'>Expert (90-100%)</p>
                      <p className='text-xs text-gray-600 dark:text-gray-400'>Advanced mastery, can teach others</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className='space-y-8'>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-theme-accent transition-colors duration-300 shadow-lg'
                >
                  <div className='flex items-start gap-4'>
                    <div className='text-3xl'>{exp.icon}</div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold mb-2' style={{ color: 'var(--foreground)' }}>
                        {exp.title}
                      </h3>
                      <p className='text-theme-accent font-medium mb-2'>
                        {exp.company} • {exp.period}
                      </p>
                      <p className='font-normal' style={{ color: 'var(--foreground)' }}>{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
