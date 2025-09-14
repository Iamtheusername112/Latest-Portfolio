#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Setting up environment...');

// Check if .env.local exists
const envPath = '.env.local';
const envExamplePath = 'env.example';

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local from env.example...');
  
  if (fs.existsSync(envExamplePath)) {
    const envExample = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(envPath, envExample);
    console.log('✅ .env.local created successfully!');
  } else {
    console.log('❌ env.example not found. Creating basic .env.local...');
    const basicEnv = `# Database Configuration
DATABASE_URL="postgresql://neondb_owner:npg_DXY9OhAjNv5r@ep-wandering-cherry-agjevspd-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# JWT Secret for authentication (change this in production)
JWT_SECRET="portfolio-admin-secret-key-2024-change-in-production"

# Admin Configuration
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"

# Next.js Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3001"

# Development Configuration
NODE_ENV="development"`;
    
    fs.writeFileSync(envPath, basicEnv);
    console.log('✅ Basic .env.local created!');
  }
} else {
  console.log('✅ .env.local already exists');
}

console.log('🎉 Environment setup complete!');
