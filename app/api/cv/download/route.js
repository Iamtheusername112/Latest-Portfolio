import { NextResponse } from 'next/server'
import { CVService } from '@/lib/db/services/cv-service'

export async function GET() {
  try {
    // Fetch CV data from database
    const cvData = await CVService.getCVContent()
    
    if (!cvData) {
      return NextResponse.json(
        { error: 'CV not found' },
        { status: 404 }
      )
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
    <title>${data.fullName} - CV</title>
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
        
        .certification-item, .language-item {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .certification-item:last-child, .language-item:last-child {
            border-bottom: none;
        }
        
        .languages-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .language-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background: #f8f9fa;
            border-radius: 6px;
        }
        
        .language-name {
            font-weight: 600;
            color: #333;
        }
        
        .language-proficiency {
            color: #666;
            font-size: 0.9em;
        }
        
        @media print {
            @page {
                size: A4;
                margin: 0.5cm;
            }
            
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            body {
                padding: 0;
                margin: 0;
                font-size: 10pt;
            }
            
            .cv-container {
                box-shadow: none;
                border-radius: 0;
                max-width: 100%;
                margin: 0;
                page-break-inside: avoid;
            }
            
            /* Compact header for print */
            .header {
                padding: 15px 20px;
                page-break-inside: avoid;
            }
            
            .header h1 {
                font-size: 1.8em;
                margin-bottom: 5px;
            }
            
            .header .title {
                font-size: 1em;
                margin-bottom: 10px;
            }
            
            .contact-info {
                gap: 10px;
                margin-top: 10px;
                font-size: 0.85em;
            }
            
            /* Compact content */
            .content {
                padding: 15px 20px;
            }
            
            .section {
                margin-bottom: 12px;
                page-break-inside: avoid;
            }
            
            .section h2 {
                font-size: 1.1em;
                margin-bottom: 8px;
                padding-bottom: 3px;
            }
            
            .summary {
                font-size: 0.9em;
                line-height: 1.4;
                margin-bottom: 10px;
            }
            
            /* Compact skills */
            .skills-grid {
                gap: 10px;
            }
            
            .skill-category {
                margin-bottom: 8px;
            }
            
            .skill-category h3 {
                font-size: 0.95em;
                margin-bottom: 5px;
            }
            
            .skill-tags {
                gap: 4px;
            }
            
            .skill-tag {
                font-size: 0.75em;
                padding: 2px 6px;
            }
            
            /* Compact experience/education items */
            .experience-item,
            .education-item,
            .project-item,
            .certification-item,
            .language-item {
                margin-bottom: 8px;
                padding-bottom: 8px;
                page-break-inside: avoid;
            }
            
            .item-header {
                margin-bottom: 4px;
            }
            
            .item-title {
                font-size: 0.95em;
            }
            
            .item-company {
                font-size: 0.85em;
            }
            
            .item-period {
                font-size: 0.8em;
            }
            
            .item-description {
                font-size: 0.8em;
                line-height: 1.3;
                margin-top: 4px;
            }
            
            /* Compact achievements */
            .achievements {
                margin-top: 4px;
                padding-left: 15px;
            }
            
            .achievements li {
                font-size: 0.75em;
                line-height: 1.3;
                margin-bottom: 2px;
            }
            
            /* Compact projects */
            .project-tech {
                gap: 4px;
                margin-top: 4px;
            }
            
            .tech-tag {
                font-size: 0.7em;
                padding: 1px 6px;
            }
            
            /* Compact languages */
            .languages-grid {
                gap: 6px;
            }
            
            .language-item {
                padding: 4px 8px;
            }
            
            .language-name {
                font-size: 0.85em;
            }
            
            .language-proficiency {
                font-size: 0.75em;
            }
            
            /* Hide links that don't work on printed paper */
            .project-link {
                display: none !important;
            }
            
            /* Hide any other interactive elements */
            a[target="_blank"] {
                display: none !important;
            }
            
            /* Prevent page breaks */
            .section:last-child {
                margin-bottom: 0;
            }
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <div class="header">
            <h1>${data.fullName}</h1>
            <div class="title">${data.title}</div>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📧</span>
                    <span>${data.email}</span>
                </div>
                ${data.phone ? `<div class="contact-item">
                    <span>📱</span>
                    <span>${data.phone}</span>
                </div>` : ''}
                ${data.location ? `<div class="contact-item">
                    <span>📍</span>
                    <span>${data.location}</span>
                </div>` : ''}
                ${data.website ? `<div class="contact-item">
                    <span>🌐</span>
                    <span>${data.website}</span>
                </div>` : ''}
                ${data.linkedin ? `<div class="contact-item">
                    <span>💼</span>
                    <span>${data.linkedin}</span>
                </div>` : ''}
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
                    ${data.technicalSkills?.frontend && Array.isArray(data.technicalSkills.frontend) && data.technicalSkills.frontend.length > 0 ? `<div class="skill-category">
                        <h3>Frontend</h3>
                        <div class="skill-tags">
                            ${data.technicalSkills.frontend.map(skill => {
                                const skillName = typeof skill === 'string' ? skill : (skill.name || skill)
                                return `<span class="skill-tag">${skillName}</span>`
                            }).join('')}
                        </div>
                    </div>` : ''}
                    ${data.technicalSkills?.backend && Array.isArray(data.technicalSkills.backend) && data.technicalSkills.backend.length > 0 ? `<div class="skill-category">
                        <h3>Backend</h3>
                        <div class="skill-tags">
                            ${data.technicalSkills.backend.map(skill => {
                                const skillName = typeof skill === 'string' ? skill : (skill.name || skill)
                                return `<span class="skill-tag">${skillName}</span>`
                            }).join('')}
                        </div>
                    </div>` : ''}
                    ${data.technicalSkills?.tools && Array.isArray(data.technicalSkills.tools) && data.technicalSkills.tools.length > 0 ? `<div class="skill-category">
                        <h3>Tools & Technologies</h3>
                        <div class="skill-tags">
                            ${data.technicalSkills.tools.map(skill => {
                                const skillName = typeof skill === 'string' ? skill : (skill.name || skill)
                                return `<span class="skill-tag">${skillName}</span>`
                            }).join('')}
                        </div>
                    </div>` : ''}
                    ${data.technicalSkills?.languages && Array.isArray(data.technicalSkills.languages) && data.technicalSkills.languages.length > 0 ? `<div class="skill-category">
                        <h3>Programming Languages</h3>
                        <div class="skill-tags">
                            ${data.technicalSkills.languages.map(skill => {
                                const skillName = typeof skill === 'string' ? skill : (skill.name || skill)
                                return `<span class="skill-tag">${skillName}</span>`
                            }).join('')}
                        </div>
                    </div>` : ''}
                </div>
            </div>
            
            ${data.softSkills && Array.isArray(data.softSkills) && data.softSkills.length > 0 ? `<div class="section">
                <h2>Soft Skills</h2>
                <div class="skill-tags">
                    ${data.softSkills.map(skill => {
                        const skillName = typeof skill === 'string' ? skill : (skill.name || skill)
                        return `<span class="skill-tag">${skillName}</span>`
                    }).join('')}
                </div>
            </div>` : ''}
            
            ${data.experience && data.experience.length > 0 ? `<div class="section">
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
                        ${exp.achievements && exp.achievements.length > 0 ? `<ul class="achievements">
                            ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>` : ''}
                    </div>
                `).join('')}
            </div>` : ''}
            
            ${data.education && data.education.length > 0 ? `<div class="section">
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
                        ${edu.description ? `<div class="item-description">${edu.description}</div>` : ''}
                    </div>
                `).join('')}
            </div>` : ''}
            
            ${data.projects && data.projects.length > 0 ? `<div class="section">
                <h2>Key Projects</h2>
                ${data.projects.map(project => `
                    <div class="project-item">
                        <div class="item-header">
                            <div class="item-title">${project.name}</div>
                            ${project.link ? `<a href="${project.link}" class="project-link" target="_blank">View Project</a>` : ''}
                        </div>
                        <div class="item-description">${project.description}</div>
                        ${project.technologies && project.technologies.length > 0 ? `<div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>` : ''}
                    </div>
                `).join('')}
            </div>` : ''}
            
            ${data.certifications && data.certifications.length > 0 ? `<div class="section">
                <h2>Certifications</h2>
                ${data.certifications.map(cert => `
                    <div class="certification-item">
                        <div class="item-header">
                            <div>
                                <div class="item-title">${cert.name}</div>
                                <div class="item-company">${cert.issuer}</div>
                            </div>
                            <div class="item-period">${cert.date}</div>
                        </div>
                        ${cert.credentialId ? `<div class="item-description">Credential ID: ${cert.credentialId}</div>` : ''}
                    </div>
                `).join('')}
            </div>` : ''}
            
            ${data.languages && Array.isArray(data.languages) && data.languages.length > 0 ? `<div class="section">
                <h2>Languages</h2>
                <div class="languages-grid">
                    ${data.languages.map(lang => {
                        // Handle both object format {language, proficiency} and string format
                        const languageName = typeof lang === 'string' ? lang : (lang.language || lang.name || 'Unknown')
                        const proficiencyValue = typeof lang === 'string' ? 'B2' : (lang.proficiency || 'B2')
                        
                        // CEFR levels mapping
                        const cefrLevels = {
                            'A1': 'A1 (Beginner)',
                            'A2': 'A2 (Elementary)',
                            'B1': 'B1 (Intermediate)',
                            'B2': 'B2 (Upper Intermediate)',
                            'C1': 'C1 (Advanced)',
                            'C2': 'C2 (Proficient)'
                        }
                        
                        // Handle both uppercase and lowercase CEFR levels
                        const proficiencyUpper = proficiencyValue.toUpperCase()
                        const proficiencyLabel = cefrLevels[proficiencyUpper] || proficiencyUpper
                        
                        return `
                        <div class="language-item">
                            <span class="language-name">${languageName}</span>
                            <span class="language-proficiency">${proficiencyLabel}</span>
                        </div>
                        `
                    }).join('')}
                </div>
            </div>` : ''}
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
