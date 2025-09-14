import { db } from '../config.js';
import { logoSettings } from '../schema.js';
import { eq } from 'drizzle-orm';

export class LogoService {
  // Get current logo settings
  static async getLogoSettings() {
    try {
      const result = await db
        .select()
        .from(logoSettings)
        .where(eq(logoSettings.isActive, true))
        .limit(1);
      
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching logo settings:', error);
      
      // If table doesn't exist, create it and return default
      if (error.message.includes('does not exist')) {
        console.log('Logo settings table does not exist, creating default...');
        return await this.createInitialLogoSettings();
      }
      
      throw error;
    }
  }

  // Update logo settings
  static async updateLogoSettings(logoData) {
    try {
      // First, deactivate all existing logos
      await db
        .update(logoSettings)
        .set({ isActive: false })
        .where(eq(logoSettings.isActive, true));

      // Create new logo settings
      const result = await db
        .insert(logoSettings)
        .values({
          ...logoData,
          isActive: true,
          updatedAt: new Date()
        })
        .returning();

      return result[0];
    } catch (error) {
      console.error('Error updating logo settings:', error);
      
      // If table doesn't exist, create it first
      if (error.message.includes('does not exist')) {
        console.log('Logo settings table does not exist, creating it...');
        await this.createInitialLogoSettings();
        
        // Try again
        const result = await db
          .insert(logoSettings)
          .values({
            ...logoData,
            isActive: true,
            updatedAt: new Date()
          })
          .returning();

        return result[0];
      }
      
      throw error;
    }
  }

  // Create text logo
  static async createTextLogo(textContent, options = {}) {
    const logoData = {
      type: 'text',
      textContent,
      showText: true,
      textSize: options.textSize || 'md',
      variant: options.variant || 'default',
      alt: options.alt || textContent
    };

    return await this.updateLogoSettings(logoData);
  }

  // Create image logo
  static async createImageLogo(imageUrl, options = {}) {
    const logoData = {
      type: 'image',
      imageUrl,
      showText: options.showText || false,
      textContent: options.textContent || null,
      textSize: options.textSize || 'md',
      variant: options.variant || 'default',
      alt: options.alt || 'Logo',
      width: options.width || null,
      height: options.height || null
    };

    return await this.updateLogoSettings(logoData);
  }

  // Create SVG logo
  static async createSvgLogo(svgContent, options = {}) {
    const logoData = {
      type: 'svg',
      svgContent,
      showText: options.showText || false,
      textContent: options.textContent || null,
      textSize: options.textSize || 'md',
      variant: options.variant || 'default',
      alt: options.alt || 'Logo',
      width: options.width || null,
      height: options.height || null
    };

    return await this.updateLogoSettings(logoData);
  }

  // Get all logo variants
  static async getAllLogos() {
    try {
      const result = await db
        .select()
        .from(logoSettings)
        .orderBy(logoSettings.createdAt);
      
      return result;
    } catch (error) {
      console.error('Error fetching all logos:', error);
      throw error;
    }
  }

  // Delete logo
  static async deleteLogo(logoId) {
    try {
      const result = await db
        .delete(logoSettings)
        .where(eq(logoSettings.id, logoId))
        .returning();

      return result[0];
    } catch (error) {
      console.error('Error deleting logo:', error);
      throw error;
    }
  }

  // Create initial logo settings
  static async createInitialLogoSettings() {
    try {
      const existingLogo = await this.getLogoSettings();
      
      if (existingLogo) {
        return existingLogo;
      }

      // Create default text logo
      const defaultLogo = await this.createTextLogo('Iwu Francis', {
        textSize: 'md',
        variant: 'default',
        alt: 'Iwu Francis Logo'
      });

      console.log('✅ Initial logo settings created');
      return defaultLogo;
    } catch (error) {
      console.error('Error creating initial logo settings:', error);
      
      // If table doesn't exist, create it manually
      if (error.message.includes('does not exist')) {
        console.log('Creating logo_settings table manually...');
        
        // Create the table by inserting a record
        const result = await db
          .insert(logoSettings)
          .values({
            type: 'text',
            textContent: 'Iwu Francis',
            showText: true,
            textSize: 'md',
            variant: 'default',
            alt: 'Iwu Francis Logo',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .returning();

        console.log('✅ Logo settings table created with default data');
        return result[0];
      }
      
      throw error;
    }
  }
}
