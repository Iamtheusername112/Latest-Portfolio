'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DynamicLogo from './dynamic-logo'
import ThemeSwitcher from './theme-switcher'

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      // Prevent scrolling
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    // Cleanup function
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

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
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ zIndex: 9997 }}
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
          <div className='hidden md:flex items-center gap-6'>
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
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-theme-gradient group-hover:w-full transition-all duration-300'></span>
              </motion.button>
            ))}
          </div>

          {/* Theme Switcher */}
          <div className='hidden md:block'>
            <ThemeSwitcher />
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
              className='px-6 py-2 btn-theme-primary font-semibold rounded-full hover:shadow-lg transition-all duration-300'
            >
              Let's Talk
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 text-gray-900 dark:text-white relative'
            style={{ zIndex: 10000 }}
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

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black/50 md:hidden'
            style={{ zIndex: 9998 }}
            onClick={() => setIsMobileMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()} // Prevent touch scrolling on overlay
          />
        )}

        {/* Mobile Menu Drawer - Slide from Right */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className='fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl md:hidden overflow-y-auto'
          style={{ zIndex: 9999 }}
          onTouchMove={(e) => {
            // Allow scrolling within the menu drawer
            const target = e.target
            const isScrollable = target.closest('.overflow-y-auto')
            if (!isScrollable) {
              e.preventDefault()
            }
          }}
        >
          <div className='p-6 pt-20'>
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className='absolute top-4 right-4 p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>

            {/* Navigation Links */}
            <div className='space-y-2 mb-8'>
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : 50 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className='block w-full text-left text-gray-900 dark:text-white hover:text-theme-accent transition-colors duration-300 font-medium py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800'
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Theme Switcher Section - Mobile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : 50 }}
              transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
              className='mb-8'
            >
              <div className='mb-4'>
                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3'>
                  Choose Theme
                </h3>
              </div>
              <ThemeSwitcher onThemeChange={() => setIsMobileMenuOpen(false)} />
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={() => handleNavClick('#contact')}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : 50 }}
              transition={{ duration: 0.3, delay: (navItems.length + 1) * 0.1 }}
              whileTap={{ scale: 0.95 }}
              className='w-full px-6 py-3 btn-theme-primary font-semibold rounded-full shadow-lg'
            >
              Let's Talk
            </motion.button>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}
