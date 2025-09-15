const fetch = require('node-fetch');

async function testSEOAPI() {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testing SEO API endpoints...\n');
  
  try {
    // Test 1: Fetch SEO settings
    console.log('1. Testing GET /api/admin/seo');
    const seoResponse = await fetch(`${baseUrl}/api/admin/seo`);
    const seoData = await seoResponse.json();
    
    if (seoResponse.ok) {
      console.log('✅ SEO settings fetched successfully');
      console.log('Title:', seoData.title);
      console.log('Description:', seoData.description?.substring(0, 50) + '...');
    } else {
      console.log('❌ Failed to fetch SEO settings:', seoData);
    }
    
    // Test 2: Analyze SEO
    console.log('\n2. Testing GET /api/admin/seo/analyze');
    const analyzeResponse = await fetch(`${baseUrl}/api/admin/seo/analyze`);
    const analyzeData = await analyzeResponse.json();
    
    if (analyzeResponse.ok) {
      console.log('✅ SEO analysis completed');
      console.log('Score:', analyzeData.score);
      console.log('Issues found:', analyzeData.issues.length);
    } else {
      console.log('❌ Failed to analyze SEO:', analyzeData);
    }
    
    // Test 3: Test sitemap
    console.log('\n3. Testing GET /api/sitemap.xml');
    const sitemapResponse = await fetch(`${baseUrl}/api/sitemap.xml`);
    
    if (sitemapResponse.ok) {
      console.log('✅ Sitemap generated successfully');
      const sitemapText = await sitemapResponse.text();
      console.log('Sitemap contains URLs:', sitemapText.includes('<url>'));
    } else {
      console.log('❌ Failed to generate sitemap');
    }
    
    // Test 4: Test robots.txt
    console.log('\n4. Testing GET /api/robots.txt');
    const robotsResponse = await fetch(`${baseUrl}/api/robots.txt`);
    
    if (robotsResponse.ok) {
      console.log('✅ Robots.txt generated successfully');
      const robotsText = await robotsResponse.text();
      console.log('Robots.txt contains sitemap:', robotsText.includes('Sitemap:'));
    } else {
      console.log('❌ Failed to generate robots.txt');
    }
    
    // Test 5: Update SEO settings
    console.log('\n5. Testing PUT /api/admin/seo');
    const updateData = {
      title: "Test Title - Updated",
      description: "This is a test description for SEO testing purposes.",
      keywords: "test, seo, portfolio, web development",
      author: "Test Author",
      canonicalUrl: "https://test.example.com",
      ogTitle: "Test OG Title",
      ogDescription: "Test OG Description",
      ogImage: "/test-image.jpg",
      twitterCard: "summary_large_image",
      twitterSite: "@testuser",
      robots: "index, follow",
      sitemap: "https://test.example.com/sitemap.xml"
    };
    
    const updateResponse = await fetch(`${baseUrl}/api/admin/seo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    
    const updateResult = await updateResponse.json();
    
    if (updateResponse.ok) {
      console.log('✅ SEO settings updated successfully');
      console.log('Updated title:', updateResult.settings?.title);
    } else {
      console.log('❌ Failed to update SEO settings:', updateResult);
    }
    
    console.log('\n🎉 SEO API testing completed!');
    
  } catch (error) {
    console.error('❌ Error testing SEO API:', error.message);
  }
}

// Run the test
testSEOAPI();
