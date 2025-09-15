import { db } from '../config.js';
import { seoSettings } from '../schema.js';
import { eq } from 'drizzle-orm';

export class SEOService {
  // Get SEO settings
  static async getSEOSettings() {
    try {
      const result = await db.select().from(seoSettings).limit(1);
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
      throw error;
    }
  }

  // Update SEO settings
  static async updateSEOSettings(data) {
    try {
      // Validate required fields
      if (!data.title || !data.description) {
        throw new Error('Title and description are required fields');
      }

      // Clean the data to remove any invalid fields
      const processedData = {
        title: data.title,
        description: data.description,
        keywords: data.keywords || null,
        author: data.author || null,
        ogTitle: data.ogTitle || null,
        ogDescription: data.ogDescription || null,
        ogImage: data.ogImage || null,
        twitterCard: data.twitterCard || 'summary_large_image',
        twitterSite: data.twitterSite || null,
        canonicalUrl: data.canonicalUrl || null,
        robots: data.robots || 'index, follow',
        sitemap: data.sitemap || null,
        updatedAt: new Date()
      };

      const existing = await this.getSEOSettings();
      
      if (existing) {
        const result = await db
          .update(seoSettings)
          .set(processedData)
          .where(eq(seoSettings.id, existing.id))
          .returning();
        return result[0];
      } else {
        const result = await db
          .insert(seoSettings)
          .values({
            ...processedData,
            createdAt: new Date()
          })
          .returning();
        return result[0];
      }
    } catch (error) {
      console.error('Error updating SEO settings:', error);
      throw error;
    }
  }

  // Create initial SEO settings
  static async createInitialSEOSettings() {
    const defaultData = {
      title: "Iwu Francis - Full Stack Web Developer",
      description: "Passionate full-stack developer creating beautiful, functional web applications. 5+ years experience with React, Node.js, and modern technologies.",
      keywords: "web developer, full stack developer, react developer, node.js, javascript, portfolio",
      author: "Iwu Francis",
      ogTitle: "Iwu Francis - Full Stack Web Developer Portfolio",
      ogDescription: "Explore my portfolio of web development projects and get in touch for your next project.",
      ogImage: "/api/placeholder/1200/630",
      twitterCard: "summary_large_image",
      twitterSite: "@iwufrancis",
      canonicalUrl: "https://iwufrancis.dev",
      robots: "index, follow",
      sitemap: "https://iwufrancis.dev/sitemap.xml"
    };

    return await this.updateSEOSettings(defaultData);
  }

  // Ensure SEO settings exist
  static async ensureSEOSettingsExist() {
    try {
      const existing = await this.getSEOSettings();
      if (!existing) {
        console.log('No SEO settings found, creating default settings...');
        return await this.createInitialSEOSettings();
      }
      return existing;
    } catch (error) {
      console.error('Error ensuring SEO settings exist:', error);
      throw error;
    }
  }

  // Analyze SEO score
  static async analyzeSEO() {
    try {
      const settings = await this.getSEOSettings();
      if (!settings) {
        return {
          score: 0,
          issues: [
            { type: "error", message: "No SEO settings found", status: "error" }
          ],
          metrics: {
            pageSpeed: 0,
            mobileUsability: 0,
            seoScore: 0,
            accessibility: 0
          }
        };
      }

      const issues = [];
      let score = 100;

      // Check title length
      if (settings.title.length < 30) {
        issues.push({ type: "warning", message: "Title is too short (recommended: 30-60 characters)", status: "warning" });
        score -= 10;
      } else if (settings.title.length > 60) {
        issues.push({ type: "warning", message: "Title is too long (recommended: 30-60 characters)", status: "warning" });
        score -= 5;
      } else {
        issues.push({ type: "success", message: "Title length is optimal", status: "success" });
      }

      // Check description length
      if (settings.description.length < 120) {
        issues.push({ type: "warning", message: "Meta description is too short (recommended: 120-160 characters)", status: "warning" });
        score -= 10;
      } else if (settings.description.length > 160) {
        issues.push({ type: "warning", message: "Meta description is too long (recommended: 120-160 characters)", status: "warning" });
        score -= 5;
      } else {
        issues.push({ type: "success", message: "Meta description length is optimal", status: "success" });
      }

      // Check for keywords
      if (!settings.keywords || settings.keywords.trim() === '') {
        issues.push({ type: "warning", message: "No keywords specified", status: "warning" });
        score -= 5;
      } else {
        issues.push({ type: "success", message: "Keywords are specified", status: "success" });
      }

      // Check for Open Graph data
      if (!settings.ogTitle || !settings.ogDescription) {
        issues.push({ type: "warning", message: "Missing Open Graph data for social sharing", status: "warning" });
        score -= 10;
      } else {
        issues.push({ type: "success", message: "Open Graph data is configured", status: "success" });
      }

      // Check for canonical URL
      if (!settings.canonicalUrl) {
        issues.push({ type: "warning", message: "No canonical URL specified", status: "warning" });
        score -= 5;
      } else {
        issues.push({ type: "success", message: "Canonical URL is specified", status: "success" });
      }

      // Check for sitemap
      if (!settings.sitemap) {
        issues.push({ type: "warning", message: "No sitemap URL specified", status: "warning" });
        score -= 5;
      } else {
        issues.push({ type: "success", message: "Sitemap URL is specified", status: "success" });
      }

      // Simulate performance metrics (in a real app, these would come from actual analysis)
      const metrics = {
        pageSpeed: Math.floor(Math.random() * 20) + 80, // 80-100
        mobileUsability: Math.floor(Math.random() * 10) + 90, // 90-100
        seoScore: Math.max(0, score),
        accessibility: Math.floor(Math.random() * 15) + 85 // 85-100
      };

      return {
        score: Math.max(0, score),
        issues,
        metrics
      };
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      throw error;
    }
  }

  // Generate sitemap XML
  static async generateSitemap() {
    try {
      const settings = await this.getSEOSettings();
      const baseUrl = settings?.canonicalUrl || 'https://iwufrancis.dev';
      
      const pages = [
        { url: '', priority: '1.0', changefreq: 'weekly' },
        { url: '/about', priority: '0.8', changefreq: 'monthly' },
        { url: '/projects', priority: '0.9', changefreq: 'weekly' },
        { url: '/contact', priority: '0.7', changefreq: 'monthly' }
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      return sitemap;
    } catch (error) {
      console.error('Error generating sitemap:', error);
      throw error;
    }
  }

  // Generate robots.txt
  static async generateRobotsTxt() {
    try {
      const settings = await this.getSEOSettings();
      const baseUrl = settings?.canonicalUrl || 'https://iwufrancis.dev';
      const sitemapUrl = settings?.sitemap || `${baseUrl}/sitemap.xml`;
      const robots = settings?.robots || 'index, follow';

      return `User-agent: *
${robots}

Sitemap: ${sitemapUrl}`;
    } catch (error) {
      console.error('Error generating robots.txt:', error);
      throw error;
    }
  }
}
