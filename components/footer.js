'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/logo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: <Github className='h-5 w-5' />,
      href: 'https://github.com/Iamtheusername112/Latest-Portfolio',
      label: 'GitHub',
    },
    {
      icon: <Linkedin className='h-5 w-5' />,
      href: 'https://www.linkedin.com/in/francis-iwu?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      label: 'LinkedIn',
    },
    {
      icon: <Mail className='h-5 w-5' />,
      href: 'mailto:iwufrancischisom20@gmail.com',
      label: 'Email',
    },
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className='bg-background border-t border-border/50 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-pattern opacity-30' />
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='max-w-6xl mx-auto'
        >
          <div className='grid md:grid-cols-3 gap-8 mb-8'>
            {/* Brand */}
            <div className='space-y-4'>
              <Logo
                variant='default'
                size='lg'
                showText={true}
                className='items-start'
              />
              <p className='text-sm text-muted-foreground mt-2'>
                Full Stack Developer
              </p>
              <p className='text-muted-foreground text-sm leading-relaxed'>
                Full Stack Web Developer passionate about creating innovative
                digital solutions and beautiful user experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-foreground'>
                Quick Links
              </h3>
              <nav className='space-y-2'>
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(link.href)}
                    className='block text-muted-foreground hover:text-primary transition-colors text-sm'
                  >
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-foreground'>
                Get In Touch
              </h3>
              <div className='space-y-3 text-sm'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Mail className='h-4 w-4 text-primary' />
                  <a
                    href='mailto:iwufrancischisom20@gmail.com'
                    className='hover:text-primary transition-colors'
                  >
                    iwufrancischisom20@gmail.com
                  </a>
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <span className='text-primary'>📱</span>
                  <a
                    href='tel:+4915238291223'
                    className='hover:text-primary transition-colors'
                  >
                    +4915238291223
                  </a>
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <span className='text-primary'>🌐</span>
                  <a
                    href='https://www.francisiwu.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-primary transition-colors'
                  >
                    www.francisiwu.com
                  </a>
                </div>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <span className='text-primary'>📍</span>
                  <span>Germany</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='pt-8 border-t border-border'>
            <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
              <p className='text-sm text-muted-foreground'>
                © {currentYear} Iwu Francis. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
