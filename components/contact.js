'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.message.trim()
      ) {
        throw new Error('Name, email, and message are required')
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please provide a valid email address')
      }

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      // Success
      toast.success(result.message)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: '',
        company: '',
      })
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error(error.message || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className='h-6 w-6' />,
      title: 'Email',
      value: 'iwufrancischisom20@gmail.com',
      href: 'mailto:iwufrancischisom20@gmail.com',
    },
    {
      icon: <MapPin className='h-6 w-6' />,
      title: 'Location',
      value: 'Berlin, Germany',
      href: '#',
    },
    {
      icon: <Phone className='h-6 w-6' />,
      title: 'Availability',
      value: 'Available for remote work',
      href: '#',
    },
  ]

  const socialLinks = [
    {
      icon: <Github className='h-5 w-5' />,
      name: 'GitHub',
      href: 'https://github.com/Iamtheusername112',
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
    },
    {
      icon: <Linkedin className='h-5 w-5' />,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/francis-iwu-878973238',
      color: 'hover:text-blue-600',
    },
    {
      icon: <Instagram className='h-5 w-5' />,
      name: 'Instagram',
      href: 'https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3',
      color: 'hover:text-pink-500',
    },
  ]

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
        duration: 0.6,
      },
    },
  }

  return (
    <section
      id='contact'
      className='py-20 bg-muted/30 relative overflow-hidden'
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-pattern opacity-50' />
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className='max-w-6xl mx-auto'
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
              Get In Touch
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Have a project in mind or want to collaborate? I'd love to hear
              from you!
            </p>
          </motion.div>

          <div className='grid lg:grid-cols-2 gap-12'>
            {/* Contact Information */}
            <motion.div variants={itemVariants} className='space-y-8'>
              <div>
                <h3 className='text-2xl font-semibold text-foreground mb-6'>
                  Let's Connect
                </h3>
                <p className='text-muted-foreground mb-8 leading-relaxed'>
                  I'm always interested in new opportunities and exciting
                  projects. Whether you have a question or just want to say hi,
                  feel free to reach out!
                </p>
              </div>

              {/* Contact Details */}
              <div className='space-y-4'>
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className='p-4 glass border-border/50 card-premium'
                  >
                    <CardContent className='p-0'>
                      <div className='flex items-center space-x-4'>
                        <div className='text-primary animate-glow'>
                          {info.icon}
                        </div>
                        <div>
                          <h4 className='font-semibold text-foreground'>
                            {info.title}
                          </h4>
                          <a
                            href={info.href}
                            className='text-muted-foreground hover:text-primary transition-colors duration-200'
                          >
                            {info.value}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className='text-lg font-semibold text-foreground mb-4'>
                  Follow Me
                </h4>
                <div className='flex space-x-4'>
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant='ghost'
                      size='icon'
                      className={`h-12 w-12 rounded-full glass ${social.color} transition-all duration-300 hover:scale-110`}
                      onClick={() => window.open(social.href, '_blank')}
                    >
                      {social.icon}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className='glass border-border/50'>
                <CardHeader>
                  <CardTitle className='gradient-text'>
                    Send me a message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid sm:grid-cols-2 gap-4'>
                      <div>
                        <label
                          htmlFor='name'
                          className='block text-sm font-medium text-foreground mb-2'
                        >
                          Name *
                        </label>
                        <Input
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder='Your name'
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium text-foreground mb-2'
                        >
                          Email *
                        </label>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder='your@email.com'
                        />
                      </div>
                    </div>

                    <div className='grid sm:grid-cols-2 gap-4'>
                      <div>
                        <label
                          htmlFor='subject'
                          className='block text-sm font-medium text-foreground mb-2'
                        >
                          Subject *
                        </label>
                        <Input
                          id='subject'
                          name='subject'
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          placeholder="What's this about?"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='phone'
                          className='block text-sm font-medium text-foreground mb-2'
                        >
                          Phone
                        </label>
                        <Input
                          id='phone'
                          name='phone'
                          type='tel'
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder='Your phone number'
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='company'
                        className='block text-sm font-medium text-foreground mb-2'
                      >
                        Company
                      </label>
                      <Input
                        id='company'
                        name='company'
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder='Your company name'
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='message'
                        className='block text-sm font-medium text-foreground mb-2'
                      >
                        Message *
                      </label>
                      <Textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder='Tell me about your project...'
                        rows={6}
                      />
                    </div>

                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full btn-premium'
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className='mr-2 h-4 w-4' />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
