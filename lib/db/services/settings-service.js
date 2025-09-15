import { db } from '../config.js';
import { settings } from '../schema.js';
import { eq } from 'drizzle-orm';

export class SettingsService {
  // Get all settings
  static async getAllSettings() {
    try {
      const result = await db
        .select()
        .from(settings)
        .limit(1);

      if (result.length === 0) {
        // Create default settings if none exist
        return await this.createDefaultSettings();
      }

      return result[0];
    } catch (error) {
      console.error('Error getting settings:', error);
      throw error;
    }
  }

  // Get specific setting category
  static async getSettingsByCategory(category) {
    try {
      const allSettings = await this.getAllSettings();
      return allSettings[category] || {};
    } catch (error) {
      console.error(`Error getting ${category} settings:`, error);
      throw error;
    }
  }

  // Update settings
  static async updateSettings(settingsData) {
    try {
      // Validate settings data
      const validatedSettings = this.validateSettings(settingsData);

      // Check if settings exist
      const existingSettings = await db
        .select()
        .from(settings)
        .limit(1);

      if (existingSettings.length === 0) {
        // Create new settings
        const newSettings = await db
          .insert(settings)
          .values({
            general: validatedSettings.general || {},
            user: validatedSettings.user || {},
            security: validatedSettings.security || {},
            notifications: validatedSettings.notifications || {},
            backup: validatedSettings.backup || {},
            advanced: validatedSettings.advanced || {},
            updatedAt: new Date()
          })
          .returning();

        return newSettings[0];
      } else {
        // Update existing settings
        const updatedSettings = await db
          .update(settings)
          .set({
            ...validatedSettings,
            updatedAt: new Date()
          })
          .where(eq(settings.id, existingSettings[0].id))
          .returning();

        return updatedSettings[0];
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  // Update specific category
  static async updateCategory(category, categoryData) {
    try {
      const allSettings = await this.getAllSettings();
      const validatedCategory = this.validateCategory(category, categoryData);

      const updatedSettings = {
        ...allSettings,
        [category]: validatedCategory,
        updatedAt: new Date()
      };

      return await this.updateSettings(updatedSettings);
    } catch (error) {
      console.error(`Error updating ${category} settings:`, error);
      throw error;
    }
  }

  // Create default settings
  static async createDefaultSettings() {
    try {
      const defaultSettings = {
        general: {
          siteName: "Iwu Francis Portfolio",
          siteDescription: "Full Stack Web Developer Portfolio",
          siteUrl: "https://iwufrancis.dev",
          adminEmail: "admin@iwufrancis.dev",
          timezone: "UTC",
          language: "en",
          maintenanceMode: false
        },
        user: {
          name: "Admin",
          email: "admin@iwufrancis.dev",
          role: "Administrator",
          lastLogin: new Date().toISOString(),
          notifications: true,
          emailNotifications: true
        },
        security: {
          twoFactorAuth: false,
          sessionTimeout: 30,
          passwordExpiry: 90,
          loginAttempts: 5,
          ipWhitelist: "",
          sslEnabled: true,
          passwordPolicy: {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: false
          }
        },
        notifications: {
          emailAlerts: true,
          systemAlerts: true,
          performanceAlerts: true,
          securityAlerts: true,
          weeklyReports: true,
          monthlyReports: false,
          maintenanceAlerts: true
        },
        backup: {
          autoBackup: true,
          backupFrequency: "daily",
          retentionDays: 30,
          lastBackup: null,
          backupLocation: "cloud",
          compressionEnabled: true,
          encryptionEnabled: false
        },
        advanced: {
          debugMode: false,
          logLevel: "info",
          cacheEnabled: true,
          cacheTtl: 3600,
          rateLimiting: {
            enabled: true,
            requestsPerMinute: 60,
            requestsPerHour: 1000
          },
          apiKeys: {
            openai: "",
            googleAnalytics: "",
            mailgun: ""
          }
        }
      };

      const newSettings = await db
        .insert(settings)
        .values({
          ...defaultSettings,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();

      return newSettings[0];
    } catch (error) {
      console.error('Error creating default settings:', error);
      throw error;
    }
  }

  // Validate settings data
  static validateSettings(settingsData) {
    const validated = {};

    // Validate general settings
    if (settingsData.general) {
      validated.general = {
        siteName: this.validateString(settingsData.general.siteName, "Site Name"),
        siteDescription: this.validateString(settingsData.general.siteDescription, "Site Description"),
        siteUrl: this.validateUrl(settingsData.general.siteUrl),
        adminEmail: this.validateEmail(settingsData.general.adminEmail),
        timezone: this.validateTimezone(settingsData.general.timezone),
        language: this.validateLanguage(settingsData.general.language),
        maintenanceMode: Boolean(settingsData.general.maintenanceMode)
      };
    }

    // Validate user settings
    if (settingsData.user) {
      validated.user = {
        name: this.validateString(settingsData.user.name, "User Name"),
        email: this.validateEmail(settingsData.user.email),
        role: this.validateString(settingsData.user.role, "User Role"),
        lastLogin: settingsData.user.lastLogin || new Date().toISOString(),
        notifications: Boolean(settingsData.user.notifications),
        emailNotifications: Boolean(settingsData.user.emailNotifications)
      };
    }

    // Validate security settings
    if (settingsData.security) {
      validated.security = {
        twoFactorAuth: Boolean(settingsData.security.twoFactorAuth),
        sessionTimeout: this.validateNumber(settingsData.security.sessionTimeout, 1, 1440, 30),
        passwordExpiry: this.validateNumber(settingsData.security.passwordExpiry, 1, 365, 90),
        loginAttempts: this.validateNumber(settingsData.security.loginAttempts, 1, 20, 5),
        ipWhitelist: this.validateIpWhitelist(settingsData.security.ipWhitelist),
        sslEnabled: Boolean(settingsData.security.sslEnabled),
        passwordPolicy: settingsData.security.passwordPolicy || {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: false
        }
      };
    }

    // Validate notification settings
    if (settingsData.notifications) {
      validated.notifications = {
        emailAlerts: Boolean(settingsData.notifications.emailAlerts),
        systemAlerts: Boolean(settingsData.notifications.systemAlerts),
        performanceAlerts: Boolean(settingsData.notifications.performanceAlerts),
        securityAlerts: Boolean(settingsData.notifications.securityAlerts),
        weeklyReports: Boolean(settingsData.notifications.weeklyReports),
        monthlyReports: Boolean(settingsData.notifications.monthlyReports),
        maintenanceAlerts: Boolean(settingsData.notifications.maintenanceAlerts)
      };
    }

    // Validate backup settings
    if (settingsData.backup) {
      validated.backup = {
        autoBackup: Boolean(settingsData.backup.autoBackup),
        backupFrequency: this.validateBackupFrequency(settingsData.backup.backupFrequency),
        retentionDays: this.validateNumber(settingsData.backup.retentionDays, 1, 365, 30),
        lastBackup: settingsData.backup.lastBackup || null,
        backupLocation: this.validateBackupLocation(settingsData.backup.backupLocation),
        compressionEnabled: Boolean(settingsData.backup.compressionEnabled),
        encryptionEnabled: Boolean(settingsData.backup.encryptionEnabled)
      };
    }

    // Validate advanced settings
    if (settingsData.advanced) {
      validated.advanced = {
        debugMode: Boolean(settingsData.advanced.debugMode),
        logLevel: this.validateLogLevel(settingsData.advanced.logLevel),
        cacheEnabled: Boolean(settingsData.advanced.cacheEnabled),
        cacheTtl: this.validateNumber(settingsData.advanced.cacheTtl, 60, 86400, 3600),
        rateLimiting: settingsData.advanced.rateLimiting || {
          enabled: true,
          requestsPerMinute: 60,
          requestsPerHour: 1000
        },
        apiKeys: settingsData.advanced.apiKeys || {
          openai: "",
          googleAnalytics: "",
          mailgun: ""
        }
      };
    }

    return validated;
  }

  // Validate specific category
  static validateCategory(category, categoryData) {
    const validationMap = {
      general: () => this.validateSettings({ general: categoryData }).general,
      user: () => this.validateSettings({ user: categoryData }).user,
      security: () => this.validateSettings({ security: categoryData }).security,
      notifications: () => this.validateSettings({ notifications: categoryData }).notifications,
      backup: () => this.validateSettings({ backup: categoryData }).backup,
      advanced: () => this.validateSettings({ advanced: categoryData }).advanced
    };

    const validator = validationMap[category];
    if (!validator) {
      throw new Error(`Invalid settings category: ${category}`);
    }

    return validator();
  }

  // Validation helper methods
  static validateString(value, fieldName) {
    if (typeof value !== 'string') {
      throw new Error(`${fieldName} must be a string`);
    }
    return value.trim();
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    return email;
  }

  static validateUrl(url) {
    try {
      new URL(url);
      return url;
    } catch {
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

  static validateTimezone(timezone) {
    const validTimezones = [
      'UTC', 'America/New_York', 'America/Chicago', 'America/Denver',
      'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo'
    ];
    return validTimezones.includes(timezone) ? timezone : 'UTC';
  }

  static validateLanguage(language) {
    const validLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt'];
    return validLanguages.includes(language) ? language : 'en';
  }

  static validateBackupFrequency(frequency) {
    const validFrequencies = ['hourly', 'daily', 'weekly', 'monthly'];
    return validFrequencies.includes(frequency) ? frequency : 'daily';
  }

  static validateBackupLocation(location) {
    const validLocations = ['local', 'cloud', 'both'];
    return validLocations.includes(location) ? location : 'cloud';
  }

  static validateLogLevel(level) {
    const validLevels = ['debug', 'info', 'warn', 'error'];
    return validLevels.includes(level) ? level : 'info';
  }

  static validateIpWhitelist(ipList) {
    if (!ipList) return '';
    
    const ips = ipList.split('\n').map(ip => ip.trim()).filter(ip => ip);
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    for (const ip of ips) {
      if (!ipRegex.test(ip)) {
        throw new Error(`Invalid IP address: ${ip}`);
      }
    }
    
    return ipList;
  }

  // Reset settings to default
  static async resetToDefault() {
    try {
      // Delete existing settings
      await db.delete(settings);
      
      // Create default settings
      return await this.createDefaultSettings();
    } catch (error) {
      console.error('Error resetting settings:', error);
      throw error;
    }
  }

  // Get settings for specific user
  static async getUserSettings(userId) {
    try {
      const allSettings = await this.getAllSettings();
      return {
        user: allSettings.user,
        notifications: allSettings.notifications,
        security: allSettings.security
      };
    } catch (error) {
      console.error('Error getting user settings:', error);
      throw error;
    }
  }

  // Update user-specific settings
  static async updateUserSettings(userId, userSettings) {
    try {
      const validatedUserSettings = this.validateCategory('user', userSettings);
      return await this.updateCategory('user', validatedUserSettings);
    } catch (error) {
      console.error('Error updating user settings:', error);
      throw error;
    }
  }
}
