const { AboutService } = require('../lib/db/services/about-service.js');

async function initializeAboutContent() {
  try {
    console.log('Initializing about content...');
    
    // This will create default content if none exists
    const aboutContent = await AboutService.ensureAboutContentExists();
    
    console.log('About content initialized successfully!');
    console.log('Content:', {
      id: aboutContent.id,
      title: aboutContent.title,
      name: aboutContent.name,
      hasProfileImage: !!aboutContent.profileImageUrl,
      hasBackgroundImage: !!aboutContent.backgroundImageUrl,
      statsCount: aboutContent.stats?.length || 0,
      skillsCount: aboutContent.skills?.length || 0,
      experiencesCount: aboutContent.experiences?.length || 0
    });
    
  } catch (error) {
    console.error('Error initializing about content:', error);
    process.exit(1);
  }
}

initializeAboutContent();
