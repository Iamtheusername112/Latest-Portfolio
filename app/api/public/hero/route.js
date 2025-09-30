import { NextResponse } from 'next/server'
import { HeroService } from '@/lib/db/services/hero-service'

export async function GET() {
  try {
    const hero = await HeroService.getHeroContent()

    if (!hero) {
      return NextResponse.json({
        hero: {
          name: 'Iwu Francis',
          title: 'Full Stack Developer & UI/UX Designer',
          description:
            'Passionate about creating beautiful, functional web experiences that make a difference.',
          primaryButtonText: 'View My Work',
          primaryButtonLink: '#projects',
          secondaryButtonText: 'Get In Touch',
          secondaryButtonLink: '#contact',
          profileImageUrl: '/logo.svg',
          socialLinks: {
            github: 'https://github.com/iwufrancis',
            linkedin: 'https://linkedin.com/in/iwufrancis',
            email: 'mailto:iwufrancischisom20@gmail.com',
          },
        },
      })
    }

    return NextResponse.json({ hero })
  } catch (error) {
    console.error('Error fetching hero data:', error)

    // Return fallback data instead of error
    return NextResponse.json({
      hero: {
        name: 'Iwu Francis',
        title: 'Full Stack Developer & UI/UX Designer',
        description:
          'Passionate about creating beautiful, functional web experiences that make a difference.',
        primaryButtonText: 'View My Work',
        primaryButtonLink: '#projects',
        secondaryButtonText: 'Get In Touch',
        secondaryButtonLink: '#contact',
        profileImageUrl: '/logo.svg',
        socialLinks: {
          github: 'https://github.com/iwufrancis',
          linkedin: 'https://linkedin.com/in/iwufrancis',
          email: 'mailto:iwufrancischisom20@gmail.com',
        },
      },
    })
  }
}
