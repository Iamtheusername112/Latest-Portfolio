import { NextResponse } from 'next/server'
import { FooterService } from '@/lib/db/services/footer-service'

export async function GET() {
  try {
    const footer = await FooterService.getFooterSettings()

    if (!footer) {
      return NextResponse.json({
        brand: {
          name: 'Iwu Francis',
          tagline: 'Full Stack Developer',
          description:
            'Full Stack Web Developer passionate about creating innovative digital solutions and beautiful user experiences.',
          logo: {
            show: true,
            variant: 'default',
            size: 'lg',
          },
        },
        socialLinks: [
          {
            platform: 'github',
            url: 'https://github.com/Iamtheusername112',
            label: 'GitHub',
          },
          {
            platform: 'linkedin',
            url: 'https://linkedin.com/in/francis-iwu-878973238',
            label: 'LinkedIn',
          },
          {
            platform: 'instagram',
            url: 'https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3',
            label: 'Instagram',
          },
          {
            platform: 'mail',
            url: 'mailto:iwufrancischisom20@gmail.com',
            label: 'Email',
          },
        ],
        quickLinks: [
          { name: 'Home', href: '#home' },
          { name: 'About', href: '#about' },
          { name: 'Projects', href: '#projects' },
          { name: 'Contact', href: '#contact' },
        ],
        contactInfo: {
          email: 'iwufrancischisom20@gmail.com',
          location: 'Berlin, Germany',
          availability: 'Available for remote work',
        },
        copyright: {
          text: 'All rights reserved.',
          showYear: true,
        },
        layout: {
          showBrand: true,
          showQuickLinks: true,
          showContactInfo: true,
          showSocialLinks: true,
          showCopyright: true,
          columns: 3,
        },
        styling: {
          backgroundColor: 'background',
          textColor: 'foreground',
          accentColor: 'primary',
          borderColor: 'border',
          showBackgroundPattern: true,
          patternOpacity: 0.3,
        },
      })
    }

    return NextResponse.json(footer)
  } catch (error) {
    console.error('Error fetching footer data:', error)

    // Return fallback data instead of error
    return NextResponse.json({
      brand: {
        name: 'Iwu Francis',
        tagline: 'Full Stack Developer',
        description:
          'Full Stack Web Developer passionate about creating innovative digital solutions and beautiful user experiences.',
        logo: {
          show: true,
          variant: 'default',
          size: 'lg',
        },
      },
      socialLinks: [
        {
          platform: 'github',
          url: 'https://github.com/Iamtheusername112',
          label: 'GitHub',
        },
        {
          platform: 'linkedin',
          url: 'https://linkedin.com/in/francis-iwu-878973238',
          label: 'LinkedIn',
        },
        {
          platform: 'instagram',
          url: 'https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3',
          label: 'Instagram',
        },
        {
          platform: 'mail',
          url: 'mailto:iwufrancischisom20@gmail.com',
          label: 'Email',
        },
      ],
      quickLinks: [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
      ],
      contactInfo: {
        email: 'iwufrancischisom20@gmail.com',
        location: 'Berlin, Germany',
        availability: 'Available for remote work',
      },
      copyright: {
        text: 'All rights reserved.',
        showYear: true,
      },
      layout: {
        showBrand: true,
        showQuickLinks: true,
        showContactInfo: true,
        showSocialLinks: true,
        showCopyright: true,
        columns: 3,
      },
      styling: {
        backgroundColor: 'background',
        textColor: 'foreground',
        accentColor: 'primary',
        borderColor: 'border',
        showBackgroundPattern: true,
        patternOpacity: 0.3,
      },
    })
  }
}
