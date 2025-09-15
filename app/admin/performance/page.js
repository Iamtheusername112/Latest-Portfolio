"use client";

import { useAdmin } from "@/contexts/admin-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
  const [isLoadingPerformance, setIsLoadingPerformance] = useState(true);
  const [performanceData, setPerformanceData] = useState([]);
  const [currentMetrics, setCurrentMetrics] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [stats, setStats] = useState({});

  // Fetch performance data on component mount
  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setIsLoadingPerformance(true);
        
        // Fetch current metrics
        const metricsResponse = await fetch('/api/admin/performance');
        if (metricsResponse.ok) {
          const metrics = await metricsResponse.json();
          setCurrentMetrics(metrics);
        }

        // Fetch trends data
        const trendsResponse = await fetch('/api/admin/performance?action=trends');
        if (trendsResponse.ok) {
          const trends = await trendsResponse.json();
          setPerformanceData(trends);
        }

        // Fetch analysis and recommendations
        const analysisResponse = await fetch('/api/admin/performance?action=analyze');
        if (analysisResponse.ok) {
          const analysis = await analysisResponse.json();
          setRecommendations(analysis.recommendations || []);
        }

        // Fetch stats
        const statsResponse = await fetch('/api/admin/performance?action=stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }
      } catch (error) {
        console.error('Error fetching performance data:', error);
        toast.error('Failed to load performance data');
      } finally {
        setIsLoadingPerformance(false);
      }
    };

    if (isAuthenticated) {
      fetchPerformanceData();
    }
  }, [isAuthenticated]);

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      
      // Run performance measurement
      const response = await fetch('/api/admin/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'measure' })
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Performance analysis completed!');
        
        // Refresh data
        const metricsResponse = await fetch('/api/admin/performance');
        if (metricsResponse.ok) {
          const metrics = await metricsResponse.json();
          setCurrentMetrics(metrics);
        }
      } else {
        toast.error('Failed to run performance analysis');
      }
    } catch (error) {
      console.error('Error running analysis:', error);
      toast.error('Error running performance analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Conditional returns after all hooks
  if (isLoading || isLoadingPerformance) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading performance data...</p>
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
                  <p className="text-3xl font-bold text-foreground">{currentMetrics.pageSpeed || 0}</p>
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
                  <p className="text-3xl font-bold text-foreground">{currentMetrics.loadTime || 0}s</p>
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
                  <p className="text-3xl font-bold text-foreground">{currentMetrics.requests || 0}</p>
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
                  <p className="text-3xl font-bold text-foreground">{currentMetrics.bundleSize ? `${currentMetrics.bundleSize} KB` : '0 KB'}</p>
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
                  {recommendations.length > 0 ? (
                    recommendations.map((rec, index) => {
                      const Icon = rec.type === 'success' ? CheckCircle : 
                                  rec.type === 'warning' ? AlertTriangle : Clock;
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
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No performance data available. Click "Run Analysis" to get started.</p>
                    </div>
                  )}
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
                      <span className="font-semibold">{currentMetrics.images ? `${currentMetrics.images} KB` : '0 KB'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">JavaScript</span>
                      <span className="font-semibold">{currentMetrics.scripts ? `${currentMetrics.scripts} KB` : '0 KB'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">CSS</span>
                      <span className="font-semibold">{currentMetrics.styles ? `${currentMetrics.styles} KB` : '0 KB'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Bundle</span>
                      <span className="font-semibold">{currentMetrics.bundleSize ? `${currentMetrics.bundleSize} KB` : '0 KB'}</span>
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
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${currentMetrics.pageSpeed || 0}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold">{currentMetrics.pageSpeed || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Accessibility</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${currentMetrics.accessibility || 0}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold">{currentMetrics.accessibility || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Best Practices</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${currentMetrics.bestPractices || 0}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold">{currentMetrics.bestPractices || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">SEO</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${currentMetrics.seo || 0}%` }}></div>
                        </div>
                        <span className="text-sm font-semibold">{currentMetrics.seo || 0}</span>
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
