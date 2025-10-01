'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

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

  // Dynamic skills from API data
  const skills = aboutData?.skills
    ? aboutData.skills.map((skill, index) => ({
        name: typeof skill === 'string' ? skill : skill.name,
        level:
          typeof skill === 'object' && skill.level
            ? skill.level
            : 85 + (index % 15),
        color: [
          'from-blue-500 to-cyan-500',
          'from-green-500 to-emerald-500',
          'from-blue-600 to-indigo-600',
          'from-yellow-500 to-orange-500',
          'from-pink-500 to-rose-500',
          'from-purple-500 to-violet-500',
        ][index % 6],
      }))
    : [
        {
          name: 'React/Next.js',
          level: 95,
          color: 'from-blue-500 to-cyan-500',
        },
        { name: 'Node.js', level: 90, color: 'from-green-500 to-emerald-500' },
        { name: 'TypeScript', level: 88, color: 'from-blue-600 to-indigo-600' },
        { name: 'Python', level: 85, color: 'from-yellow-500 to-orange-500' },
        { name: 'UI/UX Design', level: 92, color: 'from-pink-500 to-rose-500' },
        {
          name: 'Database Design',
          level: 87,
          color: 'from-purple-500 to-violet-500',
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
            <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
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
          <h2 className='text-5xl md:text-6xl font-bold mb-6'>
            <span className='text-black dark:text-white'>{aboutData?.title || 'About'}</span>{' '}
            <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Me
            </span>
          </h2>
          <p className='text-xl text-gray-900 dark:text-gray-300 max-w-3xl mx-auto font-medium'>
            {aboutData?.content ||
              'Passionate developer with a love for creating beautiful, functional, and user-centered digital experiences.'}
          </p>
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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
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
                <div className='bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-purple-200 dark:border-purple-700'>
                  <div className='bg-white dark:bg-gray-800 rounded-xl p-6 transform -rotate-3 shadow-lg'>
                    <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                      My Story
                    </h3>
                    <p className='text-gray-900 dark:text-gray-300 leading-relaxed mb-4 font-normal'>
                      I'm a passionate full-stack developer with over 5 years of
                      experience creating digital solutions that make a real
                      impact. My journey began with curiosity about how things
                      work, and it evolved into a love for building applications
                      that solve real-world problems.
                    </p>
                    <p className='text-gray-900 dark:text-gray-300 leading-relaxed font-normal'>
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
                  <h4 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
                    🎯 Mission
                  </h4>
                  <p className='text-gray-900 dark:text-gray-300 font-normal'>
                    To create technology that enhances human experiences and
                    solves complex problems with elegant solutions.
                  </p>
                </div>

                <div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg'>
                  <h4 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
                    💡 Philosophy
                  </h4>
                  <p className='text-gray-900 dark:text-gray-300 font-normal'>
                    I believe in continuous learning, clean code, and putting
                    users at the center of every design decision.
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className='grid md:grid-cols-2 gap-8'>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg'
                >
                  <div className='flex justify-between items-center mb-3'>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                      {skill.name}
                    </h3>
                    <span className='text-purple-600 font-semibold'>
                      {skill.level}%
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3'>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`h-3 rounded-full bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                </motion.div>
              ))}
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
                  className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-colors duration-300 shadow-lg'
                >
                  <div className='flex items-start gap-4'>
                    <div className='text-3xl'>{exp.icon}</div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                        {exp.title}
                      </h3>
                      <p className='text-purple-600 font-medium mb-2'>
                        {exp.company} • {exp.period}
                      </p>
                      <p className='text-gray-900 dark:text-gray-300 font-normal'>{exp.description}</p>
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
