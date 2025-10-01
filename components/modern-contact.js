'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Github, Linkedin, Mail, Globe, Phone } from 'lucide-react'

export default function ModernContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus(null), 3000)
      } else {
        console.error('Contact form error:', result.error)
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus(null), 3000)
      }
    } catch (error) {
      console.error('Error submitting message:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'iwufrancischisom20@gmail.com',
      link: 'mailto:iwufrancischisom20@gmail.com',
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+4915238291223',
      link: 'tel:+4915238291223',
    },
    {
      icon: '🌐',
      title: 'Portfolio',
      value: 'www.francisiwu.com',
      link: 'https://www.francisiwu.com',
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/francis-iwu',
      link: 'https://www.linkedin.com/in/francis-iwu?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    },
  ]

  return (
    <section
      id='contact'
      className='py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-40 animate-blob'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-40 animate-blob animation-delay-2000'></div>
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
            Get In{' '}
            <span className='text-theme-gradient'>
              Touch
            </span>
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Ready to bring your ideas to life? Let's discuss your project and
            create something amazing together.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto'>
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='space-y-8'
          >
            <div className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg'>
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                Let's Connect
              </h3>
              <p className='text-gray-600 dark:text-gray-300 mb-8 leading-relaxed'>
                I'm always excited to work on new projects and collaborate with
                amazing people. Whether you have a specific project in mind or
                just want to chat about technology, I'd love to hear from you!
              </p>

              <div className='space-y-4'>
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className='flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 group'
                  >
                    <div className='text-2xl'>{info.icon}</div>
                    <div>
                      <h4 className='text-gray-900 dark:text-white font-semibold group-hover:text-theme-accent transition-colors'>
                        {info.title}
                      </h4>
                      <p className='text-gray-600 dark:text-gray-300 text-sm'>{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg'
            >
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
                Follow Me
              </h3>
              <div className='flex gap-4'>
                {[
                  {
                    name: 'GitHub',
                    icon: <Github className='h-6 w-6' />,
                    color: 'hover:bg-gray-600',
                    href: 'https://github.com/Iamtheusername112/Latest-Portfolio',
                  },
                  {
                    name: 'LinkedIn',
                    icon: <Linkedin className='h-6 w-6' />,
                    color: 'hover:bg-blue-600',
                    href: 'https://www.linkedin.com/in/francis-iwu?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
                  },
                  {
                    name: 'Email',
                    icon: <Mail className='h-6 w-6' />,
                    color: 'hover:bg-red-500',
                    href: 'mailto:iwufrancischisom20@gmail.com',
                  },
                  {
                    name: 'Portfolio',
                    icon: <Globe className='h-6 w-6' />,
                    color: 'hover:bg-green-500',
                    href: 'https://www.francisiwu.com',
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 ${social.color} transition-colors duration-300`}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg'
          >
            <h3 className='text-2xl font-bold text-gray-900 mb-6'>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label className='block text-gray-900 font-semibold mb-2'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors duration-300'
                    placeholder='Your name'
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className='block text-gray-900 font-semibold mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors duration-300'
                    placeholder='your@email.com'
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className='block text-gray-900 font-semibold mb-2'>
                  Subject
                </label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-theme-accent focus:outline-none transition-colors duration-300'
                  placeholder="What's this about?"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className='block text-gray-900 font-semibold mb-2'>
                  Message
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className='w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:border-theme-accent focus:outline-none transition-colors duration-300 resize-none'
                  placeholder='Tell me about your project...'
                />
              </motion.div>

              <motion.button
                type='submit'
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full py-4 btn-theme-primary font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400 text-center'
                >
                  ✅ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-center'
                >
                  ❌ Failed to send message. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
