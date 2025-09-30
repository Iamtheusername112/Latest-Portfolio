'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function ModernFooter() {
  const currentYear = new Date().getFullYear()
  const [footerData, setFooterData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Accordion state for mobile
  const [openSections, setOpenSections] = useState({
    brand: false,
    quickLinks: false,
    services: false,
    contact: false,
  })

  // Toggle accordion section
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Fetch footer data from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/api/public/footer')
        const data = await response.json()
        setFooterData(data)
      } catch (error) {
        console.error('Error fetching footer data:', error)
        // Fallback data
        setFooterData({
          brand: {
            name: 'Your Name',
            tagline: 'Full Stack Developer',
            description:
              'Full Stack Web Developer passionate about creating innovative digital solutions and beautiful user experiences.',
          },
          socialLinks: [
            { platform: 'github', url: '#', label: 'GitHub' },
            { platform: 'linkedin', url: '#', label: 'LinkedIn' },
            { platform: 'instagram', url: '#', label: 'Instagram' },
            {
              platform: 'mail',
              url: 'mailto:hello@example.com',
              label: 'Email',
            },
          ],
          quickLinks: [
            { name: 'Home', href: '#home' },
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Contact', href: '#contact' },
          ],
          contactInfo: {
            email: 'hello@example.com',
            location: 'Your City, Country',
            availability: 'Available for remote work',
          },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFooterData()
  }, [])

  // Helper function to get social icons
  const getSocialIcon = (platform) => {
    const iconMap = {
      github: '🐙',
      twitter: '🐦',
      linkedin: '💼',
      instagram: '📸',
      dribbble: '🏀',
      mail: '📧',
      email: '📧',
    }
    return iconMap[platform?.toLowerCase()] || '🔗'
  }

  // Helper function to get social colors
  const getSocialColor = (platform) => {
    const colorMap = {
      github: 'hover:bg-gray-600',
      twitter: 'hover:bg-blue-500',
      linkedin: 'hover:bg-blue-600',
      instagram: 'hover:bg-pink-500',
      dribbble: 'hover:bg-pink-600',
      mail: 'hover:bg-red-500',
      email: 'hover:bg-red-500',
    }
    return colorMap[platform?.toLowerCase()] || 'hover:bg-gray-600'
  }

  // Normalize social links data structure
  const socialLinks = (
    footerData?.socialLinks || [
      { name: 'GitHub', icon: '🐙', url: '#', color: 'hover:bg-gray-600' },
      { name: 'Twitter', icon: '🐦', url: '#', color: 'hover:bg-blue-500' },
      { name: 'LinkedIn', icon: '💼', url: '#', color: 'hover:bg-blue-600' },
      { name: 'Instagram', icon: '📸', url: '#', color: 'hover:bg-pink-500' },
      { name: 'Dribbble', icon: '🏀', url: '#', color: 'hover:bg-pink-600' },
    ]
  ).map((social, index) => ({
    name: social.name || social.platform || social.label || `social-${index}`,
    icon: social.icon || getSocialIcon(social.platform || social.name),
    url: social.url || '#',
    color: social.color || getSocialColor(social.platform || social.name),
    key: social.name || social.platform || social.label || `social-${index}`,
  }))

  const quickLinks = (
    footerData?.quickLinks || [
      { name: 'About', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' },
      { name: 'Blog', href: '#' },
    ]
  ).map((link, index) => ({
    ...link,
    key: link.name || `link-${index}`,
  }))

  const services = [
    { name: 'Web Development', href: '#', key: 'web-dev' },
    { name: 'UI/UX Design', href: '#', key: 'ui-ux' },
    { name: 'Mobile Apps', href: '#', key: 'mobile' },
    { name: 'Consulting', href: '#', key: 'consulting' },
  ]

  if (loading) {
    return (
      <footer className='bg-gradient-to-b from-gray-50 to-white relative overflow-hidden border-t border-gray-200'>
        <div className='container mx-auto px-4 py-8'>
          <div className='text-center'>
            <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <p className='text-gray-600'>Loading footer...</p>
          </div>
        </div>
      </footer>
    )
  }

  // Accordion Item Component
  const AccordionItem = ({ title, section, children, isOpen, onToggle }) => (
    <div className='border-b border-gray-200 last:border-b-0'>
      <button
        onClick={() => onToggle(section)}
        className='w-full flex items-center justify-between py-4 px-0 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset rounded-lg'
      >
        <h3 className='text-gray-900 font-bold text-lg'>{title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <ChevronUp className='w-5 h-5 text-gray-600' />
          ) : (
            <ChevronDown className='w-5 h-5 text-gray-600' />
          )}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <div className='pb-4'>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <footer className='bg-gradient-to-b from-gray-50 to-white relative overflow-hidden border-t border-gray-200'>
      {/* Background Elements */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl'></div>
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        {/* Mobile Accordion Layout */}
        <div className='block md:hidden py-8'>
          <AccordionItem
            title='About'
            section='brand'
            isOpen={openSections.brand}
            onToggle={toggleSection}
          >
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>
                  {footerData?.brand?.name?.charAt(0) || 'Y'}
                </span>
              </div>
              <span className='text-gray-900 font-bold text-lg'>
                {footerData?.brand?.name || 'YourName'}
              </span>
            </div>
            <p className='text-gray-600 mb-4 leading-relaxed text-sm'>
              {footerData?.brand?.description ||
                "Passionate developer creating digital experiences that make a difference. Let's build something amazing together."}
            </p>
            <div className='flex gap-3'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.key}
                  href={social.url}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 ${social.color} transition-all duration-300`}
                  title={social.name}
                >
                  <span className='text-sm'>{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem
            title='Quick Links'
            section='quickLinks'
            isOpen={openSections.quickLinks}
            onToggle={toggleSection}
          >
            <ul className='space-y-3'>
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className='text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center group text-sm'
                  >
                    <span className='w-0 group-hover:w-2 h-0.5 bg-purple-400 mr-0 group-hover:mr-2 transition-all duration-300'></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </AccordionItem>

          <AccordionItem
            title='Services'
            section='services'
            isOpen={openSections.services}
            onToggle={toggleSection}
          >
            <ul className='space-y-3'>
              {services.map((service, index) => (
                <motion.li
                  key={service.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <a
                    href={service.href}
                    className='text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center group text-sm'
                  >
                    <span className='w-0 group-hover:w-2 h-0.5 bg-purple-400 mr-0 group-hover:mr-2 transition-all duration-300'></span>
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </AccordionItem>

          <AccordionItem
            title='Contact'
            section='contact'
            isOpen={openSections.contact}
            onToggle={toggleSection}
          >
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <span className='text-purple-600 text-sm'>📧</span>
                <a
                  href={`mailto:${
                    footerData?.contactInfo?.email || 'hello@example.com'
                  }`}
                  className='text-gray-600 hover:text-gray-900 transition-colors duration-300 text-sm'
                >
                  {footerData?.contactInfo?.email || 'hello@example.com'}
                </a>
              </div>

              <div className='flex items-center gap-3'>
                <span className='text-purple-600 text-sm'>📍</span>
                <span className='text-gray-600 text-sm'>
                  {footerData?.contactInfo?.location || 'Your City, Country'}
                </span>
              </div>

              <div className='flex items-center gap-3'>
                <span className='text-purple-600 text-sm'>💼</span>
                <span className='text-gray-600 text-sm'>
                  {footerData?.contactInfo?.availability ||
                    'Available for remote work'}
                </span>
              </div>

              {/* Newsletter Signup */}
              <div className='mt-4'>
                <h4 className='text-gray-900 font-semibold mb-2 text-sm'>
                  Stay Updated
                </h4>
                <div className='flex gap-2'>
                  <input
                    type='email'
                    placeholder='Your email'
                    className='flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none text-xs'
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-300'
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
          </AccordionItem>
        </div>

        {/* Desktop Layout */}
        <div className='hidden md:block py-16'>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className='lg:col-span-1'
            >
              <div className='flex items-center gap-2 mb-6'>
                <div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold text-lg'>
                    {footerData?.brand?.name?.charAt(0) || 'Y'}
                  </span>
                </div>
                <span className='text-gray-900 font-bold text-xl'>
                  {footerData?.brand?.name || 'YourName'}
                </span>
              </div>

              <p className='text-gray-600 mb-6 leading-relaxed'>
                {footerData?.brand?.description ||
                  "Passionate developer creating digital experiences that make a difference. Let's build something amazing together."}
              </p>

              <div className='flex gap-4'>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.key}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 ${social.color} transition-all duration-300`}
                    title={social.name}
                  >
                    <span className='text-lg'>{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className='text-gray-900 font-bold text-lg mb-6'>
                Quick Links
              </h3>
              <ul className='space-y-3'>
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className='text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center group'
                    >
                      <span className='w-0 group-hover:w-2 h-0.5 bg-purple-400 mr-0 group-hover:mr-2 transition-all duration-300'></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className='text-gray-900 font-bold text-lg mb-6'>Services</h3>
              <ul className='space-y-3'>
                {services.map((service, index) => (
                  <motion.li
                    key={service.key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={service.href}
                      className='text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center group'
                    >
                      <span className='w-0 group-hover:w-2 h-0.5 bg-purple-400 mr-0 group-hover:mr-2 transition-all duration-300'></span>
                      {service.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className='text-gray-900 font-bold text-lg mb-6'>
                Get In Touch
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <span className='text-purple-600'>📧</span>
                  <a
                    href={`mailto:${
                      footerData?.contactInfo?.email || 'hello@example.com'
                    }`}
                    className='text-gray-600 hover:text-gray-900 transition-colors duration-300'
                  >
                    {footerData?.contactInfo?.email || 'hello@example.com'}
                  </a>
                </div>

                <div className='flex items-center gap-3'>
                  <span className='text-purple-600'>📍</span>
                  <span className='text-gray-600'>
                    {footerData?.contactInfo?.location || 'Your City, Country'}
                  </span>
                </div>

                <div className='flex items-center gap-3'>
                  <span className='text-purple-600'>💼</span>
                  <span className='text-gray-600'>
                    {footerData?.contactInfo?.availability ||
                      'Available for remote work'}
                  </span>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className='mt-6'>
                <h4 className='text-gray-900 font-semibold mb-3'>
                  Stay Updated
                </h4>
                <div className='flex gap-2'>
                  <input
                    type='email'
                    placeholder='Your email'
                    className='flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none text-sm'
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300'
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='border-t border-gray-200 py-6'
      >
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-gray-400 text-sm'>
            © {currentYear} {footerData?.brand?.name || 'YourName'}. All rights
            reserved.
          </p>

          <div className='flex gap-6 text-sm'>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-900 transition-colors duration-300'
            >
              Privacy Policy
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-900 transition-colors duration-300'
            >
              Terms of Service
            </a>
            <a
              href='#'
              className='text-gray-500 hover:text-gray-900 transition-colors duration-300'
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        {[...Array(20)].map((_, i) => {
          // Use deterministic positioning based on index to avoid hydration mismatch
          const left = ((i * 13.7) % 100).toFixed(2)
          const top = ((i * 19.3) % 100).toFixed(2)
          const duration = 3 + (i % 4) * 0.5
          const delay = (i % 6) * 0.3

          return (
            <motion.div
              key={i}
              className='absolute w-1 h-1 bg-purple-300 rounded-full opacity-30'
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -20, 0],
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
    </footer>
  )
}
