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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Trash2,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  XCircle
} from "lucide-react";

export default function ContentManagement() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("hero");
  const [isEditing, setIsEditing] = useState(false);

  // Database state
  const [heroData, setHeroData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [mediaSelectorType, setMediaSelectorType] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [aboutData, setAboutData] = useState({
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
  });

  const [projectsData, setProjectsData] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      isPublic: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["Next.js", "TypeScript", "Socket.io", "MongoDB", "Framer Motion"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      isPublic: true
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

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        
        // Fetch hero data
        const heroResponse = await fetch('/api/admin/hero');
        if (heroResponse.ok) {
          const hero = await heroResponse.json();
          // Only update if we got valid data, otherwise keep the default values
          if (hero && typeof hero === 'object') {
            setHeroData(hero);
          }
        }
        
        // Fetch about data
        const aboutResponse = await fetch('/api/admin/about');
        if (aboutResponse.ok) {
          const about = await aboutResponse.json();
          // Only update if we got valid data, otherwise keep the default values
          if (about && typeof about === 'object') {
            setAboutData(about);
          }
        }
        
        // Fetch projects data
        const projectsResponse = await fetch('/api/admin/projects');
        if (projectsResponse.ok) {
          const projects = await projectsResponse.json();
          console.log('Loaded projects data from API:', projects);
          projects.forEach((project, index) => {
            console.log(`Project ${index}:`, {
              id: project.id,
              title: project.title,
              imageUrl: project.imageUrl,
              isPublic: project.isPublic
            });
          });
          // Only update if we got valid data, otherwise keep the default values
          if (projects && Array.isArray(projects)) {
            setProjectsData(projects);
          }
        }
        
        // Fetch contact data
        const contactResponse = await fetch('/api/admin/contact');
        if (contactResponse.ok) {
          const contact = await contactResponse.json();
          // Only update if we got valid data, otherwise keep the default values
          if (contact && typeof contact === 'object') {
            setContactData(contact);
          }
        }
        
        // Fetch media files
        const mediaResponse = await fetch('/api/admin/media');
        if (mediaResponse.ok) {
          const media = await mediaResponse.json();
          if (Array.isArray(media)) {
            setMediaFiles(media);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveMessage('');
      setIsEditing(false);
      
      // Save hero data
      if (heroData) {
        await fetch('/api/admin/hero', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(heroData)
        });
      }
      
      // Save about data
      if (aboutData) {
        await fetch('/api/admin/about', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(aboutData)
        });
      }
      
      // Save contact data
      if (contactData) {
        await fetch('/api/admin/contact', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData)
        });
      }
      
      // Save projects data
      if (projectsData && projectsData.length > 0) {
        console.log('Saving projects data:', projectsData);
        
        // Save each project individually
        for (let i = 0; i < projectsData.length; i++) {
          const project = projectsData[i];
          console.log(`Processing project ${i}:`, {
            id: project.id,
            title: project.title,
            imageUrl: project.imageUrl,
            isPublic: project.isPublic
          });
          try {
            // Check if this is a new project (temporary ID from Date.now())
            if (project.id && project.id > 1000000000000) { // Date.now() generates numbers > 1 trillion
              // This is a new project with temporary ID, create it
              console.log(`Creating new project:`, project.title);
              const { id, ...projectData } = project; // Remove temporary ID
              console.log('Sending project data to API:', projectData);
              const response = await fetch('/api/admin/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
              });
              
              if (response.ok) {
                const createdProject = await response.json();
                console.log(`Created project with ID ${createdProject.id}:`, createdProject.title);
                // Update the local state with the real database ID
                projectsData[i] = createdProject;
              } else {
                console.error(`Failed to create project:`, response.status);
                const errorText = await response.text();
                console.error(`Error details:`, errorText);
              }
            } else if (project.id && project.id > 0) {
              // Update existing project with real database ID
              console.log(`Updating project ${project.id}:`, project.title);
              console.log('Project imageUrl before sending to API:', project.imageUrl);
              console.log('Sending update data to API:', project);
              const response = await fetch(`/api/admin/projects/${project.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project)
              });
              
              if (response.ok) {
                const updatedProject = await response.json();
                console.log(`Updated project ${project.id}:`, updatedProject.title);
                projectsData[i] = updatedProject;
              } else {
                console.error(`Failed to update project ${project.id}:`, response.status);
                const errorText = await response.text();
                console.error(`Error details:`, errorText);
              }
            } else {
              // Create new project without ID
              console.log(`Creating new project:`, project.title);
              const response = await fetch('/api/admin/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project)
              });
              
              if (response.ok) {
                const createdProject = await response.json();
                console.log(`Created project with ID ${createdProject.id}:`, createdProject.title);
                projectsData[i] = createdProject;
              } else {
                console.error(`Failed to create project:`, response.status);
                const errorText = await response.text();
                console.error(`Error details:`, errorText);
              }
            }
          } catch (error) {
            console.error(`Error saving project ${project.title}:`, error);
          }
        }
        
        // Update the local state with the updated projects data
        setProjectsData([...projectsData]);
        
        console.log('Projects saved successfully!');
        setSaveMessage('Projects saved successfully!');
      }
      
      console.log("Content saved successfully!");
      setSaveMessage('All content saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
      
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveMessage('Error saving content. Please try again.');
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleMediaSelect = (imageUrl, type) => {
    console.log('Media selected:', { imageUrl, type, mediaSelectorType });
    
    if (type === 'profileImage') {
      setAboutData({...aboutData, profileImageUrl: imageUrl});
    } else if (type === 'backgroundImage') {
      setAboutData({...aboutData, backgroundImageUrl: imageUrl});
    } else if (type && type.startsWith('projectImage_')) {
      // Handle project image selection
      const projectIndex = parseInt(type.split('_')[1]); // Extract project index from type
      console.log('Setting project image:', { projectIndex, imageUrl });
      const newProjects = [...projectsData];
      newProjects[projectIndex].imageUrl = imageUrl;
      setProjectsData(newProjects);
      console.log('Updated projects data:', newProjects);
    }
    setShowMediaSelector(false);
    setMediaSelectorType(null);
  };

  const openMediaSelector = (type) => {
    setMediaSelectorType(type);
    setShowMediaSelector(true);
  };

  // Project status and priority options
  const projectStatuses = [
    { value: 'planning', label: 'Planning', icon: Target, color: 'bg-blue-500 text-white border-blue-600' },
    { value: 'in_progress', label: 'In Progress', icon: Play, color: 'bg-yellow-500 text-white border-yellow-600' },
    { value: 'testing', label: 'Testing', icon: AlertCircle, color: 'bg-orange-500 text-white border-orange-600' },
    { value: 'deployed', label: 'Deployed', icon: CheckCircle, color: 'bg-green-500 text-white border-green-600' },
    { value: 'completed', label: 'Completed', icon: Award, color: 'bg-purple-500 text-white border-purple-600' },
    { value: 'on_hold', label: 'On Hold', icon: Pause, color: 'bg-gray-500 text-white border-gray-600' },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'bg-red-500 text-white border-red-600' }
  ];

  const projectPriorities = [
    { value: 'low', label: 'Low', color: 'bg-green-500 text-white border-green-600' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-500 text-white border-yellow-600' },
    { value: 'high', label: 'High', color: 'bg-orange-500 text-white border-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-500 text-white border-red-600' }
  ];

  const projectCategories = [
    'Web Application',
    'Mobile Application',
    'Desktop Application',
    'API/Backend',
    'Database Design',
    'UI/UX Design',
    'DevOps/Infrastructure',
    'Machine Learning',
    'Data Analysis',
    'Other'
  ];

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

  if (isLoadingData) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading content...</p>
          </div>
        </div>
      </AdminLayout>
    );
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
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </Button>
            )}
            {saveMessage && (
              <div className={`px-3 py-1 rounded-md text-sm ${
                saveMessage.includes('Error') 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {saveMessage}
              </div>
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
                        value={heroData?.name || ""}
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
                        value={heroData?.title || ""}
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
                        value={heroData?.cvUrl || ""}
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
                        value={heroData?.description || ""}
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
                        value={heroData?.socialLinks?.github || ""}
                        onChange={(e) => setHeroData({
                          ...heroData, 
                          socialLinks: {...heroData?.socialLinks, github: e.target.value}
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
                        value={heroData?.socialLinks?.linkedin || ""}
                        onChange={(e) => setHeroData({
                          ...heroData, 
                          socialLinks: {...heroData?.socialLinks, linkedin: e.target.value}
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
                        value={heroData?.socialLinks?.email || ""}
                        onChange={(e) => setHeroData({
                          ...heroData, 
                          socialLinks: {...heroData?.socialLinks, email: e.target.value}
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
                        value={aboutData?.title || ""}
                        onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subtitle
                      </label>
                      <Input
                        value={aboutData?.subtitle || ""}
                        onChange={(e) => setAboutData({...aboutData, subtitle: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  {/* Images */}
                  <div className="space-y-4">
                    <h5 className="text-md font-medium text-foreground">Images</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Profile Image */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Profile Image
                        </label>
                        <div className="space-y-2">
                          {aboutData?.profileImageUrl && (
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border/50">
                              <img 
                                src={aboutData.profileImageUrl} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex space-x-2">
                            <Input
                              value={aboutData?.profileImageUrl || ""}
                              onChange={(e) => setAboutData({...aboutData, profileImageUrl: e.target.value})}
                              disabled={!isEditing}
                              placeholder="Profile image URL"
                              className="flex-1"
                            />
                            {isEditing && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => openMediaSelector('profileImage')}
                              >
                                <Image className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Background Image */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Background Image
                        </label>
                        <div className="space-y-2">
                          {aboutData?.backgroundImageUrl && (
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border/50">
                              <img 
                                src={aboutData.backgroundImageUrl} 
                                alt="Background" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex space-x-2">
                            <Input
                              value={aboutData?.backgroundImageUrl || ""}
                              onChange={(e) => setAboutData({...aboutData, backgroundImageUrl: e.target.value})}
                              disabled={!isEditing}
                              placeholder="Background image URL"
                              className="flex-1"
                            />
                            {isEditing && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => openMediaSelector('backgroundImage')}
                              >
                                <Image className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Introduction
                    </label>
                    <Textarea
                      value={aboutData?.name || ""}
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
                      value={aboutData?.description || ""}
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
                      value={aboutData?.description2 || ""}
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
                    {(aboutData?.stats || []).map((stat, index) => (
                      <div key={index} className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          {stat.label}
                        </label>
                        <Input
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...(aboutData?.stats || [])];
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
                    {(aboutData?.skills || []).map((skill, index) => (
                      <div key={index} className="p-4 border border-border/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Input
                            value={skill.category}
                            onChange={(e) => {
                              const newSkills = [...(aboutData?.skills || [])];
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
                                const newSkills = (aboutData?.skills || []).filter((_, i) => i !== index);
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
                                const newSkills = [...(aboutData?.skills || [])];
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
                                const newSkills = [...(aboutData?.skills || [])];
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
                            skills: [...(aboutData?.skills || []), { category: "", technologies: [""] }]
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

                {/* Experiences */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Professional Experience</h4>
                  <div className="space-y-4">
                    {(aboutData?.experiences || []).map((experience, index) => (
                      <div key={index} className="p-4 border border-border/50 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-md font-medium text-foreground">
                            Experience {index + 1}
                          </h5>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newExperiences = (aboutData?.experiences || []).filter((_, i) => i !== index);
                                setAboutData({...aboutData, experiences: newExperiences});
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-1">
                                Job Title
                              </label>
                              <Input
                                value={experience.title || ""}
                                onChange={(e) => {
                                  const newExperiences = [...(aboutData?.experiences || [])];
                                  newExperiences[index].title = e.target.value;
                                  setAboutData({...aboutData, experiences: newExperiences});
                                }}
                                disabled={!isEditing}
                                placeholder="Senior Full Stack Developer"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-1">
                                Company
                              </label>
                              <Input
                                value={experience.company || ""}
                                onChange={(e) => {
                                  const newExperiences = [...(aboutData?.experiences || [])];
                                  newExperiences[index].company = e.target.value;
                                  setAboutData({...aboutData, experiences: newExperiences});
                                }}
                                disabled={!isEditing}
                                placeholder="TechCorp Inc."
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-1">
                                Period
                              </label>
                              <Input
                                value={experience.period || ""}
                                onChange={(e) => {
                                  const newExperiences = [...(aboutData?.experiences || [])];
                                  newExperiences[index].period = e.target.value;
                                  setAboutData({...aboutData, experiences: newExperiences});
                                }}
                                disabled={!isEditing}
                                placeholder="2022 - Present"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">
                              Description
                            </label>
                            <Textarea
                              value={experience.description || ""}
                              onChange={(e) => {
                                const newExperiences = [...(aboutData?.experiences || [])];
                                newExperiences[index].description = e.target.value;
                                setAboutData({...aboutData, experiences: newExperiences});
                              }}
                              disabled={!isEditing}
                              rows={4}
                              placeholder="Describe your role and achievements..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setAboutData({
                            ...aboutData,
                            experiences: [...(aboutData?.experiences || []), { 
                              title: "", 
                              company: "", 
                              period: "", 
                              description: "" 
                            }]
                          });
                        }}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
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
                  Comprehensive project management with status tracking, timeline, and detailed information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projectsData.map((project, index) => (
                    <div key={project.id} className="p-6 border border-border/50 rounded-lg space-y-6">
                      {/* Project Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <h4 className="text-xl font-semibold text-foreground">
                            {project.title || `Project ${index + 1}`}
                          </h4>
                          {project.status && (
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${projectStatuses.find(s => s.value === project.status)?.color || 'bg-gray-100 text-gray-800'}`}>
                              {projectStatuses.find(s => s.value === project.status)?.label || project.status}
                            </span>
                          )}
                          {project.priority && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${projectPriorities.find(p => p.value === project.priority)?.color || 'bg-gray-100 text-gray-800'}`}>
                              {projectPriorities.find(p => p.value === project.priority)?.label || project.priority}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={project.featured || false}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].featured = e.target.checked;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                            />
                            <span className="text-sm text-muted-foreground">Featured</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={project.isPublic !== false}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].isPublic = e.target.checked;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                            />
                            <span className="text-sm text-muted-foreground">Public</span>
                          </label>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={async () => {
                                if (project.id && project.id > 0) {
                                  // Delete from database
                                  try {
                                    console.log(`Deleting project ${project.id} from database`);
                                    const response = await fetch(`/api/admin/projects/${project.id}`, {
                                      method: 'DELETE'
                                    });
                                    
                                    if (response.ok) {
                                      console.log(`Project ${project.id} deleted successfully`);
                                      // Remove from local state
                                      const newProjects = projectsData.filter((_, i) => i !== index);
                                      setProjectsData(newProjects);
                                      setSaveMessage('Project deleted successfully!');
                                      setTimeout(() => setSaveMessage(''), 3000);
                                    } else {
                                      console.error(`Failed to delete project ${project.id}`);
                                      const errorData = await response.json();
                                      console.error('Error details:', errorData);
                                      setSaveMessage('Failed to delete project. Please try again.');
                                      setTimeout(() => setSaveMessage(''), 5000);
                                    }
                                  } catch (error) {
                                    console.error(`Error deleting project ${project.id}:`, error);
                                    setSaveMessage('Error deleting project. Please try again.');
                                    setTimeout(() => setSaveMessage(''), 5000);
                                  }
                                } else {
                                  // Remove from local state only (for new projects not yet saved)
                                  const newProjects = projectsData.filter((_, i) => i !== index);
                                  setProjectsData(newProjects);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {project.progress !== undefined && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{project.progress || 0}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${project.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Main Content Grid */}
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Basic Information */}
                        <div className="lg:col-span-2 space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Project Title *
                              </label>
                              <Input
                                value={project.title || ""}
                                onChange={(e) => {
                                  const newProjects = [...projectsData];
                                  newProjects[index].title = e.target.value;
                                  setProjectsData(newProjects);
                                }}
                                disabled={!isEditing}
                                placeholder="Enter project title"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Category
                              </label>
                              <Select
                                value={project.category || ""}
                                onValueChange={(value) => {
                                  const newProjects = [...projectsData];
                                  newProjects[index].category = value;
                                  setProjectsData(newProjects);
                                }}
                                disabled={!isEditing}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {projectCategories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Short Description
                            </label>
                            <Input
                              value={project.shortDescription || ""}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].shortDescription = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                              placeholder="Brief description for cards"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Full Description *
                            </label>
                            <Textarea
                              value={project.description || ""}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].description = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                              rows={4}
                              placeholder="Detailed project description"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Status
                              </label>
                              <Select
                                value={project.status || "planning"}
                                onValueChange={(value) => {
                                  const newProjects = [...projectsData];
                                  newProjects[index].status = value;
                                  setProjectsData(newProjects);
                                }}
                                disabled={!isEditing}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {projectStatuses.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                      <div className="flex items-center space-x-2">
                                        <status.icon className="h-4 w-4" />
                                        <span>{status.label}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Priority
                              </label>
                              <Select
                                value={project.priority || "medium"}
                                onValueChange={(value) => {
                                  const newProjects = [...projectsData];
                                  newProjects[index].priority = value;
                                  setProjectsData(newProjects);
                                }}
                                disabled={!isEditing}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {projectPriorities.map((priority) => (
                                    <SelectItem key={priority.value} value={priority.value}>
                                      {priority.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Progress (%)
                            </label>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={project.progress || 0}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].progress = parseInt(e.target.value) || 0;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                              placeholder="0-100"
                            />
                          </div>
                        </div>

                        {/* Project Details Sidebar */}
                        <div className="space-y-4">
                          {/* Project Image */}
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Project Image
                            </label>
                            <div className="space-y-2">
                              {project.imageUrl && (
                                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border/50">
                                  <img 
                                    src={project.imageUrl} 
                                    alt="Project" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex space-x-2">
                                <Input
                                  value={project.imageUrl || ""}
                                  onChange={(e) => {
                                    const newProjects = [...projectsData];
                                    newProjects[index].imageUrl = e.target.value;
                                    setProjectsData(newProjects);
                                  }}
                                  disabled={!isEditing}
                                  placeholder="Image URL"
                                  className="flex-1"
                                />
                                {isEditing && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openMediaSelector(`projectImage_${index}`)}
                                  >
                                    <Image className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Timeline */}
                          <div className="space-y-3">
                            <h5 className="text-sm font-medium text-foreground">Timeline</h5>
                            <div className="space-y-2">
                              <div>
                                <label className="block text-xs text-muted-foreground mb-1">
                                  Start Date
                                </label>
                                <Input
                                  type="date"
                                  value={project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : ""}
                                  onChange={(e) => {
                                    const newProjects = [...projectsData];
                                    newProjects[index].startDate = e.target.value ? new Date(e.target.value).toISOString() : null;
                                    setProjectsData(newProjects);
                                  }}
                                  disabled={!isEditing}
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-muted-foreground mb-1">
                                  End Date
                                </label>
                                <Input
                                  type="date"
                                  value={project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : ""}
                                  onChange={(e) => {
                                    const newProjects = [...projectsData];
                                    newProjects[index].endDate = e.target.value ? new Date(e.target.value).toISOString() : null;
                                    setProjectsData(newProjects);
                                  }}
                                  disabled={!isEditing}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Project Metrics */}
                          <div className="space-y-3">
                            <h5 className="text-sm font-medium text-foreground">Metrics</h5>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs text-muted-foreground mb-1">
                                  Est. Hours
                                </label>
                                <Input
                                  type="number"
                                  value={project.estimatedHours || ""}
                                  onChange={(e) => {
                                    const newProjects = [...projectsData];
                                    newProjects[index].estimatedHours = e.target.value ? parseInt(e.target.value) : null;
                                    setProjectsData(newProjects);
                                  }}
                                  disabled={!isEditing}
                                  placeholder="Hours"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-muted-foreground mb-1">
                                  Actual Hours
                                </label>
                                <Input
                                  type="number"
                                  value={project.actualHours || ""}
                                  onChange={(e) => {
                                    const newProjects = [...projectsData];
                                    newProjects[index].actualHours = e.target.value ? parseInt(e.target.value) : null;
                                    setProjectsData(newProjects);
                                  }}
                                  disabled={!isEditing}
                                  placeholder="Hours"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs text-muted-foreground mb-1">
                                Team Size
                              </label>
                              <Input
                                type="number"
                                min="1"
                                value={project.teamSize || 1}
                                onChange={(e) => {
                                  const newProjects = [...projectsData];
                                  newProjects[index].teamSize = parseInt(e.target.value) || 1;
                                  setProjectsData(newProjects);
                                }}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>

                          {/* Client Information */}
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Client
                            </label>
                            <Input
                              value={project.client || ""}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].client = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                              placeholder="Client name"
                            />
                          </div>
                        </div>
                      </div>

                      {/* URLs Section */}
                      <div className="space-y-4">
                        <h5 className="text-sm font-medium text-foreground">Project Links</h5>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">
                              Live URL
                            </label>
                            <Input
                              value={project.liveUrl || ""}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].liveUrl = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                              placeholder="https://..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">
                              GitHub URL
                            </label>
                            <Input
                              value={project.githubUrl || ""}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].githubUrl = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                              placeholder="https://..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">
                              Demo URL
                            </label>
                            <Input
                              value={project.demoUrl || ""}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].demoUrl = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                              placeholder="https://..."
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">
                              Documentation
                            </label>
                            <Input
                              value={project.documentationUrl || ""}
                              onChange={(e) => {
                                const newProjects = [...projectsData];
                                newProjects[index].documentationUrl = e.target.value;
                                setProjectsData(newProjects);
                              }}
                              disabled={!isEditing}
                              placeholder="https://..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Technologies Section */}
                      <div className="space-y-4">
                        <h5 className="text-sm font-medium text-foreground">Technologies</h5>
                        <div>
                          <label className="block text-xs text-muted-foreground mb-2">
                            Technology Stack (comma-separated)
                          </label>
                          <Input
                            value={Array.isArray(project.technologies) ? project.technologies.join(", ") : ""}
                            onChange={(e) => {
                              const newProjects = [...projectsData];
                              newProjects[index].technologies = e.target.value.split(", ").filter(t => t.trim());
                              setProjectsData(newProjects);
                            }}
                            disabled={!isEditing}
                            placeholder="React, Node.js, MongoDB, TypeScript"
                          />
                        </div>
                      </div>

                      {/* Additional Details */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Challenges Faced
                          </label>
                          <Textarea
                            value={project.challenges || ""}
                            onChange={(e) => {
                              const newProjects = [...projectsData];
                              newProjects[index].challenges = e.target.value;
                              setProjectsData(newProjects);
                            }}
                            disabled={!isEditing}
                            rows={3}
                            placeholder="Describe the main challenges..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Solutions Implemented
                          </label>
                          <Textarea
                            value={project.solutions || ""}
                            onChange={(e) => {
                              const newProjects = [...projectsData];
                              newProjects[index].solutions = e.target.value;
                              setProjectsData(newProjects);
                            }}
                            disabled={!isEditing}
                            rows={3}
                            placeholder="How you solved the challenges..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Lessons Learned
                        </label>
                        <Textarea
                          value={project.lessonsLearned || ""}
                          onChange={(e) => {
                            const newProjects = [...projectsData];
                            newProjects[index].lessonsLearned = e.target.value;
                            setProjectsData(newProjects);
                          }}
                          disabled={!isEditing}
                          rows={3}
                          placeholder="Key takeaways from this project..."
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add New Project Button */}
                  {isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newProject = {
                          id: Date.now(),
                          title: "New Project",
                          description: "Project description",
                          shortDescription: "",
                          technologies: [],
                          category: "Web Application",
                          status: "planning",
                          priority: "medium",
                          progress: 0,
                          featured: false,
                          isPublic: true,
                          teamSize: 1,
                          order: projectsData.length + 1
                        };
                        setProjectsData([...projectsData, newProject]);
                      }}
                      className="w-full h-12 border-2 border-dashed"
                    >
                      <Plus className="h-5 w-5 mr-2" />
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
                      value={contactData?.title || ""}
                      onChange={(e) => setContactData({...contactData, title: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subtitle
                    </label>
                    <Input
                      value={contactData?.subtitle || ""}
                      onChange={(e) => setContactData({...contactData, subtitle: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description
                    </label>
                    <Textarea
                      value={contactData?.description || ""}
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
                    {(contactData?.contactInfo || []).map((info, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-24">
                          <Input
                            value={info.type}
                            onChange={(e) => {
                              const newContactInfo = [...(contactData?.contactInfo || [])];
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
                              const newContactInfo = [...(contactData?.contactInfo || [])];
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
                              const newContactInfo = [...(contactData?.contactInfo || [])];
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
                              const newContactInfo = (contactData?.contactInfo || []).filter((_, i) => i !== index);
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
                            contactInfo: [...(contactData?.contactInfo || []), { type: "", value: "", href: "" }]
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
                    {(contactData?.socialLinks || []).map((social, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-32">
                          <Input
                            value={social.name}
                            onChange={(e) => {
                              const newSocialLinks = [...(contactData?.socialLinks || [])];
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
                              const newSocialLinks = [...(contactData?.socialLinks || [])];
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
                              const newSocialLinks = (contactData?.socialLinks || []).filter((_, i) => i !== index);
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
                            socialLinks: [...(contactData?.socialLinks || []), { name: "", href: "" }]
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

        {/* Media Selector Dialog */}
        {showMediaSelector && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background border border-border rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Select {mediaSelectorType === 'profileImage' ? 'Profile' : 'Background'} Image
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowMediaSelector(false);
                    setMediaSelectorType(null);
                  }}
                >
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mediaFiles
                  .filter(file => file.type === 'image')
                  .map((file) => {
                    console.log('Media file available:', { id: file.id, name: file.name, url: file.url, type: file.type });
                    return (
                    <div
                      key={file.id}
                      className="relative cursor-pointer group"
                      onClick={() => handleMediaSelect(file.url, mediaSelectorType)}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden border border-border/50 group-hover:border-primary transition-colors">
                        <img
                          src={file.url}
                          alt={file.alt || file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="secondary">
                            Select
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {file.name}
                      </p>
                    </div>
                    );
                  })}
              </div>
              
              {mediaFiles.filter(file => file.type === 'image').length === 0 && (
                <div className="text-center py-8">
                  <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No images available</p>
                  <p className="text-sm text-muted-foreground">
                    Upload images in the Media section first
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
