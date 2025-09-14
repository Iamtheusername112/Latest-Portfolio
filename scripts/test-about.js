import { AboutService } from '../lib/db/services/about-service.js';

async function testAboutContent() {
  try {
    console.log('Testing about content...');
    
    // Try to get existing content
    let aboutContent = await AboutService.getAboutContent();
    console.log('Existing content:', aboutContent ? 'Found' : 'Not found');
    
    if (!aboutContent) {
      console.log('Creating default about content...');
      aboutContent = await AboutService.createInitialAboutContent();
      console.log('Created:', aboutContent.id);
    }
    
    console.log('About content ready:', {
      id: aboutContent.id,
      title: aboutContent.title,
      name: aboutContent.name
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testAboutContent();
