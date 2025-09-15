import { pgTable, text, timestamp, integer, boolean, json, varchar, serial, decimal } from 'drizzle-orm/pg-core';

// Test settings table
export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  general: json('general'),
  user: json('user'),
  security: json('security'),
  notifications: json('notifications'),
  backup: json('backup'),
  advanced: json('advanced'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

console.log('Settings table defined:', settings);
