"use client";

import { useAdmin } from "@/contexts/admin-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  BarChart3, 
  Activity, 
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function PerformanceManagement() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const performanceData = [
    { name: "Jan", score: 85, loadTime: 2.1, requests: 45 },
    { name: "Feb", score: 88, loadTime: 1.9, requests: 42 },
    { name: "Mar", score: 92, loadTime: 1.6, requests: 38 },
    { name: "Apr", score: 89, loadTime: 1.8, requests: 41 },
    { name: "May", score: 94, loadTime: 1.4, requests: 35 },
    { name: "Jun", score: 96, loadTime: 1.2, requests: 32 },
  ];

  const currentMetrics = {
    pageSpeed: 96,
    loadTime: 1.2,
    requests: 32,
    bundleSize: "245 KB",
    images: "1.2 MB",
    scripts: "180 KB",
    styles: "65 KB"
  };

  const recommendations = [
    {
      type: "success",
      title: "Great! Your site is optimized",
      description: "Your performance metrics are excellent. Keep up the good work!",
      icon: CheckCircle
    },
    {
      type: "warning",
      title: "Consider image optimization",
      description: "Some images could be compressed further to improve load times.",
      icon: AlertTriangle
    },
    {
      type: "info",
      title: "Enable caching",
      description: "Implement browser caching to improve repeat visit performance.",
      icon: Clock
    }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
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
            <h1 className="text-3xl font-bold gradient-text">Performance Management</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and optimize your website's performance
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
              <span>{isAnalyzing ? 'Analyzing...' : 'Run Analysis'}</span>
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Page Speed Score</p>
                  <p className="text-3xl font-bold text-foreground">{currentMetrics.pageSpeed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Load Time</p>
                  <p className="text-3xl font-bold text-foreground">{currentMetrics.loadTime}s</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">HTTP Requests</p>
                  <p className="text-3xl font-bold text-foreground">{currentMetrics.requests}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bundle Size</p>
                  <p className="text-3xl font-bold text-foreground">{currentMetrics.bundleSize}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Your site's performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Load Time Analysis</CardTitle>
                  <CardDescription>Page load times by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="loadTime" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Performance Recommendations</CardTitle>
                <CardDescription>Tips to improve your site's performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => {
                    const Icon = rec.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30">
                        <Icon className={`h-5 w-5 mt-0.5 ${
                          rec.type === 'success' ? 'text-green-500' :
                          rec.type === 'warning' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                        <div>
                          <h4 className="font-semibold text-foreground">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Resource Breakdown</CardTitle>
                  <CardDescription>Size distribution of your assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Images</span>
                      <span className="font-semibold">{currentMetrics.images}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">JavaScript</span>
                      <span className="font-semibold">{currentMetrics.scripts}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">CSS</span>
                      <span className="font-semibold">{currentMetrics.styles}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Bundle</span>
                      <span className="font-semibold">{currentMetrics.bundleSize}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Performance Score</CardTitle>
                  <CardDescription>Detailed performance breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Performance</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                        <span className="text-sm font-semibold">96</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Accessibility</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-sm font-semibold">92</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Best Practices</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                        <span className="text-sm font-semibold">95</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">SEO</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                        <span className="text-sm font-semibold">94</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Optimization Tab */}
          <TabsContent value="optimization" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Optimization Tools</CardTitle>
                <CardDescription>Tools to improve your site's performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-6 w-6" />
                    <span>Optimize Images</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Trash2 className="h-6 w-6" />
                    <span>Clean Cache</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Download className="h-6 w-6" />
                    <span>Minify Assets</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Zap className="h-6 w-6" />
                    <span>Enable Compression</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
