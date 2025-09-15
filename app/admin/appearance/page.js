"use client";

import { useAdmin } from "@/contexts/admin-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Type, 
  Layout, 
  Image,
  Save,
  Eye,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus
} from "lucide-react";

export default function AppearanceSettings() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("colors");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoadingAppearance, setIsLoadingAppearance] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [appearanceData, setAppearanceData] = useState({
    colors: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#06b6d4",
      background: "#ffffff",
      foreground: "#0f0f0f",
      muted: "#f4f4f5",
      mutedForeground: "#71717a",
      border: "#e4e4e7",
      input: "#ffffff",
      ring: "#6366f1"
    },
    typography: {
      fontFamily: "Inter",
      headingFont: "Inter",
      bodyFont: "Inter",
      fontSize: "16px",
      lineHeight: "1.6",
      letterSpacing: "0.025em"
    },
    layout: {
      maxWidth: "1200px",
      padding: "2rem",
      borderRadius: "0.5rem",
      shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      animation: "smooth"
    },
    theme: {
      mode: "system",
      glassmorphism: true,
      gradients: true,
      animations: true,
      particles: false
    }
  });

  const fontOptions = [
    "Inter", "Roboto", "Open Sans", "Lato", "Poppins", 
    "Montserrat", "Source Sans Pro", "Nunito", "Raleway", "Ubuntu"
  ];

  const colorPresets = [
    {
      name: "Default",
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#06b6d4"
      }
    },
    {
      name: "Ocean",
      colors: {
        primary: "#0ea5e9",
        secondary: "#06b6d4",
        accent: "#14b8a6"
      }
    },
    {
      name: "Sunset",
      colors: {
        primary: "#f59e0b",
        secondary: "#ef4444",
        accent: "#ec4899"
      }
    },
    {
      name: "Forest",
      colors: {
        primary: "#22c55e",
        secondary: "#16a34a",
        accent: "#84cc16"
      }
    },
    {
      name: "Purple",
      colors: {
        primary: "#8b5cf6",
        secondary: "#a855f7",
        accent: "#c084fc"
      }
    }
  ];

  const handleColorChange = (colorKey, value) => {
    setAppearanceData({
      ...appearanceData,
      colors: {
        ...appearanceData.colors,
        [colorKey]: value
      }
    });
  };

  const handlePresetApply = (preset) => {
    setAppearanceData({
      ...appearanceData,
      colors: {
        ...appearanceData.colors,
        ...preset.colors
      }
    });
  };

  // Fetch appearance settings on component mount
  useEffect(() => {
    const fetchAppearanceSettings = async () => {
      try {
        setIsLoadingAppearance(true);
        const response = await fetch('/api/admin/appearance');
        if (response.ok) {
          const data = await response.json();
          setAppearanceData(data);
        } else {
          console.error('Failed to fetch appearance settings');
        }
      } catch (error) {
        console.error('Error fetching appearance settings:', error);
      } finally {
        setIsLoadingAppearance(false);
      }
    };

    if (isAuthenticated) {
      fetchAppearanceSettings();
    }
  }, [isAuthenticated]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/admin/appearance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appearanceData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Appearance settings saved successfully:', result);
        toast.success('Appearance settings saved successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to save appearance settings:', errorData);
        toast.error(`Failed to save appearance settings: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving appearance settings:', error);
      toast.error('Error saving appearance settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    // Reset to default values
    setAppearanceData({
      colors: {
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#06b6d4",
        background: "#ffffff",
        foreground: "#0f0f0f",
        muted: "#f4f4f5",
        mutedForeground: "#71717a",
        border: "#e4e4e7",
        input: "#ffffff",
        ring: "#6366f1"
      },
      typography: {
        fontFamily: "Inter",
        headingFont: "Inter",
        bodyFont: "Inter",
        fontSize: "16px",
        lineHeight: "1.6",
        letterSpacing: "0.025em"
      },
      layout: {
        maxWidth: "1200px",
        padding: "2rem",
        borderRadius: "0.5rem",
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        animation: "smooth"
      },
      theme: {
        mode: "system",
        glassmorphism: true,
        gradients: true,
        animations: true,
        particles: false
      }
    });
  };

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Conditional returns after all hooks
  if (isLoading || isLoadingAppearance) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading appearance settings...</p>
          </div>
        </div>
      </AdminLayout>
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
            <h1 className="text-3xl font-bold gradient-text">Appearance Settings</h1>
            <p className="text-muted-foreground mt-2">
              Customize the look and feel of your portfolio
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>{isPreviewMode ? 'Exit Preview' : 'Preview'}</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reset</span>
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

        {/* Appearance Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Color Presets */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Color Presets</span>
                  </CardTitle>
                  <CardDescription>
                    Choose from pre-designed color schemes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {colorPresets.map((preset, index) => (
                      <div
                        key={index}
                        className="p-4 border border-border/50 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handlePresetApply(preset)}
                      >
                        <div className="flex space-x-2 mb-2">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: preset.colors.primary }}
                          />
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: preset.colors.secondary }}
                          />
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: preset.colors.accent }}
                          />
                        </div>
                        <p className="text-sm font-medium">{preset.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Custom Colors */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Custom Colors</span>
                  </CardTitle>
                  <CardDescription>
                    Fine-tune your color palette
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(appearanceData.colors).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-4">
                      <div className="w-24">
                        <label className="block text-sm font-medium text-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                      </div>
                      <div className="flex-1">
                        <Input
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="w-full h-10"
                        />
                      </div>
                      <div className="w-20">
                        <Input
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Type className="h-5 w-5" />
                  <span>Typography Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure fonts and text styling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Font Family
                      </label>
                      <select
                        value={appearanceData.typography.fontFamily}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          typography: { ...appearanceData.typography, fontFamily: e.target.value }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        {fontOptions.map((font) => (
                          <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Heading Font
                      </label>
                      <select
                        value={appearanceData.typography.headingFont}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          typography: { ...appearanceData.typography, headingFont: e.target.value }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        {fontOptions.map((font) => (
                          <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Body Font
                      </label>
                      <select
                        value={appearanceData.typography.bodyFont}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          typography: { ...appearanceData.typography, bodyFont: e.target.value }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        {fontOptions.map((font) => (
                          <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Font Size
                      </label>
                      <Input
                        value={appearanceData.typography.fontSize}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          typography: { ...appearanceData.typography, fontSize: e.target.value }
                        })}
                        placeholder="16px"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Line Height
                      </label>
                      <Input
                        value={appearanceData.typography.lineHeight}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          typography: { ...appearanceData.typography, lineHeight: e.target.value }
                        })}
                        placeholder="1.6"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Letter Spacing
                      </label>
                      <Input
                        value={appearanceData.typography.letterSpacing}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          typography: { ...appearanceData.typography, letterSpacing: e.target.value }
                        })}
                        placeholder="0.025em"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layout className="h-5 w-5" />
                  <span>Layout Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure spacing, borders, and layout options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Max Width
                      </label>
                      <Input
                        value={appearanceData.layout.maxWidth}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          layout: { ...appearanceData.layout, maxWidth: e.target.value }
                        })}
                        placeholder="1200px"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Padding
                      </label>
                      <Input
                        value={appearanceData.layout.padding}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          layout: { ...appearanceData.layout, padding: e.target.value }
                        })}
                        placeholder="2rem"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Border Radius
                      </label>
                      <Input
                        value={appearanceData.layout.borderRadius}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          layout: { ...appearanceData.layout, borderRadius: e.target.value }
                        })}
                        placeholder="0.5rem"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Box Shadow
                      </label>
                      <Input
                        value={appearanceData.layout.shadow}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          layout: { ...appearanceData.layout, shadow: e.target.value }
                        })}
                        placeholder="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Animation Style
                      </label>
                      <select
                        value={appearanceData.layout.animation}
                        onChange={(e) => setAppearanceData({
                          ...appearanceData,
                          layout: { ...appearanceData.layout, animation: e.target.value }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        <option value="smooth">Smooth</option>
                        <option value="bounce">Bounce</option>
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Tab */}
          <TabsContent value="theme" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Theme Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure theme mode and visual effects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Theme Mode
                    </label>
                    <select
                      value={appearanceData.theme.mode}
                      onChange={(e) => setAppearanceData({
                        ...appearanceData,
                        theme: { ...appearanceData.theme, mode: e.target.value }
                      })}
                      className="w-full p-2 border border-border rounded-md bg-background"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-foreground">Visual Effects</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={appearanceData.theme.glassmorphism}
                          onChange={(e) => setAppearanceData({
                            ...appearanceData,
                            theme: { ...appearanceData.theme, glassmorphism: e.target.checked }
                          })}
                        />
                        <span className="text-sm">Glassmorphism Effects</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={appearanceData.theme.gradients}
                          onChange={(e) => setAppearanceData({
                            ...appearanceData,
                            theme: { ...appearanceData.theme, gradients: e.target.checked }
                          })}
                        />
                        <span className="text-sm">Gradient Backgrounds</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={appearanceData.theme.animations}
                          onChange={(e) => setAppearanceData({
                            ...appearanceData,
                            theme: { ...appearanceData.theme, animations: e.target.checked }
                          })}
                        />
                        <span className="text-sm">Smooth Animations</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={appearanceData.theme.particles}
                          onChange={(e) => setAppearanceData({
                            ...appearanceData,
                            theme: { ...appearanceData.theme, particles: e.target.checked }
                          })}
                        />
                        <span className="text-sm">Particle Effects</span>
                      </label>
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
