"use client";

import { useEffect, useState } from 'react';

export default function DynamicMetadata() {
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const response = await fetch('/api/admin/seo');
        if (response.ok) {
          const data = await response.json();
          setSeoData(data);
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      }
    };

    fetchSEOData();
  }, []);

  useEffect(() => {
    if (seoData) {
      // Update page title
      if (seoData.title) {
        document.title = seoData.title;
      }

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && seoData.description) {
        metaDescription.setAttribute('content', seoData.description);
      }

      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords && seoData.keywords) {
        metaKeywords.setAttribute('content', seoData.keywords);
      }

      // Update meta author
      const metaAuthor = document.querySelector('meta[name="author"]');
      if (metaAuthor && seoData.author) {
        metaAuthor.setAttribute('content', seoData.author);
      }

      // Update canonical URL
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink && seoData.canonicalUrl) {
        canonicalLink.setAttribute('href', seoData.canonicalUrl);
      }

      // Update robots meta
      const metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots && seoData.robots) {
        metaRobots.setAttribute('content', seoData.robots);
      }

      // Update Open Graph tags
      if (seoData.ogTitle) {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
          ogTitle.setAttribute('content', seoData.ogTitle);
        }
      }

      if (seoData.ogDescription) {
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
          ogDescription.setAttribute('content', seoData.ogDescription);
        }
      }

      if (seoData.ogImage) {
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
          ogImage.setAttribute('content', seoData.ogImage);
        }
      }

      // Update Twitter Card tags
      if (seoData.twitterCard) {
        const twitterCard = document.querySelector('meta[name="twitter:card"]');
        if (twitterCard) {
          twitterCard.setAttribute('content', seoData.twitterCard);
        }
      }

      if (seoData.twitterSite) {
        const twitterSite = document.querySelector('meta[name="twitter:site"]');
        if (twitterSite) {
          twitterSite.setAttribute('content', seoData.twitterSite);
        }
      }
    }
  }, [seoData]);

  return null; // This component doesn't render anything
}
