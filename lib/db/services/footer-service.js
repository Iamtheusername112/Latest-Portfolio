import { db } from '../config.js';
import { footerSettings } from '../schema.js';
import { eq } from 'drizzle-orm';

export class FooterService {
  // Get footer settings
  static async getFooterSettings() {
    try {
      const result = await db
        .select()
        .from(footerSettings)
        .limit(1);

      if (result.length === 0) {
        // Create default footer settings if none exist
        return await this.createDefaultFooterSettings();
      }

      return result[0];
    } catch (error) {
      console.error('Error getting footer settings:', error);
      throw error;
    }
  }

  // Update footer settings
  static async updateFooterSettings(footerData) {
    try {
      // Validate footer data
      const validatedFooter = this.validateFooterData(footerData);

      // Check if footer settings exist
      const existingSettings = await db
        .select()
        .from(footerSettings)
        .limit(1);

      if (existingSettings.length === 0) {
        // Create new footer settings
        const newSettings = await db
          .insert(footerSettings)
          .values({
            ...validatedFooter,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .returning();

        return newSettings[0];
      } else {
        // Update existing footer settings
        const updatedSettings = await db
          .update(footerSettings)
          .set({
            ...validatedFooter,
            updatedAt: new Date()
          })
          .where(eq(footerSettings.id, existingSettings[0].id))
          .returning();

        return updatedSettings[0];
      }
    } catch (error) {
      console.error('Error updating footer settings:', error);
      throw error;
    }
  }

  // Create default footer settings
  static async createDefaultFooterSettings() {
    try {
      const defaultFooter = {
        brand: {
          name: "Iwu Francis",
          tagline: "Full Stack Developer",
          description: "Full Stack Web Developer passionate about creating innovative digital solutions and beautiful user experiences.",
          logo: {
            show: true,
            variant: "default",
            size: "lg"
          }
        },
        socialLinks: [
          {
            id: "github",
            platform: "GitHub",
            url: "https://github.com/Iamtheusername112",
            icon: "github",
            enabled: true,
            order: 1
          },
          {
            id: "linkedin",
            platform: "LinkedIn", 
            url: "https://linkedin.com/in/francis-iwu-878973238",
            icon: "linkedin",
            enabled: true,
            order: 2
          },
          {
            id: "instagram",
            platform: "Instagram",
            url: "https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3",
            icon: "instagram",
            enabled: true,
            order: 3
          },
          {
            id: "email",
            platform: "Email",
            url: "mailto:iwufrancis571@gmail.com",
            icon: "mail",
            enabled: true,
            order: 4
          }
        ],
        quickLinks: [
          {
            id: "home",
            name: "Home",
            href: "#home",
            enabled: true,
            order: 1
          },
          {
            id: "about",
            name: "About",
            href: "#about",
            enabled: true,
            order: 2
          },
          {
            id: "projects",
            name: "Projects",
            href: "#projects",
            enabled: true,
            order: 3
          },
          {
            id: "contact",
            name: "Contact",
            href: "#contact",
            enabled: true,
            order: 4
          }
        ],
        contactInfo: {
          email: "iwufrancis571@gmail.com",
          location: "Berlin, Germany",
          availability: "Available for remote work",
          phone: "",
          website: ""
        },
        copyright: {
          text: "All rights reserved.",
          showYear: true,
          additionalText: ""
        },
        layout: {
          showBrand: true,
          showQuickLinks: true,
          showContactInfo: true,
          showSocialLinks: true,
          showCopyright: true,
          columns: 3
        },
        styling: {
          backgroundColor: "background",
          textColor: "foreground",
          accentColor: "primary",
          borderColor: "border",
          showBackgroundPattern: true,
          patternOpacity: 0.3
        }
      };

      const newSettings = await db
        .insert(footerSettings)
        .values({
          ...defaultFooter,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();

      return newSettings[0];
    } catch (error) {
      console.error('Error creating default footer settings:', error);
      throw error;
    }
  }

  // Validate footer data
  static validateFooterData(footerData) {
    const validated = {};

    // Validate brand section
    if (footerData.brand) {
      validated.brand = {
        name: this.validateString(footerData.brand.name, "Brand Name"),
        tagline: this.validateString(footerData.brand.tagline, "Brand Tagline"),
        description: this.validateString(footerData.brand.description, "Brand Description"),
        logo: {
          show: Boolean(footerData.brand.logo?.show),
          variant: this.validateLogoVariant(footerData.brand.logo?.variant),
          size: this.validateLogoSize(footerData.brand.logo?.size)
        }
      };
    }

    // Validate social links
    if (footerData.socialLinks && Array.isArray(footerData.socialLinks)) {
      validated.socialLinks = footerData.socialLinks
        .filter(link => link && typeof link === 'object')
        .map(link => ({
          id: this.validateString(link.id, "Social Link ID"),
          platform: this.validateString(link.platform, "Platform Name"),
          url: this.validateUrl(link.url),
          icon: this.validateIcon(link.icon),
          enabled: Boolean(link.enabled),
          order: this.validateNumber(link.order, 1, 100, 1)
        }))
        .sort((a, b) => a.order - b.order);
    }

    // Validate quick links
    if (footerData.quickLinks && Array.isArray(footerData.quickLinks)) {
      validated.quickLinks = footerData.quickLinks
        .filter(link => link && typeof link === 'object')
        .map(link => ({
          id: this.validateString(link.id, "Quick Link ID"),
          name: this.validateString(link.name, "Link Name"),
          href: this.validateString(link.href, "Link Href"),
          enabled: Boolean(link.enabled),
          order: this.validateNumber(link.order, 1, 100, 1)
        }))
        .sort((a, b) => a.order - b.order);
    }

    // Validate contact info
    if (footerData.contactInfo) {
      validated.contactInfo = {
        email: this.validateEmail(footerData.contactInfo.email),
        location: this.validateString(footerData.contactInfo.location, "Location"),
        availability: this.validateString(footerData.contactInfo.availability, "Availability"),
        phone: footerData.contactInfo.phone || "",
        website: footerData.contactInfo.website || ""
      };
    }

    // Validate copyright
    if (footerData.copyright) {
      validated.copyright = {
        text: this.validateString(footerData.copyright.text, "Copyright Text"),
        showYear: Boolean(footerData.copyright.showYear),
        additionalText: footerData.copyright.additionalText || ""
      };
    }

    // Validate layout
    if (footerData.layout) {
      validated.layout = {
        showBrand: Boolean(footerData.layout.showBrand),
        showQuickLinks: Boolean(footerData.layout.showQuickLinks),
        showContactInfo: Boolean(footerData.layout.showContactInfo),
        showSocialLinks: Boolean(footerData.layout.showSocialLinks),
        showCopyright: Boolean(footerData.layout.showCopyright),
        columns: this.validateNumber(footerData.layout.columns, 1, 4, 3)
      };
    }

    // Validate styling
    if (footerData.styling) {
      validated.styling = {
        backgroundColor: this.validateColor(footerData.styling.backgroundColor),
        textColor: this.validateColor(footerData.styling.textColor),
        accentColor: this.validateColor(footerData.styling.accentColor),
        borderColor: this.validateColor(footerData.styling.borderColor),
        showBackgroundPattern: Boolean(footerData.styling.showBackgroundPattern),
        patternOpacity: this.validateNumber(footerData.styling.patternOpacity, 0, 1, 0.3)
      };
    }

    return validated;
  }

  // Validation helper methods
  static validateString(value, fieldName) {
    if (typeof value !== 'string') {
      throw new Error(`${fieldName} must be a string`);
    }
    return value.trim();
  }

  static validateEmail(email) {
    if (!email) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    return email;
  }

  static validateUrl(url) {
    if (!url) return "";
    try {
      new URL(url);
      return url;
    } catch {
      // For relative URLs like #home
      if (url.startsWith('#')) {
        return url;
      }
      throw new Error('Invalid URL format');
    }
  }

  static validateNumber(value, min, max, defaultValue) {
    const num = parseInt(value);
    if (isNaN(num) || num < min || num > max) {
      return defaultValue;
    }
    return num;
  }

  static validateIcon(icon) {
    const validIcons = ['github', 'linkedin', 'instagram', 'mail', 'twitter', 'facebook', 'youtube'];
    return validIcons.includes(icon) ? icon : 'mail';
  }

  static validateLogoVariant(variant) {
    const validVariants = ['default', 'minimal', 'tech'];
    return validVariants.includes(variant) ? variant : 'default';
  }

  static validateLogoSize(size) {
    const validSizes = ['sm', 'md', 'lg', 'xl'];
    return validSizes.includes(size) ? size : 'lg';
  }

  static validateColor(color) {
    const validColors = ['background', 'foreground', 'primary', 'secondary', 'muted', 'accent', 'border'];
    return validColors.includes(color) ? color : 'foreground';
  }

  // Reset footer to default
  static async resetToDefault() {
    try {
      // Delete existing footer settings
      await db.delete(footerSettings);
      
      // Create default footer settings
      return await this.createDefaultFooterSettings();
    } catch (error) {
      console.error('Error resetting footer settings:', error);
      throw error;
    }
  }

  // Get footer preview data
  static async getFooterPreview() {
    try {
      const settings = await this.getFooterSettings();
      return {
        brand: settings.brand,
        socialLinks: settings.socialLinks?.filter(link => link.enabled) || [],
        quickLinks: settings.quickLinks?.filter(link => link.enabled) || [],
        contactInfo: settings.contactInfo,
        copyright: settings.copyright,
        layout: settings.layout,
        styling: settings.styling
      };
    } catch (error) {
      console.error('Error getting footer preview:', error);
      throw error;
    }
  }
}
