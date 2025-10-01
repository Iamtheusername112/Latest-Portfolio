"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

export const themes = {
  professional: {
    name: 'Professional',
    description: 'Dark blue and slate - corporate and professional',
    primary: '#0F172A', // Slate 900
    secondary: '#1E40AF', // Blue 700
    accent: '#3B82F6', // Blue 500
    accentLight: '#60A5FA', // Blue 400
    gradient: 'from-blue-600 to-slate-800',
    cardBg: 'bg-white dark:bg-slate-800',
    cardBorder: 'border-slate-200 dark:border-slate-700',
    text: 'text-slate-900 dark:text-white',
    textMuted: 'text-slate-600 dark:text-slate-300',
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonSecondary: 'bg-slate-700 hover:bg-slate-800 text-white',
    statusColors: {
      planning: 'bg-blue-500',
      in_progress: 'bg-amber-500',
      testing: 'bg-orange-500',
      deployed: 'bg-emerald-500',
      completed: 'bg-violet-500',
    }
  },
  
  tech: {
    name: 'Tech',
    description: 'Cyan and dark gray - tech and modern',
    primary: '#0C4A6E', // Sky 900
    secondary: '#0E7490', // Cyan 700
    accent: '#06B6D4', // Cyan 500
    accentLight: '#22D3EE', // Cyan 400
    gradient: 'from-cyan-500 to-blue-800',
    cardBg: 'bg-white dark:bg-gray-800',
    cardBorder: 'border-gray-200 dark:border-gray-700',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-300',
    buttonPrimary: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    buttonSecondary: 'bg-gray-700 hover:bg-gray-800 text-white',
    statusColors: {
      planning: 'bg-cyan-500',
      in_progress: 'bg-yellow-500',
      testing: 'bg-orange-500',
      deployed: 'bg-green-500',
      completed: 'bg-indigo-500',
    }
  },

  dark: {
    name: 'Dark',
    description: 'Dark emerald and charcoal - sophisticated and bold',
    primary: '#064E3B', // Emerald 900
    secondary: '#047857', // Emerald 700
    accent: '#10B981', // Emerald 500
    accentLight: '#34D399', // Emerald 400
    gradient: 'from-emerald-600 to-gray-900',
    cardBg: 'bg-white dark:bg-gray-800',
    cardBorder: 'border-gray-200 dark:border-gray-700',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-300',
    buttonPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    buttonSecondary: 'bg-gray-700 hover:bg-gray-800 text-white',
    statusColors: {
      planning: 'bg-teal-500',
      in_progress: 'bg-amber-500',
      testing: 'bg-orange-500',
      deployed: 'bg-green-500',
      completed: 'bg-emerald-500',
    }
  },

  ocean: {
    name: 'Ocean',
    description: 'Deep blue and teal - calm and trustworthy',
    primary: '#1E3A8A', // Blue 900
    secondary: '#1D4ED8', // Blue 700
    accent: '#3B82F6', // Blue 500
    accentLight: '#60A5FA', // Blue 400
    gradient: 'from-blue-700 to-indigo-900',
    cardBg: 'bg-white dark:bg-slate-800',
    cardBorder: 'border-blue-200 dark:border-slate-700',
    text: 'text-slate-900 dark:text-white',
    textMuted: 'text-slate-600 dark:text-slate-300',
    buttonPrimary: 'bg-blue-700 hover:bg-blue-800 text-white',
    buttonSecondary: 'bg-slate-700 hover:bg-slate-800 text-white',
    statusColors: {
      planning: 'bg-blue-500',
      in_progress: 'bg-sky-500',
      testing: 'bg-orange-500',
      deployed: 'bg-teal-500',
      completed: 'bg-indigo-500',
    }
  },

  minimal: {
    name: 'Minimal',
    description: 'Black and white - clean and minimalist',
    primary: '#000000',
    secondary: '#1F2937', // Gray 800
    accent: '#374151', // Gray 700
    accentLight: '#6B7280', // Gray 500
    gradient: 'from-gray-800 to-black',
    cardBg: 'bg-white dark:bg-gray-900',
    cardBorder: 'border-gray-300 dark:border-gray-700',
    text: 'text-black dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-400',
    buttonPrimary: 'bg-black hover:bg-gray-900 text-white',
    buttonSecondary: 'bg-gray-700 hover:bg-gray-800 text-white',
    statusColors: {
      planning: 'bg-gray-600',
      in_progress: 'bg-gray-500',
      testing: 'bg-gray-600',
      deployed: 'bg-gray-700',
      completed: 'bg-black',
    }
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('professional');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted && themes[currentTheme]) {
      const theme = themes[currentTheme];
      const root = document.documentElement;
      
      // Apply theme CSS variables
      root.style.setProperty('--theme-primary', theme.primary);
      root.style.setProperty('--theme-secondary', theme.secondary);
      root.style.setProperty('--theme-accent', theme.accent);
      root.style.setProperty('--theme-accent-light', theme.accentLight);
      root.style.setProperty('--theme-gradient-from', theme.accent);
      root.style.setProperty('--theme-gradient-to', theme.primary);
    }
  }, [currentTheme, mounted]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('portfolio-theme', themeName);
    }
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, changeTheme, themes }}>
      <div className={mounted ? `theme-${currentTheme}` : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
}

