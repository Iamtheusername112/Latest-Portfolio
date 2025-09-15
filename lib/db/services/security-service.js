import { db } from '../config.js';
import { securityLogs, users } from '../schema.js';
import { eq, desc, gte } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export class SecurityService {
  // Log security event
  static async logSecurityEvent(action, user, ip, status, details = null) {
    try {
      const result = await db
        .insert(securityLogs)
        .values({
          action,
          user,
          ip,
          status,
          details,
          createdAt: new Date()
        })
        .returning();
      
      return result[0];
    } catch (error) {
      console.error('Error logging security event:', error);
      throw error;
    }
  }

  // Get recent security events
  static async getRecentSecurityEvents(limit = 50) {
    try {
      const events = await db
        .select()
        .from(securityLogs)
        .orderBy(desc(securityLogs.createdAt))
        .limit(limit);

      return events;
    } catch (error) {
      console.error('Error fetching security events:', error);
      throw error;
    }
  }

  // Get security statistics
  static async getSecurityStats() {
    try {
      const events = await this.getRecentSecurityEvents(1000);
      
      const stats = {
        totalEvents: events.length,
        successfulLogins: events.filter(e => e.action === 'login' && e.status === 'success').length,
        failedLogins: events.filter(e => e.action === 'login' && e.status === 'error').length,
        passwordChanges: events.filter(e => e.action === 'password_change').length,
        suspiciousActivity: events.filter(e => e.status === 'error').length,
        lastActivity: events[0]?.createdAt || null
      };

      return stats;
    } catch (error) {
      console.error('Error getting security stats:', error);
      throw error;
    }
  }

  // Get current admin user info
  static async getCurrentAdmin() {
    try {
      const admin = await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
          role: users.role,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt
        })
        .from(users)
        .where(eq(users.role, 'admin'))
        .limit(1);

      return admin[0] || null;
    } catch (error) {
      console.error('Error fetching current admin:', error);
      throw error;
    }
  }

  // Update admin credentials
  static async updateAdminCredentials(currentPassword, newEmail, newPassword, newName, userIp) {
    try {
      // Get current admin
      const currentAdmin = await this.getCurrentAdmin();
      if (!currentAdmin) {
        throw new Error('Admin user not found');
      }

      // Verify current password
      const adminWithPassword = await db
        .select()
        .from(users)
        .where(eq(users.id, currentAdmin.id))
        .limit(1);

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, adminWithPassword[0].password);
      if (!isCurrentPasswordValid) {
        await this.logSecurityEvent(
          'password_change_failed',
          currentAdmin.email,
          userIp,
          'error',
          'Invalid current password provided'
        );
        throw new Error('Current password is incorrect');
      }

      // Validate new email format
      if (newEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
          throw new Error('Invalid email format');
        }
      }

      // Validate new password strength
      if (newPassword) {
        if (newPassword.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
          throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
        }
      }

      // Prepare update data
      const updateData = {
        updatedAt: new Date()
      };

      if (newEmail && newEmail !== currentAdmin.email) {
        updateData.email = newEmail;
      }

      if (newName && newName !== currentAdmin.name) {
        updateData.name = newName;
      }

      if (newPassword) {
        updateData.password = await bcrypt.hash(newPassword, 12);
      }

      // Update admin user
      const updatedAdmin = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, currentAdmin.id))
        .returning();

      // Log the security event
      await this.logSecurityEvent(
        'credentials_updated',
        currentAdmin.email,
        userIp,
        'success',
        `Updated: ${newEmail ? 'email' : ''} ${newPassword ? 'password' : ''} ${newName ? 'name' : ''}`.trim()
      );

      return {
        success: true,
        admin: {
          id: updatedAdmin[0].id,
          email: updatedAdmin[0].email,
          name: updatedAdmin[0].name,
          role: updatedAdmin[0].role,
          updatedAt: updatedAdmin[0].updatedAt
        }
      };
    } catch (error) {
      console.error('Error updating admin credentials:', error);
      throw error;
    }
  }

  // Get security vulnerabilities (simulated)
  static async getSecurityVulnerabilities() {
    try {
      // In a real implementation, this would check:
      // - Outdated dependencies
      // - Security headers
      // - SSL certificate status
      // - Password policy compliance
      // - Two-factor authentication status

      const vulnerabilities = [];

      // Check if two-factor authentication is enabled (simulated)
      vulnerabilities.push({
        id: 1,
        title: "Two-Factor Authentication Disabled",
        severity: "medium",
        description: "Two-factor authentication is not enabled for admin accounts",
        status: "open",
        recommendation: "Enable 2FA to add an extra layer of security"
      });

      // Check password policy (simulated)
      vulnerabilities.push({
        id: 2,
        title: "Weak Password Policy",
        severity: "low",
        description: "Consider implementing stronger password requirements",
        status: "open",
        recommendation: "Enforce minimum 12 characters with special characters"
      });

      return vulnerabilities;
    } catch (error) {
      console.error('Error getting security vulnerabilities:', error);
      throw error;
    }
  }

  // Get security score
  static async getSecurityScore() {
    try {
      const stats = await this.getSecurityStats();
      const vulnerabilities = await this.getSecurityVulnerabilities();
        
      let score = 100;
      
      // Deduct points for vulnerabilities
      vulnerabilities.forEach(vuln => {
        switch (vuln.severity) {
          case 'high':
            score -= 20;
            break;
          case 'medium':
            score -= 10;
            break;
          case 'low':
            score -= 5;
            break;
        }
      });

      // Deduct points for failed login attempts
      if (stats.failedLogins > 10) {
        score -= 10;
      }

      // Deduct points for suspicious activity
      if (stats.suspiciousActivity > 5) {
        score -= 15;
      }

      return Math.max(0, score);
    } catch (error) {
      console.error('Error calculating security score:', error);
      return 85; // Default score
    }
  }

  // Get comprehensive security overview
  static async getSecurityOverview() {
    try {
      const [stats, vulnerabilities, score, admin] = await Promise.all([
        this.getSecurityStats(),
        this.getSecurityVulnerabilities(),
        this.getSecurityScore(),
        this.getCurrentAdmin()
      ]);

      return {
        overallScore: score,
        vulnerabilityCount: vulnerabilities.length,
        threatsBlocked: stats.suspiciousActivity,
        lastScan: new Date().toISOString(),
        stats,
        vulnerabilities,
        admin
      };
    } catch (error) {
      console.error('Error getting security overview:', error);
      throw error;
    }
  }
}
