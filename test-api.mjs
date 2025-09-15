import 'dotenv/config';

async function testAPI() {
  console.log('🔍 Testing API endpoint...\n');

  try {
    const response = await fetch('http://localhost:3000/api/admin/messages');
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
    } else {
      const data = await response.json();
      console.log('Success response:', data);
    }
  } catch (error) {
    console.error('Request failed:', error.message);
  }
}

testAPI();
