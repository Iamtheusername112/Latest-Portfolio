import { NextResponse } from 'next/server';
import { FooterService } from '@/lib/db/services/footer-service';

export async function GET() {
  try {
    const footer = await FooterService.getFooterSettings();
    
    if (!footer) {
      return NextResponse.json({
        footer: {
          title: "Iwu Francis",
          description: "Full Stack Developer & UI/UX Designer",
          copyright: "© 2024 Iwu Francis. All rights reserved.",
          socialLinks: [
            { platform: "github", url: "https://github.com/iwufrancis", label: "GitHub" },
            { platform: "linkedin", url: "https://linkedin.com/in/iwufrancis", label: "LinkedIn" },
            { platform: "mail", url: "mailto:iwufrancis571@gmail.com", label: "Email" }
          ],
          quickLinks: [
            { name: "Home", href: "#home" },
            { name: "About", href: "#about" },
            { name: "Projects", href: "#projects" },
            { name: "Contact", href: "#contact" }
          ]
        }
      });
    }

    return NextResponse.json({ footer });
  } catch (error) {
    console.error('Error fetching footer data:', error);
    
    // Return fallback data instead of error
    return NextResponse.json({
      footer: {
        title: "Iwu Francis",
        description: "Full Stack Developer & UI/UX Designer",
        copyright: "© 2024 Iwu Francis. All rights reserved.",
        socialLinks: [
          { platform: "github", url: "https://github.com/iwufrancis", label: "GitHub" },
          { platform: "linkedin", url: "https://linkedin.com/in/iwufrancis", label: "LinkedIn" },
          { platform: "mail", url: "mailto:iwufrancis571@gmail.com", label: "Email" }
        ],
        quickLinks: [
          { name: "Home", href: "#home" },
          { name: "About", href: "#about" },
          { name: "Projects", href: "#projects" },
          { name: "Contact", href: "#contact" }
        ]
      }
    });
  }
}
