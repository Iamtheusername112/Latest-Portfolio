"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { useEffect, useState } from "react";

const DynamicFooter = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('/api/public/footer');
        if (response.ok) {
          const data = await response.json();
          // The API returns data wrapped in a 'footer' object
          setFooterData(data.footer || data);
        }
      } catch (error) {
        console.error('Error fetching footer data:', error);
        // Set fallback data if API fails
        setFooterData({
          brand: {
            name: "Iwu Francis",
            tagline: "Full Stack Developer",
            description: "Full Stack Web Developer passionate about creating innovative digital solutions and beautiful user experiences.",
            logo: {
              show: true,
              variant: "default",
              size: "lg"
            }
          },
          socialLinks: [
            { platform: "github", url: "https://github.com/Iamtheusername112", label: "GitHub" },
            { platform: "linkedin", url: "https://linkedin.com/in/francis-iwu-878973238", label: "LinkedIn" },
            { platform: "instagram", url: "https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3", label: "Instagram" },
            { platform: "mail", url: "mailto:iwufrancis571@gmail.com", label: "Email" }
          ],
          quickLinks: [
            { name: "Home", href: "#home" },
            { name: "About", href: "#about" },
            { name: "Projects", href: "#projects" },
            { name: "Contact", href: "#contact" }
          ],
          contactInfo: {
            email: "iwufrancis571@gmail.com",
            location: "Berlin, Germany",
            availability: "Available for remote work"
          },
          copyright: {
            text: "All rights reserved.",
            showYear: true
          },
          layout: {
            showBrand: true,
            showQuickLinks: true,
            showContactInfo: true,
            showSocialLinks: true,
            showCopyright: true,
            columns: 3
          },
          styling: {
            backgroundColor: "background",
            textColor: "foreground",
            accentColor: "primary",
            borderColor: "border",
            showBackgroundPattern: true,
            patternOpacity: 0.3
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      github: Github,
      linkedin: Linkedin,
      instagram: Instagram,
      mail: Mail,
      twitter: Twitter,
      facebook: Facebook,
      youtube: Youtube
    };
    return icons[iconName] || Mail;
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <footer className="bg-background border-t border-border/50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-8">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4 mx-auto mb-4"></div>
                <div className="h-3 bg-muted rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (!footerData) {
    // Show static footer as fallback
    return (
      <footer className="bg-background border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-30" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div className="space-y-4">
                <Logo 
                  variant="default" 
                  size="lg" 
                  showText={true}
                  className="items-start"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Full Stack Developer
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Full Stack Web Developer passionate about creating
                  innovative digital solutions and beautiful user experiences.
                </p>
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    onClick={() => window.open("https://github.com/Iamtheusername112", "_blank")}
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    onClick={() => window.open("https://linkedin.com/in/francis-iwu-878973238", "_blank")}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    onClick={() => window.open("https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3", "_blank")}
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    onClick={() => window.open("mailto:iwufrancis571@gmail.com", "_blank")}
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
                <nav className="space-y-2">
                  <button
                    onClick={() => scrollToSection("#home")}
                    className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("#about")}
                    className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection("#projects")}
                    className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => scrollToSection("#contact")}
                    className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Contact
                  </button>
                </nav>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>iwufrancis571@gmail.com</p>
                  <p>Berlin, Germany</p>
                  <p>Available for remote work</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Iwu Francis. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const currentYear = new Date().getFullYear();
  const { brand, socialLinks, quickLinks, contactInfo, copyright, layout, styling } = footerData;

  return (
    <footer 
      className={`bg-${styling?.backgroundColor || 'background'} border-t border-${styling?.borderColor || 'border'}/50 relative overflow-hidden`}
    >
      {/* Background Pattern */}
      {styling?.showBackgroundPattern && (
        <div 
          className="absolute inset-0 bg-pattern opacity-30" 
          style={{ opacity: styling.patternOpacity || 0.3 }}
        />
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className={`grid md:grid-cols-${layout?.columns || 3} gap-8 mb-8`}>
            {/* Brand Section */}
            {layout?.showBrand && brand && (
              <div className="space-y-4">
                {brand.logo?.show && (
                  <Logo 
                    variant={brand.logo?.variant || "default"} 
                    size={brand.logo?.size || "lg"} 
                    showText={true}
                    className="items-start"
                  />
                )}
                {brand.tagline && (
                  <p className={`text-sm text-${styling?.textColor || 'muted-foreground'} mt-2`}>
                    {brand.tagline}
                  </p>
                )}
                {brand.description && (
                  <p className={`text-${styling?.textColor || 'muted-foreground'} text-sm leading-relaxed`}>
                    {brand.description}
                  </p>
                )}
                {layout?.showSocialLinks && socialLinks && socialLinks.length > 0 && (
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const IconComponent = getIcon(social.icon);
                      return (
                        <Button
                          key={social.id || index}
                          variant="ghost"
                          size="icon"
                          className={`h-10 w-10 rounded-full glass hover:bg-${styling?.accentColor || 'primary'} hover:text-primary-foreground transition-all duration-300 hover:scale-110`}
                          onClick={() => window.open(social.url, "_blank")}
                          aria-label={social.platform}
                        >
                          <IconComponent className="h-5 w-5" />
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Quick Links Section */}
            {layout?.showQuickLinks && quickLinks && quickLinks.length > 0 && (
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold text-${styling?.textColor || 'foreground'}`}>
                  Quick Links
                </h3>
                <nav className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <button
                      key={link.id || index}
                      onClick={() => scrollToSection(link.href)}
                      className={`block text-${styling?.textColor || 'muted-foreground'} hover:text-${styling?.accentColor || 'primary'} transition-colors text-sm`}
                    >
                      {link.name}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Contact Info Section */}
            {layout?.showContactInfo && contactInfo && (
              <div className="space-y-4">
                <h3 className={`text-lg font-semibold text-${styling?.textColor || 'foreground'}`}>
                  Get In Touch
                </h3>
                <div className={`space-y-2 text-sm text-${styling?.textColor || 'muted-foreground'}`}>
                  {contactInfo.email && <p>{contactInfo.email}</p>}
                  {contactInfo.location && <p>{contactInfo.location}</p>}
                  {contactInfo.availability && <p>{contactInfo.availability}</p>}
                  {contactInfo.phone && <p>{contactInfo.phone}</p>}
                  {contactInfo.website && (
                    <p>
                      <a 
                        href={contactInfo.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`hover:text-${styling?.accentColor || 'primary'} transition-colors`}
                      >
                        {contactInfo.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          {layout?.showCopyright && copyright && (
            <div className="pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <p className={`text-sm text-${styling?.textColor || 'muted-foreground'}`}>
                  © {copyright.showYear ? currentYear : ''} {brand?.name || 'Iwu Francis'}. {copyright.text || 'All rights reserved.'}
                  {copyright.additionalText && ` ${copyright.additionalText}`}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </footer>
  );
};

export default DynamicFooter;
