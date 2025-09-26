'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/hooks/use-theme'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DynamicLogo from '@/components/dynamic-logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '#home', type: 'scroll' },
    { name: 'About', href: '#about', type: 'scroll' },
    { name: 'Projects', href: '/projects', type: 'page' },
    { name: 'Contact', href: '#contact', type: 'scroll' },
  ]

  const handleNavigation = (item) => {
    console.log('Navigation clicked:', item)
    if (item.type === 'page') {
      console.log('Navigating to page:', item.href)
      router.push(item.href)
    } else {
      // Handle scroll navigation
      if (pathname !== '/') {
        // If we're not on the home page, navigate to home first
        router.push('/')
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.querySelector(item.href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        // We're on the home page, just scroll
        const element = document.querySelector(item.href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header className='fixed top-0 left-0 right-0 z-50 glass border-b border-border/50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <DynamicLogo size='md' showText={true} className='hidden sm:flex' />
            <DynamicLogo size='md' showText={false} className='sm:hidden' />
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            {navItems.map((item) =>
              item.type === 'page' ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className='text-foreground hover:text-primary transition-colors duration-200 font-medium'
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className='text-foreground hover:text-primary transition-colors duration-200 font-medium'
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.name}
                </button>
              )
            )}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className='flex items-center space-x-4'>
            <ThemeToggle />

            {/* Mobile menu button */}
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden h-9 w-9 text-foreground hover:bg-accent hover:text-accent-foreground'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden transition-all duration-300 ease-in-out',
            isMenuOpen
              ? 'max-h-64 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          )}
        >
          <nav className='py-4 space-y-2'>
            {navItems.map((item) =>
              item.type === 'page' ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className='block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors duration-200 font-medium'
                  style={{ color: 'var(--foreground)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className='block w-full text-left px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors duration-200 font-medium'
                  style={{ color: 'var(--foreground)' }}
                >
                  {item.name}
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
