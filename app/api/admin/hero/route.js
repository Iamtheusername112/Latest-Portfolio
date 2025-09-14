import { NextResponse } from 'next/server';
import { HeroService } from '@/lib/db/services/hero-service';

export async function GET() {
  try {
    const hero = await HeroService.getHeroContent();
    return NextResponse.json({ hero });
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const heroData = await request.json();

    // Basic validation
    if (!heroData.name || !heroData.title || !heroData.description) {
      return NextResponse.json({ 
        error: 'Name, title, and description are required' 
      }, { status: 400 });
    }

    const updatedHero = await HeroService.updateHeroContent(heroData);
    return NextResponse.json({ hero: updatedHero });
  } catch (error) {
    console.error('Error updating hero content:', error);
    return NextResponse.json({ 
      error: 'Failed to update hero content' 
    }, { status: 500 });
  }
}