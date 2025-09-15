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
  User,
  Save,
  RefreshCw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SecurityManagement() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoadingSecurity, setIsLoadingSecurity] = useState(true);
  const [securityData, setSecurityData] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [adminInfo, setAdminInfo] = useState({});
  const [isUpdatingCredentials, setIsUpdatingCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [credentialsForm, setCredentialsForm] = useState({
    currentPassword: '',
    newEmail: '',
    newPassword: '',
    newName: ''
  });

  // Fetch security data on component mount
  useEffect(() => {
    const fetchSecurityData = async () => {
      try {
        setIsLoadingSecurity(true);
        
        // Fetch security overview
        const overviewResponse = await fetch('/api/admin/security');
        if (overviewResponse.ok) {
          const overview = await overviewResponse.json();
          console.log('Security overview data:', overview);
          setSecurityData(overview);
        }

        // Fetch recent activity
        const activityResponse = await fetch('/api/admin/security?action=events');
        if (activityResponse.ok) {
          const activity = await activityResponse.json();
          console.log('Activity data:', activity);
          setRecentActivity(Array.isArray(activity) ? activity : []);
        }

        // Fetch vulnerabilities
        const vulnResponse = await fetch('/api/admin/security?action=vulnerabilities');
        if (vulnResponse.ok) {
          const vulns = await vulnResponse.json();
          console.log('Vulnerabilities data:', vulns);
          console.log('Type of vulnerabilities:', typeof vulns);
          console.log('Is array:', Array.isArray(vulns));
          
          // Ensure we have a proper array and filter out any invalid objects
          let validVulns = [];
          if (Array.isArray(vulns)) {
            validVulns = vulns.filter(vuln => {
              const isValid = vuln && typeof vuln === 'object' && vuln.id;
              if (!isValid) {
                console.log('Filtering out invalid vulnerability:', vuln);
              }
              return isValid;
            });
          } else {
            console.log('Vulnerabilities is not an array, setting to empty array');
          }
          
          console.log('Valid vulnerabilities:', validVulns);
          setVulnerabilities(validVulns);
        }

        // Fetch admin info
        const adminResponse = await fetch('/api/admin/security?action=admin');
        if (adminResponse.ok) {
          const admin = await adminResponse.json();
          setAdminInfo(admin);
          setCredentialsForm(prev => ({
            ...prev,
            newEmail: admin.email || '',
            newName: admin.name || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching security data:', error);
        toast.error('Failed to load security data');
      } finally {
        setIsLoadingSecurity(false);
      }
    };

    if (isAuthenticated) {
      fetchSecurityData();
    }
  }, [isAuthenticated]);

  // Ensure vulnerabilities is always an array
  useEffect(() => {
    if (!Array.isArray(vulnerabilities)) {
      console.log('Vulnerabilities is not an array, resetting to empty array');
      console.log('Current vulnerabilities value:', vulnerabilities);
      setVulnerabilities([]);
    }
  }, [vulnerabilities]);

  // Ensure recentActivity is always an array
  useEffect(() => {
    if (!Array.isArray(recentActivity)) {
      console.log('RecentActivity is not an array, resetting to empty array');
      setRecentActivity([]);
    }
  }, [recentActivity]);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Handle credential update
  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    
    try {
      setIsUpdatingCredentials(true);
      
      const response = await fetch('/api/admin/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-credentials',
          ...credentialsForm
        })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Admin credentials updated successfully!');
        setCredentialsForm({
          currentPassword: '',
          newEmail: result.admin.email,
          newPassword: '',
          newName: result.admin.name
        });
        setAdminInfo(result.admin);
      } else {
        toast.error(result.error || 'Failed to update credentials');
      }
    } catch (error) {
      console.error('Error updating credentials:', error);
      toast.error('Error updating credentials. Please try again.');
    } finally {
      setIsUpdatingCredentials(false);
    }
  };

  // Conditional returns after all hooks
  if (isLoading || isLoadingSecurity) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading security data...</p>
          </div>
        </div>
      </AdminLayout>
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
                  <p className="text-3xl font-bold text-foreground">{securityData.overallScore || 0}</p>
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
                  <p className="text-3xl font-bold text-foreground">{securityData.vulnerabilityCount || 0}</p>
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
                  <p className="text-3xl font-bold text-foreground">{securityData.threatsBlocked || 0}</p>
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
                  {Array.isArray(recentActivity) && recentActivity.length > 0 ? (
                    recentActivity.map((activity) => {
                      // Safety check to ensure activity is an object with required properties
                      if (!activity || typeof activity !== 'object' || !activity.id) {
                        return null;
                      }
                      
                      return (
                        <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30">
                          {getStatusIcon(activity.status || 'info')}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{activity.action || 'Unknown Action'}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{activity.user || 'Unknown User'}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Globe className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{activity.ip || 'Unknown IP'}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{activity.createdAt ? new Date(activity.createdAt).toLocaleString() : 'Unknown Time'}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No security events recorded yet.</p>
                    </div>
                  )}
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
                  {(() => {
                    // Final safety check
                    if (!Array.isArray(vulnerabilities)) {
                      console.error('CRITICAL: Vulnerabilities is not an array!', vulnerabilities);
                      return (
                        <div className="text-center py-8 text-muted-foreground">
                          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                          <p>No security vulnerabilities found!</p>
                          <p className="text-sm">Your portfolio is secure.</p>
                        </div>
                      );
                    }
                    
                    if (vulnerabilities.length === 0) {
                      return (
                        <div className="text-center py-8 text-muted-foreground">
                          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                          <p>No security vulnerabilities found!</p>
                          <p className="text-sm">Your portfolio is secure.</p>
                        </div>
                      );
                    }
                    
                    return vulnerabilities.map((vuln, index) => {
                      // Safety check to ensure vuln is an object with required properties
                      if (!vuln || typeof vuln !== 'object' || !vuln.id) {
                        console.log('Invalid vulnerability object at index', index, ':', vuln);
                        return null;
                      }
                      
                      return (
                        <div key={vuln.id || index} className="p-4 border border-border/50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-foreground">{vuln.title || 'Unknown Vulnerability'}</h4>
                                <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(vuln.severity || 'low')}`}>
                                  {(vuln.severity || 'low').toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{vuln.description || 'No description available'}</p>
                              {vuln.recommendation && (
                                <p className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                  <strong>Recommendation:</strong> {vuln.recommendation}
                                </p>
                              )}
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
                      );
                    });
                  })()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {/* Admin Credentials Management */}
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>Admin Credentials</span>
                </CardTitle>
                <CardDescription>Update your admin login credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateCredentials} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={credentialsForm.currentPassword}
                            onChange={(e) => setCredentialsForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            placeholder="Enter current password"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="newEmail">New Email</Label>
                        <Input
                          id="newEmail"
                          type="email"
                          value={credentialsForm.newEmail}
                          onChange={(e) => setCredentialsForm(prev => ({ ...prev, newEmail: e.target.value }))}
                          placeholder="Enter new email"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="newName">Display Name</Label>
                        <Input
                          id="newName"
                          type="text"
                          value={credentialsForm.newName}
                          onChange={(e) => setCredentialsForm(prev => ({ ...prev, newName: e.target.value }))}
                          placeholder="Enter display name"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={credentialsForm.newPassword}
                            onChange={(e) => setCredentialsForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            placeholder="Enter new password (optional)"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Password must be at least 8 characters with uppercase, lowercase, and number
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      <p>Current Admin: {adminInfo.email}</p>
                      <p>Last Updated: {adminInfo.updatedAt ? new Date(adminInfo.updatedAt).toLocaleDateString() : 'Unknown'}</p>
                    </div>
                    <Button
                      type="submit"
                      disabled={isUpdatingCredentials || !credentialsForm.currentPassword}
                      className="flex items-center space-x-2"
                    >
                      <Save className={`h-4 w-4 ${isUpdatingCredentials ? 'animate-pulse' : ''}`} />
                      <span>{isUpdatingCredentials ? 'Updating...' : 'Update Credentials'}</span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Security Settings */}
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
