import { NextResponse } from 'next/server';
import { HeroService } from '@/lib/db/services/hero-service';

export async function GET() {
  try {
    console.log('Testing hero service...');
    
    // Try to get hero content
    const hero = await HeroService.getHeroContent();
    console.log('Hero content:', hero);
    
    // If no hero content exists, create initial content
    if (!hero) {
      console.log('No hero content found, creating initial...');
      const newHero = await HeroService.createInitialHeroContent();
      console.log('Created hero content:', newHero);
      return NextResponse.json({ 
        success: true, 
        message: 'Initial hero content created',
        hero: newHero 
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Hero content found',
      hero 
    });
  } catch (error) {
    console.error('Error in test-hero:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}
