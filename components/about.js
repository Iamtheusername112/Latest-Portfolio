"use client";

import { motion } from "framer-motion";
import { Code, Database, Globe, Smartphone, Zap, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const skills = [
    {
      category: "Frontend",
      icon: <Globe className="h-6 w-6" />,
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Backend",
      icon: <Database className="h-6 w-6" />,
      technologies: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"]
    },
    {
      category: "Mobile",
      icon: <Smartphone className="h-6 w-6" />,
      technologies: ["React Native", "Expo", "iOS", "Android"]
    },
    {
      category: "Tools",
      icon: <Code className="h-6 w-6" />,
      technologies: ["Git", "Docker", "AWS", "Vercel", "Figma"]
    }
  ];

  const experiences = [
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
  ];

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

  return (
    <section id="about" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-50" />
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate about creating digital solutions that make a difference
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* About Text */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">
                  Hello! I'm Iwu Francis
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a passionate full-stack developer with over 5 years of experience
                  building web and mobile applications. I love turning complex problems
                  into simple, beautiful, and intuitive solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or sharing knowledge with the
                  developer community.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 glass rounded-lg border border-border/50 card-premium">
                  <div className="text-2xl font-bold gradient-text">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4 glass rounded-lg border border-border/50 card-premium">
                  <div className="text-2xl font-bold gradient-text">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center p-4 glass rounded-lg border border-border/50 card-premium">
                  <div className="text-2xl font-bold gradient-text">30+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
                <div className="text-center p-4 glass rounded-lg border border-border/50 card-premium">
                  <div className="text-2xl font-bold gradient-text">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Skills & Technologies</h3>
              <div className="grid gap-4">
                {skills.map((skill, index) => (
                  <Card key={index} className="p-4 glass border-border/50 card-premium">
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-primary animate-glow">{skill.icon}</div>
                        <h4 className="font-semibold text-foreground">{skill.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.technologies.map((tech, techIndex) => (
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
            </motion.div>
          </div>

          {/* Experience */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="p-6 glass border-border/50 card-premium">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {exp.title}
                        </h4>
                        <p className="text-primary font-medium gradient-text">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground mt-1 sm:mt-0 px-3 py-1 bg-muted/50 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
