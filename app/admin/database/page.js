"use client";

import { useAdmin } from "@/contexts/admin-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Activity, 
  Download, 
  Upload,
  Trash2,
  RefreshCw,
  Settings,
  BarChart3,
  HardDrive,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DatabaseManagement() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const dbMetrics = {
    totalSize: "2.4 GB",
    usedSpace: "1.8 GB",
    freeSpace: "0.6 GB",
    connections: 12,
    queries: 1250,
    uptime: "15 days, 8 hours"
  };

  const performanceData = [
    { name: "00:00", queries: 45, connections: 8, responseTime: 120 },
    { name: "04:00", queries: 32, connections: 5, responseTime: 95 },
    { name: "08:00", queries: 78, connections: 15, responseTime: 150 },
    { name: "12:00", queries: 125, connections: 22, responseTime: 180 },
    { name: "16:00", queries: 98, connections: 18, responseTime: 140 },
    { name: "20:00", queries: 67, connections: 12, responseTime: 110 }
  ];

  const tables = [
    { name: "users", rows: 1250, size: "45.2 MB", lastUpdated: "2024-01-15 14:30:00" },
    { name: "projects", rows: 89, size: "12.8 MB", lastUpdated: "2024-01-15 14:25:00" },
    { name: "media", rows: 456, size: "1.2 GB", lastUpdated: "2024-01-15 14:20:00" },
    { name: "settings", rows: 15, size: "0.1 MB", lastUpdated: "2024-01-15 14:15:00" },
    { name: "logs", rows: 5670, size: "89.3 MB", lastUpdated: "2024-01-15 14:30:00" }
  ];

  const recentBackups = [
    { id: 1, name: "backup_2024_01_15_02_00.sql", size: "2.1 GB", created: "2024-01-15 02:00:00", status: "completed" },
    { id: 2, name: "backup_2024_01_14_02_00.sql", size: "2.0 GB", created: "2024-01-14 02:00:00", status: "completed" },
    { id: 3, name: "backup_2024_01_13_02_00.sql", size: "1.9 GB", created: "2024-01-13 02:00:00", status: "completed" },
    { id: 4, name: "backup_2024_01_12_02_00.sql", size: "1.8 GB", created: "2024-01-12 02:00:00", status: "failed" }
  ];

  const handleBackup = () => {
    console.log("Creating database backup...");
  };

  const handleRestore = () => {
    console.log("Restoring database...");
  };

  const handleOptimize = () => {
    console.log("Optimizing database...");
  };

  const handleCleanup = () => {
    console.log("Cleaning up database...");
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
            <h1 className="text-3xl font-bold gradient-text">Database Management</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage your portfolio database
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleOptimize}
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Optimize</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleBackup}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Backup</span>
            </Button>
          </div>
        </div>

        {/* Database Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Size</p>
                  <p className="text-3xl font-bold text-foreground">{dbMetrics.totalSize}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <HardDrive className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Connections</p>
                  <p className="text-3xl font-bold text-foreground">{dbMetrics.connections}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Queries Today</p>
                  <p className="text-3xl font-bold text-foreground">{dbMetrics.queries}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                  <p className="text-sm font-bold text-foreground">{dbMetrics.uptime}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Database Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Database performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="queries" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="connections" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Storage Usage</CardTitle>
                  <CardDescription>Database storage breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Used Space</span>
                      <span className="font-semibold">{dbMetrics.usedSpace}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Free Space</span>
                      <span className="font-semibold">{dbMetrics.freeSpace}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Database Status */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Database Status</CardTitle>
                <CardDescription>Current database health and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-foreground">Database Status</h4>
                    <p className="text-sm text-green-600">Online</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Activity className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-foreground">Performance</h4>
                    <p className="text-sm text-blue-600">Good</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h4 className="font-semibold text-foreground">Maintenance</h4>
                    <p className="text-sm text-yellow-600">Due Soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tables Tab */}
          <TabsContent value="tables" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Database Tables</CardTitle>
                <CardDescription>Overview of all database tables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tables.map((table, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Database className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{table.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {table.rows.toLocaleString()} rows • {table.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          Updated: {table.lastUpdated}
                        </span>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backups Tab */}
          <TabsContent value="backups" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Database Backups</CardTitle>
                <CardDescription>Manage your database backups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBackups.map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <Download className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{backup.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {backup.size} • Created: {backup.created}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          backup.status === 'completed' 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/20' 
                            : 'bg-red-100 text-red-600 dark:bg-red-900/20'
                        }`}>
                          {backup.status}
                        </span>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Database Maintenance</CardTitle>
                <CardDescription>Perform maintenance tasks on your database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Optimization</h4>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        onClick={handleOptimize}
                        className="w-full justify-start"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Optimize Tables
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCleanup}
                        className="w-full justify-start"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clean Up Logs
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Rebuild Indexes
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Backup & Restore</h4>
                    <div className="space-y-3">
                      <Button
                        onClick={handleBackup}
                        className="w-full justify-start"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Create Backup
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleRestore}
                        className="w-full justify-start"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Restore Backup
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Schedule Backups
                      </Button>
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
