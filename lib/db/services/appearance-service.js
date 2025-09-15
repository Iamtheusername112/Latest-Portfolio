import { db } from '../config.js';
import { appearanceSettings } from '../schema.js';
import { eq } from 'drizzle-orm';

export class AppearanceService {
  // Get appearance settings
  static async getAppearanceSettings() {
    try {
      const result = await db.select().from(appearanceSettings).limit(1);
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching appearance settings:', error);
      throw error;
    }
  }

  // Update appearance settings
  static async updateAppearanceSettings(data) {
    try {
      // Validate required fields
      if (!data.colors || !data.typography || !data.layout || !data.theme) {
        throw new Error('All appearance categories (colors, typography, layout, theme) are required');
      }

      // Clean the data to remove any invalid fields
      const processedData = {
        colors: data.colors,
        typography: data.typography,
        layout: data.layout,
        theme: data.theme,
        updatedAt: new Date()
      };

      const existing = await this.getAppearanceSettings();
      
      if (existing) {
        const result = await db
          .update(appearanceSettings)
          .set(processedData)
          .where(eq(appearanceSettings.id, existing.id))
          .returning();
        return result[0];
      } else {
        const result = await db
          .insert(appearanceSettings)
          .values({
            ...processedData,
            createdAt: new Date()
          })
          .returning();
        return result[0];
      }
    } catch (error) {
      console.error('Error updating appearance settings:', error);
      throw error;
    }
  }

  // Create initial appearance settings
  static async createInitialAppearanceSettings() {
    const defaultData = {
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#06b6d4",
        background: "#ffffff",
        foreground: "#0f0f0f",
        muted: "#f4f4f5",
        mutedForeground: "#71717a",
        border: "#e4e4e7",
        input: "#ffffff",
        ring: "#6366f1"
      },
      typography: {
        fontFamily: "Inter",
        headingFont: "Inter",
        bodyFont: "Inter",
        fontSize: "16px",
        lineHeight: "1.6",
        letterSpacing: "0.025em"
      },
      layout: {
        maxWidth: "1200px",
        padding: "2rem",
        borderRadius: "0.5rem",
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        animation: "smooth"
      },
      theme: {
        mode: "system",
        glassmorphism: true,
        gradients: true,
        animations: true,
        particles: false
      }
    };

    return await this.updateAppearanceSettings(defaultData);
  }

  // Ensure appearance settings exist
  static async ensureAppearanceSettingsExist() {
    try {
      const existing = await this.getAppearanceSettings();
      if (!existing) {
        console.log('No appearance settings found, creating default settings...');
        return await this.createInitialAppearanceSettings();
      }
      return existing;
    } catch (error) {
      console.error('Error ensuring appearance settings exist:', error);
      throw error;
    }
  }

  // Apply appearance settings to CSS variables
  static applyAppearanceSettings(settings) {
    if (!settings) return;

    const root = document.documentElement;
    
    // Apply color variables
    if (settings.colors) {
      Object.entries(settings.colors).forEach(([key, value]) => {
        const cssVar = `--${key}`;
        root.style.setProperty(cssVar, value);
      });
    }

    // Apply typography variables
    if (settings.typography) {
      if (settings.typography.fontFamily) {
        root.style.setProperty('--font-sans', settings.typography.fontFamily);
      }
      if (settings.typography.fontSize) {
        root.style.setProperty('--font-size-base', settings.typography.fontSize);
      }
      if (settings.typography.lineHeight) {
        root.style.setProperty('--line-height-base', settings.typography.lineHeight);
      }
    }

    // Apply layout variables
    if (settings.layout) {
      if (settings.layout.maxWidth) {
        root.style.setProperty('--max-width', settings.layout.maxWidth);
      }
      if (settings.layout.borderRadius) {
        root.style.setProperty('--radius', settings.layout.borderRadius);
      }
    }

    // Apply theme mode
    if (settings.theme && settings.theme.mode) {
      if (settings.theme.mode === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else if (settings.theme.mode === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        // System mode - let the system decide
        document.documentElement.classList.remove('dark', 'light');
      }
    }

    // Apply visual effects
    if (settings.theme) {
      const body = document.body;
      
      if (settings.theme.glassmorphism) {
        body.classList.add('glassmorphism-enabled');
      } else {
        body.classList.remove('glassmorphism-enabled');
      }

      if (settings.theme.gradients) {
        body.classList.add('gradients-enabled');
      } else {
        body.classList.remove('gradients-enabled');
      }

      if (settings.theme.animations) {
        body.classList.add('animations-enabled');
      } else {
        body.classList.remove('animations-enabled');
      }

      if (settings.theme.particles) {
        body.classList.add('particles-enabled');
      } else {
        body.classList.remove('particles-enabled');
      }
    }
  }
}
