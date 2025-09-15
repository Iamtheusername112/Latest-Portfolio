const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

async function testUpload() {
  try {
    console.log('Testing file upload...');
    
    // Create a test file
    const testFilePath = path.join(__dirname, 'test-file.txt');
    fs.writeFileSync(testFilePath, 'This is a test file for upload');
    
    // Create form data
    const form = new FormData();
    form.append('file', fs.createReadStream(testFilePath));
    
    // Make the request
    const response = await fetch('http://localhost:3001/api/admin/media/upload', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Upload successful:', data);
    } else {
      const errorText = await response.text();
      console.log('Upload failed:', errorText);
    }
    
    // Clean up test file
    fs.unlinkSync(testFilePath);
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testUpload();
