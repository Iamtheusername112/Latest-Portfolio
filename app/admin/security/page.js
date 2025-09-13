"use client";

import { useAdmin } from "@/contexts/admin-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  EyeOff,
  Lock,
  Key,
  Activity,
  Clock,
  Globe,
  User
} from "lucide-react";

export default function SecurityManagement() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const securityMetrics = {
    overallScore: 92,
    vulnerabilities: 2,
    threatsBlocked: 156,
    lastScan: "2024-01-15 14:30:00"
  };

  const recentActivity = [
    { id: 1, action: "Successful login", user: "admin@example.com", ip: "192.168.1.100", time: "2 minutes ago", status: "success" },
    { id: 2, action: "Failed login attempt", user: "unknown@example.com", ip: "203.0.113.42", time: "15 minutes ago", status: "warning" },
    { id: 3, action: "Password changed", user: "admin@example.com", ip: "192.168.1.100", time: "1 hour ago", status: "info" },
    { id: 4, action: "Suspicious activity detected", user: "admin@example.com", ip: "198.51.100.1", time: "2 hours ago", status: "error" },
    { id: 5, action: "Two-factor authentication enabled", user: "admin@example.com", ip: "192.168.1.100", time: "3 hours ago", status: "success" }
  ];

  const vulnerabilities = [
    { id: 1, title: "Outdated dependencies", severity: "medium", description: "Some npm packages have known security vulnerabilities", status: "open" },
    { id: 2, title: "Weak password policy", severity: "low", description: "Password requirements could be strengthened", status: "open" }
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "info":
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-500 bg-red-50 dark:bg-red-900/20";
      case "medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "low":
        return "text-blue-500 bg-blue-50 dark:bg-blue-900/20";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Security Center</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage your portfolio's security
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>Run Security Scan</span>
            </Button>
          </div>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Security Score</p>
                  <p className="text-3xl font-bold text-foreground">{securityMetrics.overallScore}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vulnerabilities</p>
                  <p className="text-3xl font-bold text-foreground">{securityMetrics.vulnerabilities}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Threats Blocked</p>
                  <p className="text-3xl font-bold text-foreground">{securityMetrics.threatsBlocked}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Scan</p>
                  <p className="text-sm font-bold text-foreground">2 min ago</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Security Status</CardTitle>
                  <CardDescription>Current security posture</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">SSL Certificate</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">Valid</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Firewall</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">Active</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Two-Factor Auth</span>
                      <div className="flex items-center space-x-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium text-red-600">Disabled</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Password Policy</span>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-600">Weak</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardHeader>
                  <CardTitle>Recent Threats</CardTitle>
                  <CardDescription>Latest security events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Suspicious login attempt</p>
                        <p className="text-xs text-muted-foreground">IP: 198.51.100.1</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Failed login attempt</p>
                        <p className="text-xs text-muted-foreground">IP: 203.0.113.42</p>
                      </div>
                      <span className="text-xs text-muted-foreground">15m ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Security scan completed</p>
                        <p className="text-xs text-muted-foreground">No new threats found</p>
                      </div>
                      <span className="text-xs text-muted-foreground">1h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Security Activity Log</CardTitle>
                <CardDescription>Recent security-related activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30">
                      {getStatusIcon(activity.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{activity.user}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Globe className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{activity.ip}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vulnerabilities Tab */}
          <TabsContent value="vulnerabilities" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Security Vulnerabilities</CardTitle>
                <CardDescription>Known security issues that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vulnerabilities.map((vuln) => (
                    <div key={vuln.id} className="p-4 border border-border/50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-foreground">{vuln.title}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(vuln.severity)}`}>
                              {vuln.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{vuln.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm">
                            Fix Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security policies and monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Access Control</h4>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Require strong passwords</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" />
                          <span className="text-sm">Enable two-factor authentication</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Session timeout after inactivity</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" />
                          <span className="text-sm">IP whitelist only</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Monitoring</h4>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Real-time threat detection</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Email security alerts</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" />
                          <span className="text-sm">SMS notifications</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Automated security scans</span>
                        </label>
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
