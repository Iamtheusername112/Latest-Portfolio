"use client";

import { motion } from "framer-motion";
import { Code, Database, Globe, Smartphone, Zap, Users, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const DynamicAbout = () => {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        console.log('Fetching about data...');
        const response = await fetch('/api/about');
        console.log('Response status:', response.status);
        console.log('Content-Type:', response.headers.get('content-type'));
        
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('About data received:', data);
            setAboutData(data);
          } else {
            console.error('Response is not JSON, content-type:', contentType);
            const text = await response.text();
            console.error('Response text:', text.substring(0, 200));
          }
        } else {
          console.error('Failed to fetch about data, status:', response.status);
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            try {
              const errorData = await response.json();
              console.error('Error response (JSON):', errorData);
            } catch (jsonError) {
              console.error('Failed to parse error response as JSON:', jsonError);
              const errorText = await response.text();
              console.error('Error response (text):', errorText.substring(0, 200));
            }
          } else {
            const errorText = await response.text();
            console.error('Error response (text):', errorText.substring(0, 200));
          }
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, [refreshKey]);

  const handleRefresh = () => {
    console.log('Refreshing about data...');
    setRefreshKey(prev => prev + 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const getSkillIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return <Globe className="h-6 w-6" />;
      case 'backend':
        return <Database className="h-6 w-6" />;
      case 'mobile':
        return <Smartphone className="h-6 w-6" />;
      case 'tools':
        return <Code className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-48 mx-auto mb-4"></div>
                <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="animate-pulse">
                  <div className="h-6 bg-muted rounded w-64 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="animate-pulse">
                  <div className="h-6 bg-muted rounded w-48 mb-4"></div>
                  <div className="grid gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-20 bg-muted rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback to default data if no data is available
  const data = aboutData || {
    title: "About Me",
    subtitle: "Passionate about creating digital solutions that make a difference",
    name: "Hello! I'm Iwu Francis",
    description: "I'm a passionate full-stack developer with over 5 years of experience building web and mobile applications. I love turning complex problems into simple, beautiful, and intuitive solutions.",
    description2: "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.",
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Projects Completed", value: "50+" },
      { label: "Happy Clients", value: "30+" },
      { label: "Client Satisfaction", value: "100%" }
    ],
    skills: [
      {
        category: "Frontend",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
      },
      {
        category: "Backend",
        technologies: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"]
      },
      {
        category: "Mobile",
        technologies: ["React Native", "Expo", "iOS", "Android"]
      },
      {
        category: "Tools",
        technologies: ["Git", "Docker", "AWS", "Vercel", "Figma"]
      }
    ],
    experiences: [
      {
        title: "Senior Full Stack Developer",
        company: "TechCorp Inc.",
        period: "2022 - Present",
        description: "Led development of scalable web applications serving 100k+ users. Implemented microservices architecture and improved performance by 40%."
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        period: "2020 - 2022",
        description: "Built and maintained multiple client projects using React, Node.js, and cloud technologies. Collaborated with cross-functional teams to deliver high-quality products."
      },
      {
        title: "Frontend Developer",
        company: "WebAgency",
        period: "2019 - 2020",
        description: "Developed responsive web applications and improved user experience. Worked with designers to implement pixel-perfect interfaces."
      }
    ]
  };

  return (
    <section id="about" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern or Image */}
      {data.backgroundImageUrl ? (
        <div className="absolute inset-0">
          <img 
            src={data.backgroundImageUrl} 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-pattern opacity-50" />
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                {data.title}
              </h2>
              <button
                onClick={handleRefresh}
                className="p-2 rounded-full hover:bg-muted/50 transition-colors"
                title="Refresh data from admin"
              >
                <RefreshCw className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            {data.subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {data.subtitle}
              </p>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                {data.name && (
                  <h3 className="text-2xl font-semibold text-foreground">
                    {data.name}
                  </h3>
                )}
                {data.profileImageUrl && (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                    <img 
                      src={data.profileImageUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {data.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {data.description}
                  </p>
                )}
                {data.description2 && (
                  <p className="text-muted-foreground leading-relaxed">
                    {data.description2}
                  </p>
                )}
              </div>

              {/* Stats */}
              {data.stats && data.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {data.stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 glass rounded-lg border border-border/50 card-premium">
                      <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Skills & Technologies</h3>
              {data.skills && data.skills.length > 0 ? (
                <div className="grid gap-4">
                  {data.skills.map((skill, index) => (
                    <Card key={index} className="p-4 glass border-border/50 card-premium">
                      <CardContent className="p-0">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="text-primary animate-glow">{getSkillIcon(skill.category)}</div>
                          <h4 className="font-semibold text-foreground">{skill.category}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skill.technologies && skill.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No skills data available.</p>
              )}
            </motion.div>
          </div>

          {/* Experience */}
          {data.experiences && data.experiences.length > 0 && (
            <motion.div variants={itemVariants} className="mt-16">
              <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
                Professional Experience
              </h3>
              <div className="space-y-6">
                {data.experiences.map((exp, index) => (
                  <Card key={index} className="p-6 glass border-border/50 card-premium">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">
                            {exp.title}
                          </h4>
                          <p className="text-primary font-medium gradient-text">{exp.company}</p>
                        </div>
                        {exp.period && (
                          <span className="text-sm text-muted-foreground mt-1 sm:mt-0 px-3 py-1 bg-muted/50 rounded-full">
                            {exp.period}
                          </span>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-muted-foreground">{exp.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DynamicAbout;
