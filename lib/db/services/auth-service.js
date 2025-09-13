import { db } from '../config.js';
import { users } from '../schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  // Create admin user
  static async createAdminUser(email, password, name = "Admin") {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const result = await db
        .insert(users)
        .values({
          email,
          name,
          password: hashedPassword,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
      
      return result[0];
    } catch (error) {
      console.error('Error creating admin user:', error);
      throw error;
    }
  }

  // Authenticate user
  static async authenticateUser(email, password) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not set');
      }

      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (user.length === 0) {
        return { success: false, message: 'User not found' };
      }

      const isValidPassword = await bcrypt.compare(password, user[0].password);
      
      if (!isValidPassword) {
        return { success: false, message: 'Invalid password' };
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user[0].id, 
          email: user[0].email, 
          role: user[0].role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return { 
        success: true, 
        user: {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          role: user[0].role
        },
        token
      };
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw error;
    }
  }

  // Verify JWT token
  static async verifyToken(token) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not set');
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user still exists in database
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, decoded.userId))
        .limit(1);

      if (user.length === 0) {
        return { success: false, message: 'User not found' };
      }

      return { 
        success: true, 
        user: {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          role: user[0].role
        }
      };
    } catch (error) {
      return { success: false, message: 'Invalid token' };
    }
  }

  // Get user by ID
  static async getUserById(id) {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Update user
  static async updateUser(id, data) {
    try {
      const updateData = { ...data, updatedAt: new Date() };
      
      // Hash password if provided
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 12);
      }

      const result = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, id))
        .returning();
      
      return result[0];
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Check if admin user exists
  static async adminExists() {
    try {
      const result = await db
        .select()
        .from(users)
        .where(eq(users.role, 'admin'))
        .limit(1);
      
      return result.length > 0;
    } catch (error) {
      console.error('Error checking admin existence:', error);
      return false;
    }
  }

  // Create default admin if none exists
  static async createDefaultAdmin() {
    try {
      const adminExists = await this.adminExists();
      
      if (!adminExists) {
        console.log('Creating default admin user...');
        await this.createAdminUser(
          'admin@example.com',
          'admin123',
          'Admin User'
        );
        console.log('Default admin created: admin@example.com / admin123');
      }
    } catch (error) {
      console.error('Error creating default admin:', error);
      throw error;
    }
  }
}
