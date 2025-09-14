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
  Search, 
  Target, 
  Globe, 
  Eye,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle,
  Save,
  RefreshCw,
  ExternalLink,
  BarChart3,
  Zap,
  Shield,
  FileText
} from "lucide-react";

export default function SEOManagement() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [seoData, setSeoData] = useState({
    title: "Iwu Francis - Full Stack Web Developer",
    description: "Passionate full-stack developer creating beautiful, functional web applications. 5+ years experience with React, Node.js, and modern technologies.",
    keywords: "web developer, full stack developer, react developer, node.js, javascript, portfolio",
    author: "Iwu Francis",
    ogTitle: "Iwu Francis - Full Stack Web Developer Portfolio",
    ogDescription: "Explore my portfolio of web development projects and get in touch for your next project.",
    ogImage: "/api/placeholder/1200/630",
    twitterCard: "summary_large_image",
    twitterSite: "@iwufrancis",
    canonicalUrl: "https://iwufrancis.dev",
    robots: "index, follow",
    sitemap: "https://iwufrancis.dev/sitemap.xml"
  });

  const [analytics, setAnalytics] = useState({
    score: 94,
    issues: [
      { type: "warning", message: "Meta description is too long (160+ characters)", status: "warning" },
      { type: "success", message: "Title tag is optimized", status: "success" },
      { type: "success", message: "Images have alt attributes", status: "success" },
      { type: "error", message: "Missing structured data", status: "error" },
      { type: "warning", message: "Page load speed could be improved", status: "warning" }
    ],
    metrics: {
      pageSpeed: 87,
      mobileUsability: 95,
      seoScore: 94,
      accessibility: 92
    }
  });

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving SEO settings...", seoData);
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">SEO Management</h1>
            <p className="text-muted-foreground mt-2">
              Optimize your portfolio for search engines
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing...' : 'Analyze SEO'}</span>
            </Button>
            <Button
              onClick={handleSave}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
          </div>
        </div>

        {/* SEO Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                  <p className="text-3xl font-bold text-foreground">{analytics.score}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Page Speed</p>
                  <p className="text-3xl font-bold text-foreground">{analytics.metrics.pageSpeed}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mobile Usability</p>
                  <p className="text-3xl font-bold text-foreground">{analytics.metrics.mobileUsability}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Accessibility</p>
                  <p className="text-3xl font-bold text-foreground">{analytics.metrics.accessibility}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="meta">Meta Tags</TabsTrigger>
            <TabsTrigger value="content">Content SEO</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* SEO Issues */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>SEO Issues</span>
                  </CardTitle>
                  <CardDescription>
                    Current issues that need attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.issues.map((issue, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                        {getStatusIcon(issue.status)}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{issue.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                  <CardDescription>
                    Common SEO tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Test in Google Search Console
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Generate Sitemap
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Check Security
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Meta Tags Tab */}
          <TabsContent value="meta" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Meta Tags</span>
                </CardTitle>
                <CardDescription>
                  Configure your page's meta information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Page Title
                      </label>
                      <Input
                        value={seoData.title}
                        onChange={(e) => setSeoData({...seoData, title: e.target.value})}
                        placeholder="Your page title"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {seoData.title.length}/60 characters
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Meta Description
                      </label>
                      <Textarea
                        value={seoData.description}
                        onChange={(e) => setSeoData({...seoData, description: e.target.value})}
                        placeholder="Your page description"
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {seoData.description.length}/160 characters
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Keywords
                      </label>
                      <Input
                        value={seoData.keywords}
                        onChange={(e) => setSeoData({...seoData, keywords: e.target.value})}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Author
                      </label>
                      <Input
                        value={seoData.author}
                        onChange={(e) => setSeoData({...seoData, author: e.target.value})}
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Canonical URL
                      </label>
                      <Input
                        value={seoData.canonicalUrl}
                        onChange={(e) => setSeoData({...seoData, canonicalUrl: e.target.value})}
                        placeholder="https://yourdomain.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Robots
                      </label>
                      <Input
                        value={seoData.robots}
                        onChange={(e) => setSeoData({...seoData, robots: e.target.value})}
                        placeholder="index, follow"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Sitemap URL
                      </label>
                      <Input
                        value={seoData.sitemap}
                        onChange={(e) => setSeoData({...seoData, sitemap: e.target.value})}
                        placeholder="https://yourdomain.com/sitemap.xml"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Open Graph Tags */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Open Graph Tags</span>
                </CardTitle>
                <CardDescription>
                  Social media sharing optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        OG Title
                      </label>
                      <Input
                        value={seoData.ogTitle}
                        onChange={(e) => setSeoData({...seoData, ogTitle: e.target.value})}
                        placeholder="Your Open Graph title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        OG Description
                      </label>
                      <Textarea
                        value={seoData.ogDescription}
                        onChange={(e) => setSeoData({...seoData, ogDescription: e.target.value})}
                        placeholder="Your Open Graph description"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        OG Image URL
                      </label>
                      <Input
                        value={seoData.ogImage}
                        onChange={(e) => setSeoData({...seoData, ogImage: e.target.value})}
                        placeholder="https://yourdomain.com/og-image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Twitter Card Type
                      </label>
                      <Input
                        value={seoData.twitterCard}
                        onChange={(e) => setSeoData({...seoData, twitterCard: e.target.value})}
                        placeholder="summary_large_image"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Twitter Site
                      </label>
                      <Input
                        value={seoData.twitterSite}
                        onChange={(e) => setSeoData({...seoData, twitterSite: e.target.value})}
                        placeholder="@yourusername"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content SEO Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Content Optimization</span>
                </CardTitle>
                <CardDescription>
                  Optimize your content for better SEO
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Heading Structure</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">H1 tag is present and unique</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Proper heading hierarchy (H1 → H2 → H3)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Consider adding more H2 tags</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Content Quality</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Content is original and unique</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Good keyword density</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Content is well-structured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technical SEO Tab */}
          <TabsContent value="technical" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Technical SEO</span>
                </CardTitle>
                <CardDescription>
                  Technical aspects of your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Performance</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Page Load Speed</span>
                          <span className="text-sm font-medium text-green-600">87/100</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Mobile Usability</span>
                          <span className="text-sm font-medium text-green-600">95/100</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Accessibility</span>
                          <span className="text-sm font-medium text-green-600">92/100</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-4">Crawling</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Sitemap is accessible</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Robots.txt is present</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Consider adding structured data</span>
                        </div>
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
