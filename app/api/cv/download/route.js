import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // CV data - you can move this to a database or config file later
    const cvData = {
      name: 'Iwu Francis Chisom',
      title: 'Full Stack Web Developer',
      email: 'iwufrancischisom20@gmail.com',
      phone: '+234 123 456 7890', // Add your actual phone number
      location: 'Nigeria',
      website: 'https://iwufrancis.com',
      linkedin: 'https://linkedin.com/in/iwufrancis',
      github: 'https://github.com/iwufrancis',
      
      summary: 'Passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional applications that solve real-world problems and make a difference.',
      
      skills: {
        frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
        tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code', 'Linux'],
        languages: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS']
      },
      
      experience: [
        {
          title: 'Full Stack Developer',
          company: 'Freelance',
          period: '2022 - Present',
          description: 'Developed full-stack web applications using React, Next.js, and Node.js. Built responsive, user-friendly interfaces and robust backend systems.',
          achievements: [
            'Built 20+ web applications for clients across various industries',
            'Improved application performance by 40% through code optimization',
            'Implemented modern development practices and CI/CD pipelines'
          ]
        },
        {
          title: 'Frontend Developer',
          company: 'Tech Solutions Inc',
          period: '2021 - 2022',
          description: 'Focused on creating responsive and interactive user interfaces using React and modern CSS frameworks.',
          achievements: [
            'Developed responsive web applications for mobile and desktop',
            'Collaborated with design team to implement pixel-perfect UIs',
            'Reduced page load times by 30% through optimization techniques'
          ]
        }
      ],
      
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          school: 'University of Technology',
          year: '2018 - 2022',
          description: 'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering'
        }
      ],
      
      projects: [
        {
          name: 'Portfolio Website',
          description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS',
          technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
          link: 'https://iwufrancis.com'
        },
        {
          name: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution with payment integration and admin dashboard',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          link: 'https://github.com/iwufrancis/ecommerce'
        }
      ]
    }

    // Generate HTML for CV
    const html = generateCVHTML(cvData)
    
    // Return HTML response that will be converted to PDF by the browser
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'inline; filename="Iwu_Francis_CV.html"'
      }
    })
    
  } catch (error) {
    console.error('Error generating CV:', error)
    return NextResponse.json(
      { error: 'Failed to generate CV' },
      { status: 500 }
    )
  }
}

function generateCVHTML(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            padding: 20px;
        }
        
        .cv-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 300;
        }
        
        .header .title {
            font-size: 1.3em;
            margin-bottom: 20px;
            opacity: 0.9;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section h2 {
            color: #667eea;
            font-size: 1.5em;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 2px solid #667eea;
        }
        
        .summary {
            font-size: 1.1em;
            line-height: 1.8;
            color: #555;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .skill-category h3 {
            color: #333;
            margin-bottom: 10px;
            font-size: 1.1em;
        }
        
        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .skill-tag {
            background: #f0f4ff;
            color: #667eea;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.9em;
            border: 1px solid #e0e7ff;
        }
        
        .experience-item, .education-item, .project-item {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .experience-item:last-child, .education-item:last-child, .project-item:last-child {
            border-bottom: none;
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
        }
        
        .item-title {
            font-size: 1.2em;
            font-weight: 600;
            color: #333;
        }
        
        .item-company {
            color: #667eea;
            font-weight: 500;
        }
        
        .item-period {
            color: #666;
            font-size: 0.9em;
        }
        
        .item-description {
            margin-bottom: 10px;
            color: #555;
        }
        
        .achievements {
            list-style: none;
        }
        
        .achievements li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 5px;
            color: #555;
        }
        
        .achievements li:before {
            content: "•";
            color: #667eea;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
        }
        
        .tech-tag {
            background: #e8f2ff;
            color: #2563eb;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8em;
        }
        
        .project-link {
            color: #667eea;
            text-decoration: none;
            font-size: 0.9em;
        }
        
        .project-link:hover {
            text-decoration: underline;
        }
        
        @media print {
            body {
                padding: 0;
            }
            
            .cv-container {
                box-shadow: none;
                border-radius: 0;
            }
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <div class="header">
            <h1>${data.name}</h1>
            <div class="title">${data.title}</div>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📧</span>
                    <span>${data.email}</span>
                </div>
                <div class="contact-item">
                    <span>📱</span>
                    <span>${data.phone}</span>
                </div>
                <div class="contact-item">
                    <span>📍</span>
                    <span>${data.location}</span>
                </div>
                <div class="contact-item">
                    <span>🌐</span>
                    <span>${data.website}</span>
                </div>
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Professional Summary</h2>
                <div class="summary">${data.summary}</div>
            </div>
            
            <div class="section">
                <h2>Technical Skills</h2>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h3>Frontend</h3>
                        <div class="skill-tags">
                            ${data.skills.frontend.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    <div class="skill-category">
                        <h3>Backend</h3>
                        <div class="skill-tags">
                            ${data.skills.backend.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    <div class="skill-category">
                        <h3>Tools & Technologies</h3>
                        <div class="skill-tags">
                            ${data.skills.tools.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                    <div class="skill-category">
                        <h3>Programming Languages</h3>
                        <div class="skill-tags">
                            ${data.skills.languages.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>Professional Experience</h2>
                ${data.experience.map(exp => `
                    <div class="experience-item">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${exp.title}</div>
                                <div class="item-company">${exp.company}</div>
                            </div>
                            <div class="item-period">${exp.period}</div>
                        </div>
                        <div class="item-description">${exp.description}</div>
                        <ul class="achievements">
                            ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            <div class="section">
                <h2>Education</h2>
                ${data.education.map(edu => `
                    <div class="education-item">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${edu.degree}</div>
                                <div class="item-company">${edu.school}</div>
                            </div>
                            <div class="item-period">${edu.year}</div>
                        </div>
                        <div class="item-description">${edu.description}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="section">
                <h2>Key Projects</h2>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <div class="item-header">
                            <div class="item-title">${project.name}</div>
                            ${project.link ? `<a href="${project.link}" class="project-link" target="_blank">View Project</a>` : ''}
                        </div>
                        <div class="item-description">${project.description}</div>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    
    <script>
        // Auto-trigger print dialog when page loads
        window.onload = function() {
            setTimeout(() => {
                window.print();
            }, 1000);
        };
    </script>
</body>
</html>
  `
}
