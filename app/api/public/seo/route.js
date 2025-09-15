import { NextResponse } from 'next/server';
import { SEOService } from '@/lib/db/services/seo-service';

export async function GET() {
  try {
    const seo = await SEOService.getSEOSettings();
    
    if (!seo) {
      return NextResponse.json({
        seo: {
          title: "Iwu Francis - Full Stack Developer",
          description: "Portfolio of Iwu Francis, a passionate full-stack developer specializing in modern web technologies and user experience design.",
          keywords: "full stack developer, web developer, react, nextjs, javascript, portfolio",
          author: "Iwu Francis",
          canonicalUrl: "https://iwufrancis.com",
          robots: "index, follow",
          ogTitle: "Iwu Francis - Full Stack Developer",
          ogDescription: "Portfolio of Iwu Francis, a passionate full-stack developer specializing in modern web technologies.",
          ogImage: "https://iwufrancis.com/logo.svg",
          ogUrl: "https://iwufrancis.com",
          twitterCard: "summary_large_image",
          twitterTitle: "Iwu Francis - Full Stack Developer",
          twitterDescription: "Portfolio of Iwu Francis, a passionate full-stack developer.",
          twitterImage: "https://iwufrancis.com/logo.svg"
        }
      });
    }

    return NextResponse.json({ seo });
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    
    // Return fallback data instead of error
    return NextResponse.json({
      seo: {
        title: "Iwu Francis - Full Stack Developer",
        description: "Portfolio of Iwu Francis, a passionate full-stack developer specializing in modern web technologies and user experience design.",
        keywords: "full stack developer, web developer, react, nextjs, javascript, portfolio",
        author: "Iwu Francis",
        canonicalUrl: "https://iwufrancis.com",
        robots: "index, follow",
        ogTitle: "Iwu Francis - Full Stack Developer",
        ogDescription: "Portfolio of Iwu Francis, a passionate full-stack developer specializing in modern web technologies.",
        ogImage: "https://iwufrancis.com/logo.svg",
        ogUrl: "https://iwufrancis.com",
        twitterCard: "summary_large_image",
        twitterTitle: "Iwu Francis - Full Stack Developer",
        twitterDescription: "Portfolio of Iwu Francis, a passionate full-stack developer.",
        twitterImage: "https://iwufrancis.com/logo.svg"
      }
    });
  }
}
