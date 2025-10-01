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
    <div className='relative'>
      {/* Theme Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 rounded-lg bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-colors'
        aria-label='Change theme'
      >
        <Palette className='h-5 w-5 text-gray-900 dark:text-white' />
      </motion.button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className='fixed inset-0 z-40'
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className='absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden'
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
                <div className='space-y-2'>
                  {Object.entries(themes).map(([key, themeOption]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        changeTheme(key);
                        setIsOpen(false);
                      }}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                        currentTheme === key
                          ? 'bg-gradient-to-r ' + themeOption.gradient + ' text-white shadow-lg'
                          : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2'>
                            <span className='font-bold text-base'>
                              {themeOption.name}
                            </span>
                            {currentTheme === key && (
                              <Check className='h-4 w-4' />
                            )}
                          </div>
                          <p className={`text-sm mt-1 ${
                            currentTheme === key
                              ? 'text-white/90'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {themeOption.description}
                          </p>
                        </div>

                        {/* Color Preview */}
                        <div className='flex gap-1 ml-3'>
                          <div
                            className='w-8 h-8 rounded-lg shadow-inner'
                            style={{ backgroundColor: themeOption.primary }}
                          />
                          <div
                            className='w-8 h-8 rounded-lg shadow-inner'
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

