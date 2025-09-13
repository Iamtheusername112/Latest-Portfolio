import { NextResponse } from 'next/server';
import { HeroService } from '@/lib/db/services/hero-service';

export async function GET() {
  try {
    const heroContent = await HeroService.getHeroContent();
    return NextResponse.json(heroContent);
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero content' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const updatedContent = await HeroService.updateHeroContent(data);
    return NextResponse.json(updatedContent);
  } catch (error) {
    console.error('Error updating hero content:', error);
    return NextResponse.json(
      { error: 'Failed to update hero content' },
      { status: 500 }
    );
  }
}
