const fetch = require('node-fetch');

async function testPerformanceAPI() {
  const baseUrl = 'http://localhost:3002';
  
  console.log('🧪 Testing Performance API endpoints...\n');
  
  try {
    // Test 1: Get current metrics
    console.log('1. Testing GET /api/admin/performance');
    const metricsResponse = await fetch(`${baseUrl}/api/admin/performance`);
    const metrics = await metricsResponse.json();
    
    if (metricsResponse.ok) {
      console.log('✅ Performance metrics fetched successfully');
      console.log('Page Speed:', metrics.pageSpeed);
      console.log('Load Time:', metrics.loadTime);
      console.log('Bundle Size:', metrics.bundleSize);
    } else {
      console.log('❌ Failed to fetch performance metrics:', metrics);
    }
    
    // Test 2: Get trends
    console.log('\n2. Testing GET /api/admin/performance?action=trends');
    const trendsResponse = await fetch(`${baseUrl}/api/admin/performance?action=trends`);
    const trends = await trendsResponse.json();
    
    if (trendsResponse.ok) {
      console.log('✅ Performance trends fetched successfully');
      console.log('Trends data points:', trends.length);
    } else {
      console.log('❌ Failed to fetch trends:', trends);
    }
    
    // Test 3: Get analysis
    console.log('\n3. Testing GET /api/admin/performance?action=analyze');
    const analysisResponse = await fetch(`${baseUrl}/api/admin/performance?action=analyze`);
    const analysis = await analysisResponse.json();
    
    if (analysisResponse.ok) {
      console.log('✅ Performance analysis completed');
      console.log('Overall Score:', analysis.overallScore);
      console.log('Recommendations:', analysis.recommendations?.length || 0);
    } else {
      console.log('❌ Failed to analyze performance:', analysis);
    }
    
    // Test 4: Get stats
    console.log('\n4. Testing GET /api/admin/performance?action=stats');
    const statsResponse = await fetch(`${baseUrl}/api/admin/performance?action=stats`);
    const stats = await statsResponse.json();
    
    if (statsResponse.ok) {
      console.log('✅ Performance stats fetched successfully');
      console.log('Total Measurements:', stats.totalMeasurements);
      console.log('Average Page Speed:', stats.averagePageSpeed);
    } else {
      console.log('❌ Failed to fetch stats:', stats);
    }
    
    // Test 5: Record new metrics
    console.log('\n5. Testing POST /api/admin/performance (measure)');
    const measureResponse = await fetch(`${baseUrl}/api/admin/performance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'measure' })
    });
    
    const measureResult = await measureResponse.json();
    
    if (measureResponse.ok) {
      console.log('✅ Performance measurement completed');
      console.log('New Page Speed:', measureResult.metrics?.pageSpeed);
    } else {
      console.log('❌ Failed to measure performance:', measureResult);
    }
    
    console.log('\n🎉 Performance API testing completed!');
    
  } catch (error) {
    console.error('❌ Error testing Performance API:', error.message);
  }
}

// Run the test
testPerformanceAPI();
