"use client";

import { useAdmin } from "@/contexts/admin-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  FileText, 
  Image, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Download,
  Save,
  Eye,
  Edit,
  Plus,
  Trash2
} from "lucide-react";

export default function ContentManagement() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("hero");
  const [isEditing, setIsEditing] = useState(false);

  // Sample data - in a real app, this would come from a database
  const [heroData, setHeroData] = useState({
    name: "John Doe",
    title: "Full Stack Web Developer",
    description: "I create beautiful, functional, and user-centered digital experiences that bring ideas to life. Passionate about clean code, modern technologies, and continuous learning.",
    cvUrl: "/cv.pdf",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "mailto:john@example.com"
    }
  });

  const [aboutData, setAboutData] = useState({
    title: "About Me",
    subtitle: "Passionate about creating digital solutions that make a difference",
    name: "Hello! I'm John Doe",
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
  });

  const [projectsData, setProjectsData] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["Next.js", "TypeScript", "Socket.io", "MongoDB", "Framer Motion"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
      technologies: ["React", "Chart.js", "OpenWeather API", "CSS Modules"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false
    }
  ]);

  const [contactData, setContactData] = useState({
    title: "Get In Touch",
    subtitle: "Have a project in mind or want to collaborate? I'd love to hear from you!",
    description: "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!",
    contactInfo: [
      { type: "email", value: "john@example.com", href: "mailto:john@example.com" },
      { type: "phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
      { type: "location", value: "San Francisco, CA", href: "#" }
    ],
    socialLinks: [
      { name: "GitHub", href: "https://github.com" },
      { name: "LinkedIn", href: "https://linkedin.com" },
      { name: "Twitter", href: "https://twitter.com" }
    ]
  });

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving content...", { heroData, aboutData, projectsData, contactData });
    setIsEditing(false);
    // Show success message
  };

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Conditional returns after all hooks
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Content Management</h1>
            <p className="text-muted-foreground mt-2">
              Edit and manage all content on your portfolio website
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => window.open("/", "_blank")}
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Preview Site</span>
            </Button>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>{isEditing ? "Cancel" : "Edit Mode"}</span>
            </Button>
            {isEditing && (
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="about">About Section</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Hero Section Editor */}
          <TabsContent value="hero" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Hero Section</span>
                </CardTitle>
                <CardDescription>
                  Edit the main hero section that visitors see first
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name
                      </label>
                      <Input
                        value={heroData.name}
                        onChange={(e) => setHeroData({...heroData, name: e.target.value})}
                        disabled={!isEditing}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Title
                      </label>
                      <Input
                        value={heroData.title}
                        onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                        disabled={!isEditing}
                        placeholder="Your professional title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        CV URL
                      </label>
                      <Input
                        value={heroData.cvUrl}
                        onChange={(e) => setHeroData({...heroData, cvUrl: e.target.value})}
                        disabled={!isEditing}
                        placeholder="/cv.pdf"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                      </label>
                      <Textarea
                        value={heroData.description}
                        onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                        disabled={!isEditing}
                        placeholder="Your professional description"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Social Links</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        GitHub URL
                      </label>
                      <Input
                        value={heroData.socialLinks.github}
                        onChange={(e) => setHeroData({
                          ...heroData, 
                          socialLinks: {...heroData.socialLinks, github: e.target.value}
                        })}
                        disabled={!isEditing}
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        LinkedIn URL
                      </label>
                      <Input
                        value={heroData.socialLinks.linkedin}
                        onChange={(e) => setHeroData({
                          ...heroData, 
                          socialLinks: {...heroData.socialLinks, linkedin: e.target.value}
                        })}
                        disabled={!isEditing}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        value={heroData.socialLinks.email}
                        onChange={(e) => setHeroData({
                          ...heroData, 
                          socialLinks: {...heroData.socialLinks, email: e.target.value}
                        })}
                        disabled={!isEditing}
                        placeholder="mailto:your@email.com"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section Editor */}
          <TabsContent value="about" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>About Section</span>
                </CardTitle>
                <CardDescription>
                  Edit your about section, skills, and experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Basic Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Section Title
                      </label>
                      <Input
                        value={aboutData.title}
                        onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subtitle
                      </label>
                      <Input
                        value={aboutData.subtitle}
                        onChange={(e) => setAboutData({...aboutData, subtitle: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Introduction
                    </label>
                    <Textarea
                      value={aboutData.name}
                      onChange={(e) => setAboutData({...aboutData, name: e.target.value})}
                      disabled={!isEditing}
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <Textarea
                      value={aboutData.description}
                      onChange={(e) => setAboutData({...aboutData, description: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Description
                    </label>
                    <Textarea
                      value={aboutData.description2}
                      onChange={(e) => setAboutData({...aboutData, description2: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {aboutData.stats.map((stat, index) => (
                      <div key={index} className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          {stat.label}
                        </label>
                        <Input
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...aboutData.stats];
                            newStats[index].value = e.target.value;
                            setAboutData({...aboutData, stats: newStats});
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Skills & Technologies</h4>
                  <div className="space-y-4">
                    {aboutData.skills.map((skill, index) => (
                      <div key={index} className="p-4 border border-border/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Input
                            value={skill.category}
                            onChange={(e) => {
                              const newSkills = [...aboutData.skills];
                              newSkills[index].category = e.target.value;
                              setAboutData({...aboutData, skills: newSkills});
                            }}
                            disabled={!isEditing}
                            className="font-semibold"
                          />
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newSkills = aboutData.skills.filter((_, i) => i !== index);
                                setAboutData({...aboutData, skills: newSkills});
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skill.technologies.map((tech, techIndex) => (
                            <Input
                              key={techIndex}
                              value={tech}
                              onChange={(e) => {
                                const newSkills = [...aboutData.skills];
                                newSkills[index].technologies[techIndex] = e.target.value;
                                setAboutData({...aboutData, skills: newSkills});
                              }}
                              disabled={!isEditing}
                              className="w-auto min-w-[100px]"
                            />
                          ))}
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newSkills = [...aboutData.skills];
                                newSkills[index].technologies.push("");
                                setAboutData({...aboutData, skills: newSkills});
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setAboutData({
                            ...aboutData,
                            skills: [...aboutData.skills, { category: "", technologies: [""] }]
                          });
                        }}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill Category
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Editor */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Image className="h-5 w-5" />
                  <span>Projects Management</span>
                </CardTitle>
                <CardDescription>
                  Add, edit, and manage your portfolio projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectsData.map((project, index) => (
                    <div key={project.id} className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-foreground">
                          Project {index + 1}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={project.featured}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].featured = e.target.checked;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                            />
                            <span className="text-sm text-muted-foreground">Featured</span>
                          </label>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newProjects = projectsData.filter((_, i) => i !== index);
                                setProjectsData(newProjects);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Title
                            </label>
                            <Input
                              value={project.title}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].title = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Description
                            </label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].description = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                              rows={3}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Live URL
                            </label>
                            <Input
                              value={project.liveUrl}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].liveUrl = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              GitHub URL
                            </label>
                            <Input
                              value={project.githubUrl}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].githubUrl = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Technologies (comma-separated)
                            </label>
                            <Input
                              value={project.technologies.join(", ")}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].technologies = e.target.value.split(", ");
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                              placeholder="React, Node.js, MongoDB"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newProject = {
                          id: Date.now(),
                          title: "New Project",
                          description: "Project description",
                          technologies: ["React", "Node.js"],
                          liveUrl: "https://example.com",
                          githubUrl: "https://github.com",
                          featured: false
                        };
                        setProjectsData([...projectsData, newProject]);
                      }}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Project
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Editor */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Contact Section</span>
                </CardTitle>
                <CardDescription>
                  Edit contact information and social links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Section Title
                    </label>
                    <Input
                      value={contactData.title}
                      onChange={(e) => setContactData({...contactData, title: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subtitle
                    </label>
                    <Input
                      value={contactData.subtitle}
                      onChange={(e) => setContactData({...contactData, subtitle: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <Textarea
                      value={contactData.description}
                      onChange={(e) => setContactData({...contactData, description: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Contact Information</h4>
                  <div className="space-y-4">
                    {contactData.contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-24">
                          <Input
                            value={info.type}
                            onChange={(e) => {
                              const newContactInfo = [...contactData.contactInfo];
                              newContactInfo[index].type = e.target.value;
                              setContactData({...contactData, contactInfo: newContactInfo});
                            }}
                            disabled={!isEditing}
                            placeholder="Type"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            value={info.value}
                            onChange={(e) => {
                              const newContactInfo = [...contactData.contactInfo];
                              newContactInfo[index].value = e.target.value;
                              setContactData({...contactData, contactInfo: newContactInfo});
                            }}
                            disabled={!isEditing}
                            placeholder="Value"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            value={info.href}
                            onChange={(e) => {
                              const newContactInfo = [...contactData.contactInfo];
                              newContactInfo[index].href = e.target.value;
                              setContactData({...contactData, contactInfo: newContactInfo});
                            }}
                            disabled={!isEditing}
                            placeholder="Link"
                          />
                        </div>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newContactInfo = contactData.contactInfo.filter((_, i) => i !== index);
                              setContactData({...contactData, contactInfo: newContactInfo});
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setContactData({
                            ...contactData,
                            contactInfo: [...contactData.contactInfo, { type: "", value: "", href: "" }]
                          });
                        }}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Contact Info
                      </Button>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Social Links</h4>
                  <div className="space-y-4">
                    {contactData.socialLinks.map((social, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-32">
                          <Input
                            value={social.name}
                            onChange={(e) => {
                              const newSocialLinks = [...contactData.socialLinks];
                              newSocialLinks[index].name = e.target.value;
                              setContactData({...contactData, socialLinks: newSocialLinks});
                            }}
                            disabled={!isEditing}
                            placeholder="Platform"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            value={social.href}
                            onChange={(e) => {
                              const newSocialLinks = [...contactData.socialLinks];
                              newSocialLinks[index].href = e.target.value;
                              setContactData({...contactData, socialLinks: newSocialLinks});
                            }}
                            disabled={!isEditing}
                            placeholder="URL"
                          />
                        </div>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newSocialLinks = contactData.socialLinks.filter((_, i) => i !== index);
                              setContactData({...contactData, socialLinks: newSocialLinks});
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setContactData({
                            ...contactData,
                            socialLinks: [...contactData.socialLinks, { name: "", href: "" }]
                          });
                        }}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Social Link
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
