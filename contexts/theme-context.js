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

  sunset: {
    name: 'Sunset',
    description: 'Warm orange and amber - energetic and creative',
    primary: '#C2410C', // Orange 800
    secondary: '#92400E', // Amber 800
    accent: '#F59E0B', // Amber 500
    accentLight: '#FBBF24', // Amber 400
    gradient: 'from-orange-600 to-amber-700',
    cardBg: 'bg-white dark:bg-gray-800',
    cardBorder: 'border-orange-200 dark:border-orange-900',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-300',
    buttonPrimary: 'bg-orange-600 hover:bg-orange-700 text-white',
    buttonSecondary: 'bg-amber-700 hover:bg-amber-800 text-white',
    statusColors: {
      planning: 'bg-amber-500',
      in_progress: 'bg-orange-500',
      testing: 'bg-red-500',
      deployed: 'bg-yellow-500',
      completed: 'bg-orange-600',
    }
  },

  forest: {
    name: 'Forest',
    description: 'Deep green and teal - natural and balanced',
    primary: '#065F46', // Emerald 800
    secondary: '#14532D', // Green 900
    accent: '#059669', // Emerald 600
    accentLight: '#10B981', // Emerald 500
    gradient: 'from-green-700 to-emerald-800',
    cardBg: 'bg-white dark:bg-gray-800',
    cardBorder: 'border-emerald-200 dark:border-emerald-900',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-300',
    buttonPrimary: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    buttonSecondary: 'bg-green-700 hover:bg-green-800 text-white',
    statusColors: {
      planning: 'bg-teal-600',
      in_progress: 'bg-emerald-600',
      testing: 'bg-green-600',
      deployed: 'bg-emerald-500',
      completed: 'bg-green-700',
    }
  },

  royal: {
    name: 'Royal',
    description: 'Deep purple and indigo - elegant and sophisticated',
    primary: '#4C1D95', // Violet 900
    secondary: '#312E81', // Indigo 900
    accent: '#7C3AED', // Violet 600
    accentLight: '#8B5CF6', // Violet 500
    gradient: 'from-violet-700 to-indigo-900',
    cardBg: 'bg-white dark:bg-gray-800',
    cardBorder: 'border-violet-200 dark:border-violet-900',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-300',
    buttonPrimary: 'bg-violet-700 hover:bg-violet-800 text-white',
    buttonSecondary: 'bg-indigo-700 hover:bg-indigo-800 text-white',
    statusColors: {
      planning: 'bg-indigo-600',
      in_progress: 'bg-violet-600',
      testing: 'bg-purple-600',
      deployed: 'bg-violet-500',
      completed: 'bg-indigo-700',
    }
  },

  crimson: {
    name: 'Crimson',
    description: 'Bold red and burgundy - powerful and confident',
    primary: '#991B1B', // Red 800
    secondary: '#7F1D1D', // Red 900
    accent: '#DC2626', // Red 600
    accentLight: '#EF4444', // Red 500
    gradient: 'from-red-700 to-red-900',
    cardBg: 'bg-white dark:bg-gray-800',
    cardBorder: 'border-red-200 dark:border-red-900',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-300',
    buttonPrimary: 'bg-red-700 hover:bg-red-800 text-white',
    buttonSecondary: 'bg-red-800 hover:bg-red-900 text-white',
    statusColors: {
      planning: 'bg-rose-600',
      in_progress: 'bg-red-600',
      testing: 'bg-orange-600',
      deployed: 'bg-red-500',
      completed: 'bg-red-700',
    }
  },

  arctic: {
    name: 'Arctic',
    description: 'Cool ice blue and steel - crisp and modern',
    primary: '#075985', // Sky 800
    secondary: '#0C4A6E', // Sky 900
    accent: '#0EA5E9', // Sky 500
    accentLight: '#38BDF8', // Sky 400
    gradient: 'from-sky-600 to-blue-800',
    cardBg: 'bg-white dark:bg-gray-800',
    cardBorder: 'border-sky-200 dark:border-sky-900',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-300',
    buttonPrimary: 'bg-sky-700 hover:bg-sky-800 text-white',
    buttonSecondary: 'bg-blue-700 hover:bg-blue-800 text-white',
    statusColors: {
      planning: 'bg-sky-500',
      in_progress: 'bg-blue-500',
      testing: 'bg-cyan-500',
      deployed: 'bg-sky-600',
      completed: 'bg-blue-700',
    }
  },

  slate: {
    name: 'Slate',
    description: 'Cool gray and charcoal - industrial and refined',
    primary: '#334155', // Slate 700
    secondary: '#1E293B', // Slate 800
    accent: '#475569', // Slate 600
    accentLight: '#64748B', // Slate 500
    gradient: 'from-slate-700 to-slate-900',
    cardBg: 'bg-white dark:bg-slate-900',
    cardBorder: 'border-slate-300 dark:border-slate-700',
    text: 'text-slate-900 dark:text-white',
    textMuted: 'text-slate-600 dark:text-slate-400',
    buttonPrimary: 'bg-slate-700 hover:bg-slate-800 text-white',
    buttonSecondary: 'bg-slate-600 hover:bg-slate-700 text-white',
    statusColors: {
      planning: 'bg-slate-600',
      in_progress: 'bg-slate-500',
      testing: 'bg-slate-600',
      deployed: 'bg-slate-700',
      completed: 'bg-slate-800',
    }
  },

  neon: {
    name: 'Neon',
    description: 'Electric cyan and magenta - vibrant and futuristic',
    primary: '#0E7490', // Cyan 700
    secondary: '#155E75', // Cyan 800
    accent: '#06B6D4', // Cyan 500
    accentLight: '#22D3EE', // Cyan 400
    gradient: 'from-cyan-600 to-blue-700',
    cardBg: 'bg-white dark:bg-gray-900',
    cardBorder: 'border-cyan-200 dark:border-cyan-900',
    text: 'text-gray-900 dark:text-white',
    textMuted: 'text-gray-600 dark:text-gray-300',
    buttonPrimary: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    buttonSecondary: 'bg-blue-600 hover:bg-blue-700 text-white',
    statusColors: {
      planning: 'bg-cyan-500',
      in_progress: 'bg-blue-500',
      testing: 'bg-teal-500',
      deployed: 'bg-cyan-600',
      completed: 'bg-blue-700',
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

