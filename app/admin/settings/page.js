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
  Settings, 
  User, 
  Shield, 
  Database,
  Mail,
  Bell,
  Globe,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2
} from "lucide-react";

export default function SettingsPage() {
  const { isAuthenticated, isLoading, user } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState({
    general: {
      siteName: "John Doe Portfolio",
      siteDescription: "Full Stack Web Developer Portfolio",
      siteUrl: "https://johndoe.dev",
      adminEmail: "admin@johndoe.dev",
      timezone: "UTC",
      language: "en",
      maintenanceMode: false
    },
    user: {
      name: user?.email?.split("@")[0] || "Admin",
      email: user?.email || "admin@example.com",
      role: "Administrator",
      lastLogin: "2024-01-15 14:30:00",
      notifications: true,
      emailNotifications: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
      ipWhitelist: "",
      sslEnabled: true
    },
    notifications: {
      emailAlerts: true,
      systemAlerts: true,
      performanceAlerts: true,
      securityAlerts: true,
      weeklyReports: true,
      monthlyReports: false
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      retentionDays: 30,
      lastBackup: "2024-01-15 02:00:00",
      backupLocation: "cloud"
    }
  });

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving settings...", settings);
  };

  const handleReset = () => {
    // Reset to default values
    window.location.reload();
  };

  const handleBackup = () => {
    console.log("Creating backup...");
  };

  const handleRestore = () => {
    console.log("Restoring from backup...");
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
            <h1 className="text-3xl font-bold gradient-text">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Configure your portfolio and admin settings
            </p>
          </div>
          <div className="flex items-center space-x-2">
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
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>General Settings</span>
                </CardTitle>
                <CardDescription>
                  Basic site configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Site Name
                      </label>
                      <Input
                        value={settings.general.siteName}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, siteName: e.target.value }
                        })}
                        placeholder="Your Portfolio"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Site URL
                      </label>
                      <Input
                        value={settings.general.siteUrl}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, siteUrl: e.target.value }
                        })}
                        placeholder="https://yourdomain.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Admin Email
                      </label>
                      <Input
                        value={settings.general.adminEmail}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, adminEmail: e.target.value }
                        })}
                        placeholder="admin@yourdomain.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Site Description
                      </label>
                      <Textarea
                        value={settings.general.siteDescription}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, siteDescription: e.target.value }
                        })}
                        placeholder="Brief description of your portfolio"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, timezone: e.target.value }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Language
                      </label>
                      <select
                        value={settings.general.language}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: { ...settings.general, language: e.target.value }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="pt">Portuguese</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="maintenance"
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, maintenanceMode: e.target.checked }
                    })}
                  />
                  <label htmlFor="maintenance" className="text-sm font-medium text-foreground">
                    Enable maintenance mode
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Settings */}
          <TabsContent value="user" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>User Profile</span>
                </CardTitle>
                <CardDescription>
                  Manage your admin account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Display Name
                      </label>
                      <Input
                        value={settings.user.name}
                        onChange={(e) => setSettings({
                          ...settings,
                          user: { ...settings.user, name: e.target.value }
                        })}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Input
                        value={settings.user.email}
                        onChange={(e) => setSettings({
                          ...settings,
                          user: { ...settings.user, email: e.target.value }
                        })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Role
                      </label>
                      <Input
                        value={settings.user.role}
                        disabled
                        placeholder="Administrator"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Login
                      </label>
                      <Input
                        value={settings.user.lastLogin}
                        disabled
                        placeholder="Never"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Notification Preferences
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={settings.user.notifications}
                            onChange={(e) => setSettings({
                              ...settings,
                              user: { ...settings.user, notifications: e.target.checked }
                            })}
                          />
                          <span className="text-sm">Enable notifications</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={settings.user.emailNotifications}
                            onChange={(e) => setSettings({
                              ...settings,
                              user: { ...settings.user, emailNotifications: e.target.checked }
                            })}
                          />
                          <span className="text-sm">Email notifications</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Session Timeout (minutes)
                      </label>
                      <Input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                        })}
                        placeholder="30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Password Expiry (days)
                      </label>
                      <Input
                        type="number"
                        value={settings.security.passwordExpiry}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, passwordExpiry: parseInt(e.target.value) }
                        })}
                        placeholder="90"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Max Login Attempts
                      </label>
                      <Input
                        type="number"
                        value={settings.security.loginAttempts}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, loginAttempts: parseInt(e.target.value) }
                        })}
                        placeholder="5"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        IP Whitelist
                      </label>
                      <Textarea
                        value={settings.security.ipWhitelist}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: { ...settings.security, ipWhitelist: e.target.value }
                        })}
                        placeholder="192.168.1.1&#10;10.0.0.1"
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        One IP address per line
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.security.twoFactorAuth}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, twoFactorAuth: e.target.checked }
                          })}
                        />
                        <span className="text-sm">Enable Two-Factor Authentication</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.security.sslEnabled}
                          onChange={(e) => setSettings({
                            ...settings,
                            security: { ...settings.security, sslEnabled: e.target.checked }
                          })}
                        />
                        <span className="text-sm">Force SSL/HTTPS</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure what notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Email Alerts</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={settings.notifications.emailAlerts}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, emailAlerts: e.target.checked }
                            })}
                          />
                          <span className="text-sm">Email alerts</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={settings.notifications.systemAlerts}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, systemAlerts: e.target.checked }
                            })}
                          />
                          <span className="text-sm">System alerts</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={settings.notifications.performanceAlerts}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, performanceAlerts: e.target.checked }
                            })}
                          />
                          <span className="text-sm">Performance alerts</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={settings.notifications.securityAlerts}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, securityAlerts: e.target.checked }
                            })}
                          />
                          <span className="text-sm">Security alerts</span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Reports</h4>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={settings.notifications.weeklyReports}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, weeklyReports: e.target.checked }
                            })}
                          />
                          <span className="text-sm">Weekly reports</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={settings.notifications.monthlyReports}
                            onChange={(e) => setSettings({
                              ...settings,
                              notifications: { ...settings.notifications, monthlyReports: e.target.checked }
                            })}
                          />
                          <span className="text-sm">Monthly reports</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Backup Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure automatic backups and data retention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Backup Frequency
                      </label>
                      <select
                        value={settings.backup.backupFrequency}
                        onChange={(e) => setSettings({
                          ...settings,
                          backup: { ...settings.backup, backupFrequency: e.target.value }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Retention Period (days)
                      </label>
                      <Input
                        type="number"
                        value={settings.backup.retentionDays}
                        onChange={(e) => setSettings({
                          ...settings,
                          backup: { ...settings.backup, retentionDays: parseInt(e.target.value) }
                        })}
                        placeholder="30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Backup
                      </label>
                      <Input
                        value={settings.backup.lastBackup}
                        disabled
                        placeholder="Never"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Backup Location
                      </label>
                      <select
                        value={settings.backup.backupLocation}
                        onChange={(e) => setSettings({
                          ...settings,
                          backup: { ...settings.backup, backupLocation: e.target.value }
                        })}
                        className="w-full p-2 border border-border rounded-md bg-background"
                      >
                        <option value="local">Local Storage</option>
                        <option value="cloud">Cloud Storage</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.backup.autoBackup}
                          onChange={(e) => setSettings({
                            ...settings,
                            backup: { ...settings.backup, autoBackup: e.target.checked }
                          })}
                        />
                        <span className="text-sm">Enable automatic backups</span>
                      </label>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={handleBackup}
                        className="flex items-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Create Backup</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleRestore}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Restore</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Advanced Settings</span>
                </CardTitle>
                <CardDescription>
                  Advanced configuration options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                    <h4 className="font-semibold text-destructive mb-2">Danger Zone</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      These actions are irreversible. Please proceed with caution.
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        variant="destructive"
                        onClick={() => console.log("Reset all settings")}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset All Settings
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => console.log("Delete all data")}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete All Data
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
