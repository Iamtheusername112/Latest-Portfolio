import { NextResponse } from 'next/server';
import { ProjectsService } from '@/lib/db/services/projects-service';

export async function GET() {
  try {
    const projects = await ProjectsService.getAllProjects();
    
    if (!projects || projects.length === 0) {
      return NextResponse.json({
        projects: [
          {
            id: 1,
            title: "Portfolio Website",
            description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS.",
            imageUrl: "/logo.svg",
            technologies: ["Next.js", "React", "Tailwind CSS"],
            liveUrl: "https://iwufrancis.com",
            githubUrl: "https://github.com/iwufrancis/portfolio",
            featured: true
          },
          {
            id: 2,
            title: "E-commerce Platform",
            description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
            imageUrl: "/logo.svg",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            liveUrl: "#",
            githubUrl: "#",
            featured: true
          }
        ]
      });
    }

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects data:', error);
    
    // Return fallback data instead of error
    return NextResponse.json({
      projects: [
        {
          id: 1,
          title: "Portfolio Website",
          description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS.",
          imageUrl: "/logo.svg",
          technologies: ["Next.js", "React", "Tailwind CSS"],
          liveUrl: "https://iwufrancis.com",
          githubUrl: "https://github.com/iwufrancis/portfolio",
          featured: true
        },
        {
          id: 2,
          title: "E-commerce Platform",
          description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
          imageUrl: "/logo.svg",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          liveUrl: "#",
          githubUrl: "#",
          featured: true
        }
      ]
    });
  }
}
