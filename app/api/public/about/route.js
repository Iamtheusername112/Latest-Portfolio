import { NextResponse } from 'next/server';
import { AboutService } from '@/lib/db/services/about-service';

export async function GET() {
  try {
    const about = await AboutService.getAboutContent();
    
    if (!about) {
      return NextResponse.json({
        about: {
          title: "About Me",
          content: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems.",
          skills: [
            "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
            "Python", "PostgreSQL", "MongoDB", "AWS", "Docker"
          ],
          experience: "5+ years",
          projects: "50+",
          clients: "20+"
        }
      });
    }

    return NextResponse.json({ about });
  } catch (error) {
    console.error('Error fetching about data:', error);
    
    // Return fallback data instead of error
    return NextResponse.json({
      about: {
        title: "About Me",
        content: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems.",
        skills: [
          "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
          "Python", "PostgreSQL", "MongoDB", "AWS", "Docker"
        ],
        experience: "5+ years",
        projects: "50+",
        clients: "20+"
      }
    });
  }
}
