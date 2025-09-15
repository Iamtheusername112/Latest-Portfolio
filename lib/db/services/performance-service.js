import { db } from '../config.js';
import { performanceMetrics } from '../schema.js';
import { eq, desc, gte, lte } from 'drizzle-orm';

export class PerformanceService {
  // Record performance metrics
  static async recordPerformanceMetrics(metrics) {
    try {
      const result = await db
        .insert(performanceMetrics)
        .values({
          ...metrics,
          timestamp: new Date()
        })
        .returning();
      
      return result[0];
    } catch (error) {
      console.error('Error recording performance metrics:', error);
      throw error;
    }
  }

  // Get recent performance metrics
  static async getRecentMetrics(days = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const result = await db
        .select()
        .from(performanceMetrics)
        .where(gte(performanceMetrics.timestamp, startDate))
        .orderBy(desc(performanceMetrics.timestamp))
        .limit(100);

      return result;
    } catch (error) {
      console.error('Error fetching recent metrics:', error);
      throw error;
    }
  }

  // Get performance trends
  static async getPerformanceTrends(days = 30) {
    try {
      const metrics = await this.getRecentMetrics(days);
      
      // Group by date and calculate averages
      const trends = {};
      metrics.forEach(metric => {
        const date = metric.timestamp.toISOString().split('T')[0];
        if (!trends[date]) {
          trends[date] = {
            date,
            pageSpeed: 0,
            loadTime: 0,
            requests: 0,
            bundleSize: 0,
            count: 0
          };
        }
        
        trends[date].pageSpeed += metric.pageSpeed || 0;
        trends[date].loadTime += metric.loadTime || 0;
        trends[date].requests += metric.requests || 0;
        trends[date].bundleSize += metric.bundleSize || 0;
        trends[date].count += 1;
      });

      // Calculate averages
      return Object.values(trends).map(trend => ({
        name: new Date(trend.date).toLocaleDateString('en-US', { month: 'short' }),
        score: Math.round(trend.pageSpeed / trend.count),
        loadTime: Math.round((trend.loadTime / trend.count) * 10) / 10,
        requests: Math.round(trend.requests / trend.count),
        bundleSize: Math.round(trend.bundleSize / trend.count)
      })).sort((a, b) => new Date(a.date) - new Date(b.date));
    } catch (error) {
      console.error('Error getting performance trends:', error);
      throw error;
    }
  }

  // Get current performance metrics
  static async getCurrentMetrics() {
    try {
      const recent = await this.getRecentMetrics(1);
      if (recent.length === 0) {
        return await this.generateDefaultMetrics();
      }

      const latest = recent[0];
      return {
        pageSpeed: latest.pageSpeed || 0,
        loadTime: latest.loadTime || 0,
        requests: latest.requests || 0,
        bundleSize: latest.bundleSize || 0,
        images: latest.images || 0,
        scripts: latest.scripts || 0,
        styles: latest.styles || 0,
        accessibility: latest.accessibility || 0,
        bestPractices: latest.bestPractices || 0,
        seo: latest.seo || 0
      };
    } catch (error) {
      console.error('Error getting current metrics:', error);
      return await this.generateDefaultMetrics();
    }
  }

  // Analyze performance and generate recommendations
  static async analyzePerformance() {
    try {
      const current = await this.getCurrentMetrics();
      const recommendations = [];

      // Page Speed Analysis
      if (current.pageSpeed < 50) {
        recommendations.push({
          type: "error",
          title: "Critical: Page speed is very low",
          description: "Your page speed score is below 50. This severely impacts user experience and SEO.",
          priority: "high"
        });
      } else if (current.pageSpeed < 80) {
        recommendations.push({
          type: "warning",
          title: "Page speed needs improvement",
          description: "Your page speed score is below 80. Consider optimizing images and reducing bundle size.",
          priority: "medium"
        });
      } else {
        recommendations.push({
          type: "success",
          title: "Excellent page speed!",
          description: "Your page speed score is excellent. Keep up the good work!",
          priority: "low"
        });
      }

      // Load Time Analysis
      if (current.loadTime > 3) {
        recommendations.push({
          type: "error",
          title: "Slow load time detected",
          description: "Your page takes more than 3 seconds to load. This will cause users to leave.",
          priority: "high"
        });
      } else if (current.loadTime > 2) {
        recommendations.push({
          type: "warning",
          title: "Load time could be improved",
          description: "Your page takes more than 2 seconds to load. Consider optimizing assets.",
          priority: "medium"
        });
      }

      // Bundle Size Analysis
      if (current.bundleSize > 500) {
        recommendations.push({
          type: "warning",
          title: "Large bundle size",
          description: "Your JavaScript bundle is larger than 500KB. Consider code splitting.",
          priority: "medium"
        });
      }

      // Image Optimization
      if (current.images > 1000) {
        recommendations.push({
          type: "warning",
          title: "Images need optimization",
          description: "Your images are taking up more than 1MB. Consider compressing them.",
          priority: "medium"
        });
      }

      // Accessibility
      if (current.accessibility < 80) {
        recommendations.push({
          type: "warning",
          title: "Accessibility needs improvement",
          description: "Your accessibility score is below 80. Check for proper alt texts and ARIA labels.",
          priority: "medium"
        });
      }

      return {
        metrics: current,
        recommendations,
        overallScore: Math.round(
          (current.pageSpeed + current.accessibility + current.bestPractices + current.seo) / 4
        )
      };
    } catch (error) {
      console.error('Error analyzing performance:', error);
      throw error;
    }
  }

  // Generate default metrics for new installations
  static async generateDefaultMetrics() {
    return {
      pageSpeed: 85,
      loadTime: 1.8,
      requests: 45,
      bundleSize: 245,
      images: 1200,
      scripts: 180,
      styles: 65,
      accessibility: 88,
      bestPractices: 92,
      seo: 90
    };
  }

  // Simulate performance measurement (in a real app, this would use actual performance APIs)
  static async measurePerformance() {
    try {
      // In a real implementation, you would:
      // 1. Use Web Vitals API to measure actual performance
      // 2. Use Lighthouse API for detailed analysis
      // 3. Use browser performance APIs
      // 4. Analyze server logs for load times

      // For now, we'll simulate realistic performance data
      const metrics = {
        pageSpeed: Math.floor(Math.random() * 20) + 80, // 80-100
        loadTime: Math.round((Math.random() * 2 + 0.5) * 10) / 10, // 0.5-2.5 seconds
        requests: Math.floor(Math.random() * 30) + 20, // 20-50 requests
        bundleSize: Math.floor(Math.random() * 200) + 200, // 200-400 KB
        images: Math.floor(Math.random() * 800) + 400, // 400-1200 KB
        scripts: Math.floor(Math.random() * 100) + 150, // 150-250 KB
        styles: Math.floor(Math.random() * 30) + 50, // 50-80 KB
        accessibility: Math.floor(Math.random() * 15) + 85, // 85-100
        bestPractices: Math.floor(Math.random() * 10) + 90, // 90-100
        seo: Math.floor(Math.random() * 15) + 85 // 85-100
      };

      // Record the metrics
      await this.recordPerformanceMetrics(metrics);
      
      return metrics;
    } catch (error) {
      console.error('Error measuring performance:', error);
      throw error;
    }
  }

  // Get performance statistics
  static async getPerformanceStats() {
    try {
      const metrics = await this.getRecentMetrics(30);
      
      if (metrics.length === 0) {
        return {
          totalMeasurements: 0,
          averagePageSpeed: 0,
          averageLoadTime: 0,
          bestPageSpeed: 0,
          worstPageSpeed: 0,
          improvement: 0
        };
      }

      const pageSpeeds = metrics.map(m => m.pageSpeed).filter(s => s > 0);
      const loadTimes = metrics.map(m => m.loadTime).filter(t => t > 0);

      const averagePageSpeed = pageSpeeds.reduce((a, b) => a + b, 0) / pageSpeeds.length;
      const averageLoadTime = loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length;
      const bestPageSpeed = Math.max(...pageSpeeds);
      const worstPageSpeed = Math.min(...pageSpeeds);

      // Calculate improvement over time
      const firstHalf = metrics.slice(0, Math.floor(metrics.length / 2));
      const secondHalf = metrics.slice(Math.floor(metrics.length / 2));
      
      const firstHalfAvg = firstHalf.reduce((a, b) => a + (b.pageSpeed || 0), 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((a, b) => a + (b.pageSpeed || 0), 0) / secondHalf.length;
      const improvement = secondHalfAvg - firstHalfAvg;

      return {
        totalMeasurements: metrics.length,
        averagePageSpeed: Math.round(averagePageSpeed),
        averageLoadTime: Math.round(averageLoadTime * 10) / 10,
        bestPageSpeed,
        worstPageSpeed,
        improvement: Math.round(improvement)
      };
    } catch (error) {
      console.error('Error getting performance stats:', error);
      throw error;
    }
  }
}
