import { AboutService } from '../lib/db/services/about-service.js';
import { ContactService } from '../lib/db/services/contact-service.js';

async function testServices() {
  try {
    console.log('Testing About Service...');
    
    // Test about service
    const aboutContent = await AboutService.ensureAboutContentExists();
    console.log('About content:', aboutContent ? 'Found/Created' : 'Failed');
    
    console.log('\nTesting Contact Service...');
    
    // Test contact service
    const contactInfo = await ContactService.ensureContactInfoExists();
    console.log('Contact info:', contactInfo ? 'Found/Created' : 'Failed');
    
    console.log('\nServices test completed successfully!');
    
  } catch (error) {
    console.error('Error testing services:', error);
  }
}

testServices();
