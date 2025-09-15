import { db } from '../config.js';
import { contactMessages } from '../schema.js';
import { eq, desc, asc, like, or, and, sql, inArray } from 'drizzle-orm';

export class ContactMessagesService {
  // Get all contact messages
  static async getAllMessages(filters = {}) {
    try {
      let query = db.select().from(contactMessages);
      
      // Apply filters
      if (filters.status) {
        query = query.where(eq(contactMessages.status, filters.status));
      }
      
      if (filters.priority) {
        query = query.where(eq(contactMessages.priority, filters.priority));
      }
      
      if (filters.isRead !== undefined) {
        query = query.where(eq(contactMessages.isRead, filters.isRead));
      }
      
      if (filters.search) {
        query = query.where(
          or(
            like(contactMessages.name, `%${filters.search}%`),
            like(contactMessages.email, `%${filters.search}%`),
            like(contactMessages.subject, `%${filters.search}%`),
            like(contactMessages.message, `%${filters.search}%`)
          )
        );
      }
      
      // Order by creation date (newest first)
      query = query.orderBy(desc(contactMessages.createdAt));
      
      // Apply pagination
      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      
      if (filters.offset) {
        query = query.offset(filters.offset);
      }
      
      const result = await query;
      return result;
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw error;
    }
  }

  // Get message by ID
  static async getMessageById(id) {
    try {
      const result = await db
        .select()
        .from(contactMessages)
        .where(eq(contactMessages.id, id))
        .limit(1);
      
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching contact message:', error);
      throw error;
    }
  }

  // Create new contact message
  static async createMessage(messageData) {
    try {
      const result = await db
        .insert(contactMessages)
        .values({
          ...messageData,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
      
      return result[0];
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw error;
    }
  }

  // Update message status
  static async updateMessageStatus(id, status, additionalData = {}) {
    try {
      const updateData = {
        status,
        updatedAt: new Date(),
        ...additionalData
      };

      // Set specific timestamps based on status
      if (status === 'read' && !additionalData.readAt) {
        updateData.isRead = true;
        updateData.readAt = new Date();
      }
      
      if (status === 'replied' && !additionalData.repliedAt) {
        updateData.repliedAt = new Date();
      }
      
      if (status === 'archived' && !additionalData.archivedAt) {
        updateData.archivedAt = new Date();
      }

      const result = await db
        .update(contactMessages)
        .set(updateData)
        .where(eq(contactMessages.id, id))
        .returning();
      
      return result[0];
    } catch (error) {
      console.error('Error updating message status:', error);
      throw error;
    }
  }

  // Mark message as read
  static async markAsRead(id) {
    return await this.updateMessageStatus(id, 'read');
  }

  // Mark message as replied
  static async markAsReplied(id, adminNotes = null) {
    return await this.updateMessageStatus(id, 'replied', { adminNotes });
  }

  // Archive message
  static async archiveMessage(id) {
    return await this.updateMessageStatus(id, 'archived');
  }

  // Delete message
  static async deleteMessage(id) {
    try {
      const result = await db
        .delete(contactMessages)
        .where(eq(contactMessages.id, id))
        .returning();
      
      return result[0];
    } catch (error) {
      console.error('Error deleting contact message:', error);
      throw error;
    }
  }

  // Get message statistics
  static async getMessageStats() {
    try {
      const totalMessages = await db
        .select({ count: sql`count(*)` })
        .from(contactMessages);

      const unreadMessages = await db
        .select({ count: sql`count(*)` })
        .from(contactMessages)
        .where(eq(contactMessages.isRead, false));

      const todayMessages = await db
        .select({ count: sql`count(*)` })
        .from(contactMessages)
        .where(sql`DATE(${contactMessages.createdAt}) = CURRENT_DATE`);

      const thisWeekMessages = await db
        .select({ count: sql`count(*)` })
        .from(contactMessages)
        .where(sql`${contactMessages.createdAt} >= CURRENT_DATE - INTERVAL '7 days'`);

      const statusCounts = await db
        .select({
          status: contactMessages.status,
          count: sql`count(*)`
        })
        .from(contactMessages)
        .groupBy(contactMessages.status);

      const priorityCounts = await db
        .select({
          priority: contactMessages.priority,
          count: sql`count(*)`
        })
        .from(contactMessages)
        .groupBy(contactMessages.priority);

      return {
        total: parseInt(totalMessages[0].count),
        unread: parseInt(unreadMessages[0].count),
        today: parseInt(todayMessages[0].count),
        thisWeek: parseInt(thisWeekMessages[0].count),
        byStatus: statusCounts.reduce((acc, item) => {
          acc[item.status] = parseInt(item.count);
          return acc;
        }, {}),
        byPriority: priorityCounts.reduce((acc, item) => {
          acc[item.priority] = parseInt(item.count);
          return acc;
        }, {})
      };
    } catch (error) {
      console.error('Error getting message statistics:', error);
      throw error;
    }
  }

  // Get recent messages (for notifications)
  static async getRecentMessages(limit = 5) {
    try {
      const result = await db
        .select()
        .from(contactMessages)
        .orderBy(desc(contactMessages.createdAt))
        .limit(limit);
      
      return result;
    } catch (error) {
      console.error('Error fetching recent messages:', error);
      throw error;
    }
  }

  // Bulk update messages
  static async bulkUpdateMessages(messageIds, updates) {
    try {
      if (!messageIds || messageIds.length === 0) {
        return [];
      }

      const result = await db
        .update(contactMessages)
        .set({
          ...updates,
          updatedAt: new Date()
        })
        .where(inArray(contactMessages.id, messageIds))
        .returning();
      
      return result;
    } catch (error) {
      console.error('Error bulk updating messages:', error);
      throw error;
    }
  }

  // Bulk delete messages
  static async bulkDeleteMessages(messageIds) {
    try {
      if (!messageIds || messageIds.length === 0) {
        return [];
      }

      const result = await db
        .delete(contactMessages)
        .where(inArray(contactMessages.id, messageIds))
        .returning();
      
      return result;
    } catch (error) {
      console.error('Error bulk deleting messages:', error);
      throw error;
    }
  }
}
