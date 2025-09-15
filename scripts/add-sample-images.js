#!/usr/bin/env node

import { db } from '../lib/db/config.js';
import { mediaFiles } from '../lib/db/schema.js';

async function addSampleImages() {
  console.log('📸 Adding sample images to database...\n');

  try {
    // Sample images for projects
    const sampleImages = [
      {
        name: "portfolio-website.png",
        type: "image",
        size: "2.1 MB",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        alt: "Portfolio website screenshot",
        category: "projects"
      },
      {
        name: "ecommerce-platform.jpg",
        type: "image", 
        size: "1.8 MB",
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        alt: "E-commerce platform interface",
        category: "projects"
      },
      {
        name: "mobile-app-ui.png",
        type: "image",
        size: "2.3 MB", 
        url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
        alt: "Mobile application user interface",
        category: "projects"
      },
      {
        name: "task-management-dashboard.png",
        type: "image",
        size: "2.7 MB",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", 
        alt: "Task management dashboard",
        category: "projects"
      },
      {
        name: "weather-app-screenshot.png",
        type: "image",
        size: "1.9 MB",
        url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
        alt: "Weather application interface",
        category: "projects"
      },
      {
        name: "hero-background.jpg",
        type: "image",
        size: "3.2 MB",
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop",
        alt: "Modern tech background",
        category: "backgrounds"
      },
      {
        name: "profile-image.jpg",
        type: "image", 
        size: "1.5 MB",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        alt: "Professional profile image",
        category: "profile"
      }
    ];

    console.log(`Adding ${sampleImages.length} sample images...`);
    
    for (const image of sampleImages) {
      try {
        const result = await db
          .insert(mediaFiles)
          .values({
            ...image,
            uploadedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .returning();
        
        console.log(`✅ Added: ${result[0].name} (ID: ${result[0].id})`);
      } catch (error) {
        if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
          console.log(`⚠️  Image already exists: ${image.name}`);
        } else {
          console.error(`❌ Failed to add ${image.name}:`, error.message);
        }
      }
    }

    // Check total media files
    const allMedia = await db.select().from(mediaFiles);
    console.log(`\n📊 Total media files in database: ${allMedia.length}`);
    
    console.log('\n🎉 Sample images added successfully!');
    console.log('\n💡 You can now:');
    console.log('   1. Go to admin dashboard → Media section to see the images');
    console.log('   2. Use these images for your projects');
    console.log('   3. Select images when creating/editing projects');
    
  } catch (error) {
    console.error('\n❌ Failed to add sample images:', error.message);
    console.error(error);
    process.exit(1);
  }
}

addSampleImages();
