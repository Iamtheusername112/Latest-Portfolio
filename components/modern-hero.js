'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ModernHero() {
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [textIndex, setTextIndex] = useState(0)
  const [heroData, setHeroData] = useState(null)
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

  // Fetch hero data from API
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/public/hero')
        const data = await response.json()
        setHeroData(data.hero)
      } catch (error) {
        console.error('Error fetching hero data:', error)
        // Fallback data
        setHeroData({
          name: 'Your Name',
          title: 'Full Stack Developer & UI/UX Designer',
          description:
            'Passionate about creating beautiful, functional web experiences that make a difference.',
          primaryButtonText: 'View My Work',
          primaryButtonLink: '#projects',
          secondaryButtonText: 'Get In Touch',
          secondaryButtonLink: '#contact',
          socialLinks: {
            github: '#',
            linkedin: '#',
            email: 'mailto:hello@example.com',
          },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHeroData()
  }, [])

  // Dynamic typing texts based on hero data
  const texts = heroData?.title
    ? [
        heroData.title.split(' & ')[0] || 'Full Stack Developer',
        heroData.title.split(' & ')[1] || 'UI/UX Designer',
        'Problem Solver',
        'Tech Innovator',
      ]
    : [
        'Full Stack Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Tech Innovator',
      ]

  useEffect(() => {
    if (loading) return

    const timeout = setTimeout(
      () => {
        const current = texts[textIndex]

        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1))
          if (currentText === '') {
            setIsDeleting(false)
            setTextIndex((prev) => (prev + 1) % texts.length)
          }
        } else {
          setCurrentText(current.substring(0, currentText.length + 1))
          if (currentText === current) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, textIndex, texts, loading])

  if (loading) {
    return (
      <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50'>
        <div className='text-center'>
          <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob'></div>
        <div className='absolute top-1/3 right-1/4 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000'></div>
      </div>

      {/* Floating Particles */}
      <div className='absolute inset-0'>
        {[...Array(50)].map((_, i) => {
          // Use deterministic positioning based on index to avoid hydration mismatch
          const left = ((i * 7.3) % 100).toFixed(2)
          const top = ((i * 11.7) % 100).toFixed(2)
          const duration = 3 + (i % 3) * 0.5
          const delay = (i % 5) * 0.4

          return (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-purple-400 rounded-full opacity-30'
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          )
        })}
      </div>

      <div className='relative z-10 text-center px-4 max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-8'
        >
          <h1 className='text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6'>
            <span className='bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'>
              Hello, I'm
            </span>
            <br />
            <span className='text-gray-800 dark:text-gray-200'>
              {heroData?.name || 'Your Name'}
            </span>
          </h1>

          <div className='text-3xl md:text-5xl font-semibold text-gray-700 dark:text-gray-300 mb-8 h-16 flex items-center justify-center'>
            <span className='text-purple-600 dark:text-purple-400'>I'm a </span>
            <span className='text-gray-900 dark:text-white ml-2 border-r-2 border-purple-600 dark:border-purple-400 animate-pulse'>
              {currentText}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='mb-12'
        >
          <p className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            {heroData?.description ||
              'Crafting digital experiences that blend creativity with cutting-edge technology. Passionate about building solutions that make a difference.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='flex flex-col sm:flex-row gap-6 justify-center items-center'
        >
          <motion.button
            onClick={() =>
              handleNavClick(heroData?.primaryButtonLink || '#projects')
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg'
          >
            {heroData?.primaryButtonText || 'View My Work'}
          </motion.button>

          <motion.button
            onClick={() =>
              handleNavClick(heroData?.secondaryButtonLink || '#contact')
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300 text-lg'
          >
            {heroData?.secondaryButtonText || 'Get In Touch'}
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
        >
          <motion.button
            onClick={() => handleNavClick('#about')}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className='w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center cursor-pointer hover:border-purple-600 dark:hover:border-purple-400 transition-colors duration-300'
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className='w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2'
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
