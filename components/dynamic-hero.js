"use client";

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

const DynamicHero = () => {
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/admin/hero');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHeroData(data.hero);
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
        setError(err);
        // Fallback to default data if fetching fails
        setHeroData({
          name: "Iwu Francis",
          title: "Full Stack Web Developer",
          description: "I create beautiful, functional, and user-centered digital experiences that bring ideas to life. Passionate about clean code, modern technologies, and continuous learning.",
          cvUrl: "/cv.pdf",
          profileImageUrl: "",
          backgroundImageUrl: "",
          backgroundVideoUrl: "",
          backgroundType: "gradient",
          primaryButtonText: "View My Work",
          primaryButtonAction: "scroll",
          primaryButtonLink: "",
          secondaryButtonText: "Download CV",
          secondaryButtonAction: "download",
          secondaryButtonLink: "/cv.pdf",
          showScrollIndicator: true,
          scrollIndicatorText: "Scroll Down",
          socialLinks: {
            github: "https://github.com/Iamtheusername112",
            linkedin: "https://linkedin.com/in/francis-iwu-878973238",
            instagram: "https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3",
            email: "mailto:iwufrancis571@gmail.com"
          },
          customCss: "",
          isActive: true
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleButtonClick = (buttonData) => {
    if (buttonData.action === 'scroll') {
      scrollToAbout();
    } else if (buttonData.action === 'link' && buttonData.link) {
      window.open(buttonData.link, '_blank');
    } else if (buttonData.action === 'download' && buttonData.link) {
      window.open(buttonData.link, '_blank');
    }
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'github':
        return <Github className="h-6 w-6" />;
      case 'linkedin':
        return <Linkedin className="h-6 w-6" />;
      case 'instagram':
        return <Instagram className="h-6 w-6" />;
      case 'email':
        return <Mail className="h-6 w-6" />;
      default:
        return <Github className="h-6 w-6" />;
    }
  };

  if (isLoading) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-pattern">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading hero section...</p>
        </div>
      </section>
    );
  }

  if (!heroData) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-pattern">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load hero content</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-pattern"
      style={heroData.customCss ? { style: heroData.customCss } : {}}
    >
      {/* Background */}
      {heroData.backgroundType === 'image' && heroData.backgroundImageUrl && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroData.backgroundImageUrl})` }}
        />
      )}
      {heroData.backgroundType === 'video' && heroData.backgroundVideoUrl && (
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          muted 
          loop
        >
          <source src={heroData.backgroundVideoUrl} type="video/mp4" />
        </video>
      )}
      {heroData.backgroundType === 'gradient' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
        </>
      )}
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float blur-sm" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full animate-float blur-sm" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-pink-500/10 rounded-full animate-float blur-sm" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            {/* Profile Image */}
            {heroData.profileImageUrl && (
              <div className="mb-6">
                <img 
                  src={heroData.profileImageUrl} 
                  alt={heroData.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20"
                />
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Hi, I'm{" "}
              <span className="gradient-text animate-glow">
                {heroData.name}
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium">
              {heroData.title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              onClick={() => handleButtonClick({
                action: heroData.primaryButtonAction,
                link: heroData.primaryButtonLink
              })}
              className="w-full sm:w-auto btn-premium animate-shimmer"
            >
              {heroData.primaryButtonText}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto btn-premium glass text-foreground"
              onClick={() => handleButtonClick({
                action: heroData.secondaryButtonAction,
                link: heroData.secondaryButtonLink
              })}
            >
              <Download className="mr-2 h-4 w-4" />
              {heroData.secondaryButtonText}
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-6"
          >
            {Object.entries(heroData.socialLinks).map(([platform, url]) => (
              <Button
                key={platform}
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                onClick={() => window.open(url, "_blank")}
                title={platform}
              >
                {getSocialIcon(platform)}
              </Button>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {heroData.showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToAbout}
              className="h-12 w-12 rounded-full animate-bounce"
              title={heroData.scrollIndicatorText}
            >
              <ArrowDown className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DynamicHero;
