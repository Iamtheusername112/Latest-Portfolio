import { pgTable, text, timestamp, integer, boolean, json, varchar, serial, decimal } from 'drizzle-orm/pg-core';

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
  profileImageUrl: varchar('profile_image_url', { length: 500 }),
  backgroundImageUrl: varchar('background_image_url', { length: 500 }),
  backgroundVideoUrl: varchar('background_video_url', { length: 500 }),
  backgroundType: varchar('background_type', { length: 50 }).default('gradient'), // gradient, image, video
  primaryButtonText: varchar('primary_button_text', { length: 100 }).default('View My Work'),
  primaryButtonAction: varchar('primary_button_action', { length: 50 }).default('scroll'), // scroll, link, download
  primaryButtonLink: varchar('primary_button_link', { length: 500 }),
  secondaryButtonText: varchar('secondary_button_text', { length: 100 }).default('Download CV'),
  secondaryButtonAction: varchar('secondary_button_action', { length: 50 }).default('download'), // scroll, link, download
  secondaryButtonLink: varchar('secondary_button_link', { length: 500 }),
  showScrollIndicator: boolean('show_scroll_indicator').default(true),
  scrollIndicatorText: varchar('scroll_indicator_text', { length: 100 }).default('Scroll Down'),
  socialLinks: json('social_links'),
  customCss: text('custom_css'),
  isActive: boolean('is_active').default(true),
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
  profileImageUrl: varchar('profile_image_url', { length: 500 }),
  backgroundImageUrl: varchar('background_image_url', { length: 500 }),
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
  shortDescription: text('short_description'),
  technologies: json('technologies'),
  techStack: json('tech_stack'), // Frontend, Backend, Database, etc.
  category: varchar('category', { length: 100 }), // Web App, Mobile App, Desktop, etc.
  status: varchar('status', { length: 50 }).default('planning'), // planning, in_progress, testing, deployed, completed, on_hold, cancelled
  priority: varchar('priority', { length: 20 }).default('medium'), // low, medium, high, urgent
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  estimatedHours: integer('estimated_hours'),
  actualHours: integer('actual_hours'),
  progress: integer('progress').default(0), // 0-100 percentage
  liveUrl: varchar('live_url', { length: 500 }),
  githubUrl: varchar('github_url', { length: 500 }),
  demoUrl: varchar('demo_url', { length: 500 }),
  documentationUrl: varchar('documentation_url', { length: 500 }),
  featured: boolean('featured').default(false),
  imageUrl: varchar('image_url', { length: 500 }),
  gallery: json('gallery'), // Array of image URLs
  challenges: text('challenges'),
  solutions: text('solutions'),
  lessonsLearned: text('lessons_learned'),
  client: varchar('client', { length: 255 }),
  teamSize: integer('team_size').default(1),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  tags: json('tags'),
  order: integer('order').default(0),
  isPublic: boolean('is_public').default(true),
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

// Logo settings
export const logoSettings = pgTable('logo_settings', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 50 }).notNull(), // 'text', 'image', 'svg'
  textContent: varchar('text_content', { length: 255 }),
  imageUrl: varchar('image_url', { length: 500 }),
  svgContent: text('svg_content'),
  alt: varchar('alt', { length: 255 }),
  width: integer('width'),
  height: integer('height'),
  showText: boolean('show_text').default(true),
  textSize: varchar('text_size', { length: 20 }).default('md'), // sm, md, lg, xl
  variant: varchar('variant', { length: 50 }).default('default'), // default, minimal, tech
  isActive: boolean('is_active').default(true),
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

// Contact messages from contact form
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 500 }),
  message: text('message').notNull(),
  phone: varchar('phone', { length: 50 }),
  company: varchar('company', { length: 255 }),
  status: varchar('status', { length: 50 }).default('unread'), // unread, read, replied, archived
  priority: varchar('priority', { length: 20 }).default('normal'), // low, normal, high, urgent
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at'),
  repliedAt: timestamp('replied_at'),
  archivedAt: timestamp('archived_at'),
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Performance metrics
export const performanceMetrics = pgTable('performance_metrics', {
  id: serial('id').primaryKey(),
  pageSpeed: integer('page_speed'),
  loadTime: decimal('load_time', { precision: 5, scale: 2 }),
  requests: integer('requests'),
  bundleSize: integer('bundle_size'),
  images: integer('images'),
  scripts: integer('scripts'),
  styles: integer('styles'),
  accessibility: integer('accessibility'),
  bestPractices: integer('best_practices'),
  seo: integer('seo'),
  timestamp: timestamp('timestamp').defaultNow()
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
