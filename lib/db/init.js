import { db } from './config.js';
import { HeroService } from './services/hero-service.js';
import { AboutService } from './services/about-service.js';
import { ProjectsService } from './services/projects-service.js';
import { ContactService } from './services/contact-service.js';
import { MediaService } from './services/media-service.js';
import { AuthService } from './services/auth-service.js';

export async function initializeDatabase() {
  try {
    console.log('🚀 Initializing database...');

    // Create default admin user first
    await AuthService.createDefaultAdmin();

    // Check if data already exists
    const existingHero = await HeroService.getHeroContent();
    const existingAbout = await AboutService.getAboutContent();
    const existingProjects = await ProjectsService.getAllProjects();
    const existingContact = await ContactService.getContactInfo();
    const existingMedia = await MediaService.getAllMediaFiles();

    // Initialize hero content if not exists
    if (!existingHero) {
      console.log('📝 Creating initial hero content...');
      await HeroService.createInitialHeroContent();
    }

    // Initialize about content if not exists
    if (!existingAbout) {
      console.log('👤 Creating initial about content...');
      await AboutService.createInitialAboutContent();
    }

    // Initialize projects if not exists
    if (existingProjects.length === 0) {
      console.log('💼 Creating initial projects...');
      await ProjectsService.createInitialProjects();
    }

    // Initialize contact info if not exists
    if (!existingContact) {
      console.log('📞 Creating initial contact info...');
      await ContactService.createInitialContactInfo();
    }

    // Initialize media files if not exists
    if (existingMedia.length === 0) {
      console.log('🖼️ Creating initial media files...');
      await MediaService.createInitialMediaFiles();
    }

    console.log('✅ Database initialization completed!');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

// Run initialization if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}
