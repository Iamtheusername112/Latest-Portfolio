"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useThemeContext } from '@/contexts/theme-context';

export default function ThemeSwitcher() {
  const { theme, currentTheme, changeTheme, themes } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='p-2 rounded-lg bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700'>
        <Palette className='h-5 w-5 text-gray-900 dark:text-white' />
      </div>
    );
  }

  return (
    <div className='relative w-full md:w-auto'>
      {/* Theme Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className='w-full md:w-auto p-3 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-between md:justify-center gap-2'
        aria-label='Change theme'
      >
        <div className='flex items-center gap-2'>
          <Palette className='h-5 w-5 text-gray-900 dark:text-white' />
          <span className='md:hidden text-gray-900 dark:text-white font-medium'>
            {themes[currentTheme]?.name || 'Choose Theme'}
          </span>
        </div>
        <svg 
          className={`md:hidden w-5 h-5 text-gray-900 dark:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill='none' 
          stroke='currentColor' 
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </motion.button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - Desktop only */}
            <div
              className='hidden md:block fixed inset-0 z-40'
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className='md:absolute static md:right-0 md:mt-2 w-full md:w-80 bg-white dark:bg-gray-800 md:rounded-2xl rounded-lg md:shadow-2xl border border-gray-200 dark:border-gray-700 md:z-50 overflow-hidden mt-2'
            >
              <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                <h3 className='text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2'>
                  <Palette className='h-5 w-5' />
                  Choose Your Theme
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                  Pick a color scheme that suits your style
                </p>
              </div>

              <div className='p-3 max-h-96 overflow-y-auto'>
                <div className='grid grid-cols-1 gap-2'>
                  {Object.entries(themes).map(([key, themeOption]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        changeTheme(key);
                        setIsOpen(false);
                      }}
                      className={`w-full p-3 md:p-4 rounded-xl text-left transition-all duration-300 ${
                        currentTheme === key
                          ? 'bg-gradient-to-r ' + themeOption.gradient + ' text-white shadow-lg ring-2 ring-white/50'
                          : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className='flex items-center justify-between gap-2'>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2'>
                            <span className='font-bold text-sm md:text-base truncate'>
                              {themeOption.name}
                            </span>
                            {currentTheme === key && (
                              <Check className='h-4 w-4 flex-shrink-0' />
                            )}
                          </div>
                          <p className={`text-xs md:text-sm mt-1 line-clamp-1 ${
                            currentTheme === key
                              ? 'text-white/90'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {themeOption.description}
                          </p>
                        </div>

                        {/* Color Preview */}
                        <div className='flex gap-1 flex-shrink-0'>
                          <div
                            className='w-6 h-6 md:w-8 md:h-8 rounded-lg shadow-inner border border-white/20'
                            style={{ backgroundColor: themeOption.primary }}
                          />
                          <div
                            className='w-6 h-6 md:w-8 md:h-8 rounded-lg shadow-inner border border-white/20'
                            style={{ backgroundColor: themeOption.accent }}
                          />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className='p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'>
                <p className='text-xs text-gray-500 dark:text-gray-400 text-center'>
                  Your theme preference is saved automatically
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

