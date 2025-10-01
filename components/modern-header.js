'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DynamicLogo from './dynamic-logo'

export default function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false)

    // Smooth scroll to section
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 100) // Small delay to allow menu to close first
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className='flex items-center gap-2'
          >
            <DynamicLogo size='lg' showText={true} className='text-gray-900 dark:text-white' />
          </motion.div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-8'>
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className='text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-medium relative group'
              >
                {item.name}
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300'></span>
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='hidden md:block'
          >
            <motion.button
              onClick={() => handleNavClick('#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300'
            >
              Let's Talk
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 text-gray-900 dark:text-white'
          >
            <div className='w-6 h-6 flex flex-col justify-center items-center'>
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                className='w-full h-0.5 bg-gray-900 dark:bg-white mb-1 transition-all duration-300'
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className='w-full h-0.5 bg-gray-900 dark:bg-white mb-1 transition-all duration-300'
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                className='w-full h-0.5 bg-gray-900 dark:bg-white transition-all duration-300'
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className='md:hidden overflow-hidden'
        >
          <div className='py-4 space-y-4'>
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20,
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className='block text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-medium py-2 w-full text-left'
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              onClick={() => handleNavClick('#contact')}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20,
              }}
              transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
              whileTap={{ scale: 0.95 }}
              className='w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full'
            >
              Let's Talk
            </motion.button>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}
