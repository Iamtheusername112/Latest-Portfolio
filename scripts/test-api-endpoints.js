#!/usr/bin/env node

console.log('🔍 Testing API Endpoints...\n');

const baseUrl = 'http://localhost:3001';

const endpoints = [
  '/api/admin/projects',
  '/api/projects',
  '/api/admin/hero',
  '/api/admin/about',
  '/api/admin/contact'
];

async function testEndpoint(endpoint) {
  try {
    console.log(`Testing ${endpoint}...`);
    const response = await fetch(`${baseUrl}${endpoint}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ ${endpoint} - Status: ${response.status}`);
      console.log(`   📊 Response: ${JSON.stringify(data).substring(0, 100)}...`);
    } else {
      console.log(`   ❌ ${endpoint} - Status: ${response.status}`);
      const errorText = await response.text();
      console.log(`   📝 Error: ${errorText.substring(0, 100)}...`);
    }
  } catch (error) {
    console.log(`   🚨 ${endpoint} - Network Error: ${error.message}`);
  }
  console.log('');
}

async function testAllEndpoints() {
  console.log('🚀 Starting API endpoint tests...\n');
  
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
    // Wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('✅ API endpoint testing complete!');
}

testAllEndpoints().catch(console.error);
