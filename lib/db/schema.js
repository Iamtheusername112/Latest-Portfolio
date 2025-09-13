import { pgTable, text, timestamp, integer, boolean, json, varchar, serial } from 'drizzle-orm/pg-core';

// Users table for admin authentication
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  password: text('password').notNull(),
  role: varchar('role', { length: 50 }).default('admin'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Hero section content
export const heroContent = pgTable('hero_content', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  cvUrl: varchar('cv_url', { length: 500 }),
  socialLinks: json('social_links'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// About section content
export const aboutContent = pgTable('about_content', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 500 }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  description2: text('description2'),
  stats: json('stats'),
  skills: json('skills'),
  experiences: json('experiences'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Projects table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  technologies: json('technologies'),
  liveUrl: varchar('live_url', { length: 500 }),
  githubUrl: varchar('github_url', { length: 500 }),
  featured: boolean('featured').default(false),
  imageUrl: varchar('image_url', { length: 500 }),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Contact information
export const contactInfo = pgTable('contact_info', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 500 }),
  description: text('description'),
  contactDetails: json('contact_details'),
  socialLinks: json('social_links'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Media files
export const mediaFiles = pgTable('media_files', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // image, video, document
  size: varchar('size', { length: 50 }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  alt: text('alt'),
  category: varchar('category', { length: 100 }),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow()
});

// SEO settings
export const seoSettings = pgTable('seo_settings', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  keywords: text('keywords'),
  author: varchar('author', { length: 255 }),
  ogTitle: varchar('og_title', { length: 255 }),
  ogDescription: text('og_description'),
  ogImage: varchar('og_image', { length: 500 }),
  twitterCard: varchar('twitter_card', { length: 50 }),
  twitterSite: varchar('twitter_site', { length: 100 }),
  canonicalUrl: varchar('canonical_url', { length: 500 }),
  robots: varchar('robots', { length: 100 }),
  sitemap: varchar('sitemap', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Appearance settings
export const appearanceSettings = pgTable('appearance_settings', {
  id: serial('id').primaryKey(),
  colors: json('colors'),
  typography: json('typography'),
  layout: json('layout'),
  theme: json('theme'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Site settings
export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  siteName: varchar('site_name', { length: 255 }).notNull(),
  siteDescription: text('site_description'),
  siteUrl: varchar('site_url', { length: 500 }),
  adminEmail: varchar('admin_email', { length: 255 }),
  timezone: varchar('timezone', { length: 100 }).default('UTC'),
  language: varchar('language', { length: 10 }).default('en'),
  maintenanceMode: boolean('maintenance_mode').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Analytics data
export const analytics = pgTable('analytics', {
  id: serial('id').primaryKey(),
  date: timestamp('date').notNull(),
  pageViews: integer('page_views').default(0),
  uniqueVisitors: integer('unique_visitors').default(0),
  bounceRate: integer('bounce_rate').default(0),
  avgLoadTime: integer('avg_load_time').default(0),
  createdAt: timestamp('created_at').defaultNow()
});

// Security logs
export const securityLogs = pgTable('security_logs', {
  id: serial('id').primaryKey(),
  action: varchar('action', { length: 255 }).notNull(),
  user: varchar('user', { length: 255 }),
  ip: varchar('ip', { length: 45 }),
  status: varchar('status', { length: 50 }).notNull(), // success, warning, error
  details: text('details'),
  createdAt: timestamp('created_at').defaultNow()
});
