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
  const [isLoadingDatabase, setIsLoadingDatabase] = useState(true);
  const [dbMetrics, setDbMetrics] = useState({});
  const [performanceData, setPerformanceData] = useState([]);
  const [tables, setTables] = useState([]);
  const [recentBackups, setRecentBackups] = useState([]);
  const [dbStatus, setDbStatus] = useState({});
  const [dbHealth, setDbHealth] = useState({});
  const [isPerformingAction, setIsPerformingAction] = useState(false);

  // Fetch database data on component mount
  useEffect(() => {
    const fetchDatabaseData = async () => {
      try {
        setIsLoadingDatabase(true);
        
        // Fetch comprehensive database overview
        const overviewResponse = await fetch('/api/admin/database');
        if (overviewResponse.ok) {
          const overview = await overviewResponse.json();
          setDbMetrics(overview.metrics || {});
          setDbStatus(overview.status || {});
          setTables(overview.tables || []);
          setPerformanceData(overview.performance || []);
          setDbHealth(overview.health || {});
        }

        // Fetch backups
        const backupsResponse = await fetch('/api/admin/database?action=backups');
        if (backupsResponse.ok) {
          const backups = await backupsResponse.json();
          setRecentBackups(backups);
        }
      } catch (error) {
        console.error('Error fetching database data:', error);
        toast.error('Failed to load database data');
      } finally {
        setIsLoadingDatabase(false);
      }
    };

    if (isAuthenticated) {
      fetchDatabaseData();
    }
  }, [isAuthenticated]);

  const handleBackup = async () => {
    try {
      setIsPerformingAction(true);
      
      const response = await fetch('/api/admin/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'backup' })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Database backup created successfully!');
        // Refresh backups list
        const backupsResponse = await fetch('/api/admin/database?action=backups');
        if (backupsResponse.ok) {
          const backups = await backupsResponse.json();
          setRecentBackups(backups);
        }
      } else {
        toast.error(result.error || 'Failed to create backup');
      }
    } catch (error) {
      console.error('Error creating backup:', error);
      toast.error('Error creating backup. Please try again.');
    } finally {
      setIsPerformingAction(false);
    }
  };

  const handleRestore = () => {
    toast.info('Restore functionality coming soon!');
  };

  const handleOptimize = async () => {
    try {
      setIsPerformingAction(true);
      
      const response = await fetch('/api/admin/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'optimize' })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Database optimization completed successfully!');
        // Refresh database data
        const overviewResponse = await fetch('/api/admin/database');
        if (overviewResponse.ok) {
          const overview = await overviewResponse.json();
          setDbMetrics(overview.metrics || {});
          setDbStatus(overview.status || {});
          setTables(overview.tables || []);
        }
      } else {
        toast.error(result.error || 'Failed to optimize database');
      }
    } catch (error) {
      console.error('Error optimizing database:', error);
      toast.error('Error optimizing database. Please try again.');
    } finally {
      setIsPerformingAction(false);
    }
  };

  const handleCleanup = async () => {
    try {
      setIsPerformingAction(true);
      
      const response = await fetch('/api/admin/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cleanup' })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Log cleanup completed successfully!');
        // Refresh database data
        const overviewResponse = await fetch('/api/admin/database');
        if (overviewResponse.ok) {
          const overview = await overviewResponse.json();
          setDbMetrics(overview.metrics || {});
          setDbStatus(overview.status || {});
          setTables(overview.tables || []);
        }
      } else {
        toast.error(result.error || 'Failed to cleanup logs');
      }
    } catch (error) {
      console.error('Error cleaning up logs:', error);
      toast.error('Error cleaning up logs. Please try again.');
    } finally {
      setIsPerformingAction(false);
    }
  };

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Conditional returns after all hooks
  if (isLoading || isLoadingDatabase) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading database data...</p>
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
                  <p className="text-3xl font-bold text-foreground">{dbMetrics.totalSize || '0 Bytes'}</p>
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
                  <p className="text-3xl font-bold text-foreground">{dbMetrics.connections || 0}</p>
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
                  <p className="text-3xl font-bold text-foreground">{dbMetrics.queries || 0}</p>
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
                  <p className="text-sm font-bold text-foreground">{dbMetrics.uptime || 'Unknown'}</p>
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
                      <span className="font-semibold">{dbMetrics.usedSpace || '0 Bytes'}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ 
                          width: dbMetrics.totalSizeBytes && dbMetrics.usedSpaceBytes 
                            ? `${(dbMetrics.usedSpaceBytes / dbMetrics.totalSizeBytes) * 100}%` 
                            : '0%' 
                        }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Free Space</span>
                      <span className="font-semibold">{dbMetrics.freeSpace || '0 Bytes'}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ 
                          width: dbMetrics.totalSizeBytes && dbMetrics.freeSpaceBytes 
                            ? `${(dbMetrics.freeSpaceBytes / dbMetrics.totalSizeBytes) * 100}%` 
                            : '0%' 
                        }}
                      ></div>
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
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      dbStatus.status === 'online' 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : 'bg-red-100 dark:bg-red-900'
                    }`}>
                      {dbStatus.status === 'online' ? (
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                      )}
                    </div>
                    <h4 className="font-semibold text-foreground">Database Status</h4>
                    <p className={`text-sm ${
                      dbStatus.status === 'online' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {dbStatus.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      dbHealth.healthScore > 80 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : dbHealth.healthScore > 60 
                        ? 'bg-yellow-100 dark:bg-yellow-900'
                        : 'bg-red-100 dark:bg-red-900'
                    }`}>
                      <Activity className={`h-8 w-8 ${
                        dbHealth.healthScore > 80 
                          ? 'text-green-600' 
                          : dbHealth.healthScore > 60 
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`} />
                    </div>
                    <h4 className="font-semibold text-foreground">Health Score</h4>
                    <p className={`text-sm ${
                      dbHealth.healthScore > 80 
                        ? 'text-green-600' 
                        : dbHealth.healthScore > 60 
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {dbHealth.healthScore || 0}%
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Database className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-foreground">Connections</h4>
                    <p className="text-sm text-blue-600">{dbStatus.totalConnections || 0}</p>
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
                  {Array.isArray(tables) && tables.length > 0 ? (
                    tables.map((table, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Database className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{table.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {table.rows?.toLocaleString() || 0} rows • {table.size || '0 Bytes'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            Updated: {table.lastUpdated ? new Date(table.lastUpdated).toLocaleString() : 'Unknown'}
                          </span>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Database className="h-12 w-12 mx-auto mb-4" />
                      <p>No tables found or loading...</p>
                    </div>
                  )}
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
                  {Array.isArray(recentBackups) && recentBackups.length > 0 ? (
                    recentBackups.map((backup) => (
                      <div key={backup.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <Download className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{backup.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {backup.size} • Created: {backup.created ? new Date(backup.created).toLocaleString() : 'Unknown'}
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
                          <Button variant="outline" size="sm" onClick={handleRestore}>
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
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Download className="h-12 w-12 mx-auto mb-4" />
                      <p>No backups found or loading...</p>
                    </div>
                  )}
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
                        disabled={isPerformingAction}
                        className="w-full justify-start"
                      >
                        <Settings className={`h-4 w-4 mr-2 ${isPerformingAction ? 'animate-spin' : ''}`} />
                        {isPerformingAction ? 'Optimizing...' : 'Optimize Tables'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCleanup}
                        disabled={isPerformingAction}
                        className="w-full justify-start"
                      >
                        <Trash2 className={`h-4 w-4 mr-2 ${isPerformingAction ? 'animate-spin' : ''}`} />
                        {isPerformingAction ? 'Cleaning...' : 'Clean Up Logs'}
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
                        disabled={isPerformingAction}
                        className="w-full justify-start"
                      >
                        <Download className={`h-4 w-4 mr-2 ${isPerformingAction ? 'animate-spin' : ''}`} />
                        {isPerformingAction ? 'Creating...' : 'Create Backup'}
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
