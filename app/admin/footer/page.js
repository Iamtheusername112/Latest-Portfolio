"use client";

import { useAdmin } from "@/contexts/admin-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  RefreshCw, 
  Eye, 
  Plus, 
  Trash2, 
  GripVertical,
  Globe,
  Mail,
  Phone,
  MapPin,
  Link,
  Palette,
  Layout,
  Brain,
  Users,
  Settings
} from "lucide-react";

export default function FooterPage() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("brand");
  const [isLoadingFooter, setIsLoadingFooter] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [footerData, setFooterData] = useState({
    brand: {
      name: "",
      tagline: "",
      description: "",
      logo: {
        show: true,
        variant: "default",
        size: "lg"
      }
    },
    socialLinks: [],
    quickLinks: [],
    contactInfo: {
      email: "",
      location: "",
      availability: "",
      phone: "",
      website: ""
    },
    copyright: {
      text: "",
      showYear: true,
      additionalText: ""
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

  // Fetch footer settings on component mount
  useEffect(() => {
    const fetchFooterSettings = async () => {
      try {
        setIsLoadingFooter(true);
        
        const response = await fetch('/api/admin/footer');
        if (response.ok) {
          const settings = await response.json();
          setFooterData(settings);
        } else {
          toast.error('Failed to load footer settings');
        }
      } catch (error) {
        console.error('Error fetching footer settings:', error);
        toast.error('Error loading footer settings');
      } finally {
        setIsLoadingFooter(false);
      }
    };

    if (isAuthenticated) {
      fetchFooterSettings();
    }
  }, [isAuthenticated]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const response = await fetch('/api/admin/footer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: footerData })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Footer settings saved successfully!');
      } else {
        toast.error(result.error || 'Failed to save footer settings');
      }
    } catch (error) {
      console.error('Error saving footer settings:', error);
      toast.error('Error saving footer settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    try {
      setIsSaving(true);
      
      const response = await fetch('/api/admin/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Footer settings reset to default successfully!');
        setFooterData(result.settings);
      } else {
        toast.error(result.error || 'Failed to reset footer settings');
      }
    } catch (error) {
      console.error('Error resetting footer settings:', error);
      toast.error('Error resetting footer settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addSocialLink = () => {
    const newLink = {
      id: `social_${Date.now()}`,
      platform: "",
      url: "",
      icon: "mail",
      enabled: true,
      order: footerData.socialLinks.length + 1
    };
    setFooterData({
      ...footerData,
      socialLinks: [...footerData.socialLinks, newLink]
    });
  };

  const updateSocialLink = (index, field, value) => {
    const updatedLinks = [...footerData.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFooterData({ ...footerData, socialLinks: updatedLinks });
  };

  const removeSocialLink = (index) => {
    const updatedLinks = footerData.socialLinks.filter((_, i) => i !== index);
    setFooterData({ ...footerData, socialLinks: updatedLinks });
  };

  const addQuickLink = () => {
    const newLink = {
      id: `quick_${Date.now()}`,
      name: "",
      href: "",
      enabled: true,
      order: footerData.quickLinks.length + 1
    };
    setFooterData({
      ...footerData,
      quickLinks: [...footerData.quickLinks, newLink]
    });
  };

  const updateQuickLink = (index, field, value) => {
    const updatedLinks = [...footerData.quickLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFooterData({ ...footerData, quickLinks: updatedLinks });
  };

  const removeQuickLink = (index) => {
    const updatedLinks = footerData.quickLinks.filter((_, i) => i !== index);
    setFooterData({ ...footerData, quickLinks: updatedLinks });
  };

  // Loading state
  if (isLoading || isLoadingFooter) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading footer settings...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Footer Management</h1>
            <p className="text-muted-foreground mt-2">
              Customize your portfolio footer content and styling
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isSaving}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${isSaving ? 'animate-spin' : ''}`} />
              <span>{isSaving ? 'Resetting...' : 'Reset'}</span>
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2"
            >
              <Save className={`h-4 w-4 ${isSaving ? 'animate-pulse' : ''}`} />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </Button>
          </div>
        </div>

        {/* Footer Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="brand">Brand</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="styling">Styling</TabsTrigger>
          </TabsList>

          {/* Brand Settings */}
          <TabsContent value="brand" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Brand Information</span>
                </CardTitle>
                <CardDescription>
                  Configure your brand information displayed in the footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Brand Name
                      </label>
                      <Input
                        value={footerData.brand?.name || ''}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          brand: { ...footerData.brand, name: e.target.value }
                        })}
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tagline
                      </label>
                      <Input
                        value={footerData.brand?.tagline || ''}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          brand: { ...footerData.brand, tagline: e.target.value }
                        })}
                        placeholder="Full Stack Developer"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Description
                      </label>
                      <Textarea
                        value={footerData.brand?.description || ''}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          brand: { ...footerData.brand, description: e.target.value }
                        })}
                        placeholder="Brief description about yourself"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Logo Settings */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Logo Settings</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="show-logo"
                        checked={footerData.brand?.logo?.show || false}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          brand: {
                            ...footerData.brand,
                            logo: { ...footerData.brand.logo, show: e.target.checked }
                          }
                        })}
                      />
                      <label htmlFor="show-logo" className="text-sm font-medium text-foreground">
                        Show Logo
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Logo Variant
                      </label>
                      <select
                        value={footerData.brand?.logo?.variant || 'default'}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          brand: {
                            ...footerData.brand,
                            logo: { ...footerData.brand.logo, variant: e.target.value }
                          }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        <option value="default">Default</option>
                        <option value="minimal">Minimal</option>
                        <option value="tech">Tech</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Logo Size
                      </label>
                      <select
                        value={footerData.brand?.logo?.size || 'lg'}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          brand: {
                            ...footerData.brand,
                            logo: { ...footerData.brand.logo, size: e.target.value }
                          }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                        <option value="xl">Extra Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Links */}
          <TabsContent value="social" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Social Media Links</span>
                </CardTitle>
                <CardDescription>
                  Manage your social media links displayed in the footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-foreground">Social Links</h4>
                  <Button onClick={addSocialLink} size="sm" className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Link</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  {footerData.socialLinks?.map((link, index) => (
                    <div key={link.id || index} className="p-4 border border-border/50 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-foreground">Social Link {index + 1}</h5>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSocialLink(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Platform
                          </label>
                          <Input
                            value={link.platform || ''}
                            onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                            placeholder="GitHub, LinkedIn, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            URL
                          </label>
                          <Input
                            value={link.url || ''}
                            onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Icon
                          </label>
                          <select
                            value={link.icon || 'mail'}
                            onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                            className="w-full p-2 border border-border rounded-md bg-background"
                          >
                            <option value="github">GitHub</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="instagram">Instagram</option>
                            <option value="mail">Email</option>
                            <option value="twitter">Twitter</option>
                            <option value="facebook">Facebook</option>
                            <option value="youtube">YouTube</option>
                          </select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`enabled-${index}`}
                            checked={link.enabled || false}
                            onChange={(e) => updateSocialLink(index, 'enabled', e.target.checked)}
                          />
                          <label htmlFor={`enabled-${index}`} className="text-sm font-medium text-foreground">
                            Enabled
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}

                  {footerData.socialLinks?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No social links added yet</p>
                      <p className="text-sm">Click "Add Link" to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quick Links */}
          <TabsContent value="links" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Link className="h-5 w-5" />
                  <span>Quick Navigation Links</span>
                </CardTitle>
                <CardDescription>
                  Manage navigation links displayed in the footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
                  <Button onClick={addQuickLink} size="sm" className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Link</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  {footerData.quickLinks?.map((link, index) => (
                    <div key={link.id || index} className="p-4 border border-border/50 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-foreground">Quick Link {index + 1}</h5>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuickLink(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Link Name
                          </label>
                          <Input
                            value={link.name || ''}
                            onChange={(e) => updateQuickLink(index, 'name', e.target.value)}
                            placeholder="Home, About, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Link URL
                          </label>
                          <Input
                            value={link.href || ''}
                            onChange={(e) => updateQuickLink(index, 'href', e.target.value)}
                            placeholder="#home, #about, etc."
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`quick-enabled-${index}`}
                            checked={link.enabled || false}
                            onChange={(e) => updateQuickLink(index, 'enabled', e.target.checked)}
                          />
                          <label htmlFor={`quick-enabled-${index}`} className="text-sm font-medium text-foreground">
                            Enabled
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}

                  {footerData.quickLinks?.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Link className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No quick links added yet</p>
                      <p className="text-sm">Click "Add Link" to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Contact Information</span>
                </CardTitle>
                <CardDescription>
                  Configure contact details displayed in the footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Input
                        value={footerData.contactInfo?.email || ''}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          contactInfo: { ...footerData.contactInfo, email: e.target.value }
                        })}
                        placeholder="your@email.com"
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Location
                      </label>
                      <Input
                        value={footerData.contactInfo?.location || ''}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          contactInfo: { ...footerData.contactInfo, location: e.target.value }
                        })}
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Availability
                      </label>
                      <Input
                        value={footerData.contactInfo?.availability || ''}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          contactInfo: { ...footerData.contactInfo, availability: e.target.value }
                        })}
                        placeholder="Available for remote work"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={footerData.contactInfo?.phone || ''}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          contactInfo: { ...footerData.contactInfo, phone: e.target.value }
                        })}
                        placeholder="+1 (555) 123-4567"
                        type="tel"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Website
                      </label>
                      <Input
                        value={footerData.contactInfo?.website || ''}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          contactInfo: { ...footerData.contactInfo, website: e.target.value }
                        })}
                        placeholder="https://yourwebsite.com"
                        type="url"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout Settings */}
          <TabsContent value="layout" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layout className="h-5 w-5" />
                  <span>Layout Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure which sections to display in the footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Display Sections</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={footerData.layout?.showBrand || false}
                          onChange={(e) => setFooterData({
                            ...footerData,
                            layout: { ...footerData.layout, showBrand: e.target.checked }
                          })}
                        />
                        <span className="text-sm font-medium text-foreground">Show Brand Section</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={footerData.layout?.showQuickLinks || false}
                          onChange={(e) => setFooterData({
                            ...footerData,
                            layout: { ...footerData.layout, showQuickLinks: e.target.checked }
                          })}
                        />
                        <span className="text-sm font-medium text-foreground">Show Quick Links</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={footerData.layout?.showContactInfo || false}
                          onChange={(e) => setFooterData({
                            ...footerData,
                            layout: { ...footerData.layout, showContactInfo: e.target.checked }
                          })}
                        />
                        <span className="text-sm font-medium text-foreground">Show Contact Information</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={footerData.layout?.showSocialLinks || false}
                          onChange={(e) => setFooterData({
                            ...footerData,
                            layout: { ...footerData.layout, showSocialLinks: e.target.checked }
                          })}
                        />
                        <span className="text-sm font-medium text-foreground">Show Social Links</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={footerData.layout?.showCopyright || false}
                          onChange={(e) => setFooterData({
                            ...footerData,
                            layout: { ...footerData.layout, showCopyright: e.target.checked }
                          })}
                        />
                        <span className="text-sm font-medium text-foreground">Show Copyright</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Layout Options</h4>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Number of Columns
                      </label>
                      <select
                        value={footerData.layout?.columns || 3}
                        onChange={(e) => setFooterData({
                          ...footerData,
                          layout: { ...footerData.layout, columns: parseInt(e.target.value) }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        <option value={1}>1 Column</option>
                        <option value={2}>2 Columns</option>
                        <option value={3}>3 Columns</option>
                        <option value={4}>4 Columns</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Styling Settings */}
          <TabsContent value="styling" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Styling Settings</span>
                </CardTitle>
                <CardDescription>
                  Customize the visual appearance of your footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Colors</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Background Color
                        </label>
                        <select
                          value={footerData.styling?.backgroundColor || 'background'}
                          onChange={(e) => setFooterData({
                            ...footerData,
                            styling: { ...footerData.styling, backgroundColor: e.target.value }
                          })}
                          className="w-full p-2 border border-border rounded-md bg-background"
                        >
                          <option value="background">Background</option>
                          <option value="muted">Muted</option>
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Text Color
                        </label>
                        <select
                          value={footerData.styling?.textColor || 'foreground'}
                          onChange={(e) => setFooterData({
                            ...footerData,
                            styling: { ...footerData.styling, textColor: e.target.value }
                          })}
                          className="w-full p-2 border border-border rounded-md bg-background"
                        >
                          <option value="foreground">Foreground</option>
                          <option value="muted-foreground">Muted</option>
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Accent Color
                        </label>
                        <select
                          value={footerData.styling?.accentColor || 'primary'}
                          onChange={(e) => setFooterData({
                            ...footerData,
                            styling: { ...footerData.styling, accentColor: e.target.value }
                          })}
                          className="w-full p-2 border border-border rounded-md bg-background"
                        >
                          <option value="primary">Primary</option>
                          <option value="secondary">Secondary</option>
                          <option value="accent">Accent</option>
                          <option value="muted">Muted</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-foreground">Background</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={footerData.styling?.showBackgroundPattern || false}
                          onChange={(e) => setFooterData({
                            ...footerData,
                            styling: { ...footerData.styling, showBackgroundPattern: e.target.checked }
                          })}
                        />
                        <span className="text-sm font-medium text-foreground">Show Background Pattern</span>
                      </label>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Pattern Opacity
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={footerData.styling?.patternOpacity || 0.3}
                          onChange={(e) => setFooterData({
                            ...footerData,
                            styling: { ...footerData.styling, patternOpacity: parseFloat(e.target.value) }
                          })}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.round((footerData.styling?.patternOpacity || 0.3) * 100)}%
                        </p>
                      </div>
                    </div>
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
