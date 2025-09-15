"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/contexts/admin-context";
import { useMedia } from "@/contexts/media-context";
import { useMessages } from "@/contexts/messages-context";
import { 
  Menu, 
  X, 
  Home, 
  Settings, 
  User, 
  LogOut, 
  Palette,
  FileText,
  Image,
  Globe,
  BarChart3,
  Target,
  Zap,
  Shield,
  Database,
  Search,
  Mail,
  Users,
  Activity,
  TrendingUp,
  Award,
  Star,
  Bell,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LogoutDialog from "./logout-dialog";
import { ThemeToggle, ThemeToggleButton } from "@/components/theme-toggle";

const AdminLayout = ({ children }) => {
  const { user, logout } = useAdmin();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { mediaCount, loading: mediaLoading } = useMedia();
  const { getUnreadCount, loading: messagesLoading } = useMessages();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home, badge: null },
    { name: "Hero", href: "/admin/hero", icon: User, badge: null },
    { name: "Content", href: "/admin/content", icon: FileText, badge: null },
    { name: "Media", href: "/admin/media", icon: Image, badge: mediaLoading ? "..." : mediaCount.toString() },
    { name: "Messages", href: "/admin/messages", icon: Mail, badge: messagesLoading ? "..." : getUnreadCount().toString() },
    { name: "Logo", href: "/admin/logo", icon: Palette, badge: null },
    { name: "SEO", href: "/admin/seo", icon: Target, badge: null },
    { name: "Appearance", href: "/admin/appearance", icon: Palette, badge: null },
    { name: "Performance", href: "/admin/performance", icon: Zap, badge: "94" },
    { name: "Security", href: "/admin/security", icon: Shield, badge: null },
    { name: "Database", href: "/admin/database", icon: Database, badge: null },
    { name: "Settings", href: "/admin/settings", icon: Settings, badge: null },
  ];

  const quickStats = [
    { label: "Views Today", value: "1,234", change: "+12%", icon: TrendingUp },
    { label: "Active Users", value: "89", change: "+5%", icon: Users },
    { label: "Performance", value: "94%", change: "+2%", icon: Zap },
  ];

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    setIsLoggingOut(true);
    
    try {
      console.log("🔄 Starting logout process...");
      
      // Call logout function
      await logout();
      
      // Wait a moment for state to update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Close dialog
      setShowLogoutDialog(false);
      
      // Redirect to login page
      console.log("🔄 Redirecting to login page...");
      window.location.href = "/admin/login";
      
    } catch (error) {
      console.error("❌ Logout error:", error);
      
      // Even if logout fails, redirect to login
      setShowLogoutDialog(false);
      window.location.href = "/admin/login";
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 glass border-r border-border/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">Admin Pro</span>
                <p className="text-xs text-muted-foreground">Portfolio Manager</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-accent/50"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="px-4 py-4 border-b border-border/50">
            <div className="grid grid-cols-3 gap-2">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center p-2 rounded-lg bg-muted/30">
                    <Icon className="h-4 w-4 mx-auto text-primary mb-1" />
                    <p className="text-xs font-medium text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      isActive ? "text-primary-foreground" : "group-hover:scale-110"
                    )} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full font-medium",
                      item.badge === "New" 
                        ? "bg-green-500 text-white" 
                        : item.badge === "94"
                        ? "bg-blue-500 text-white"
                        : "bg-orange-500 text-white"
                    )}>
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="border-t border-border/50 p-4">
            <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-muted/30">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.email || "Admin User"}
                </p>
                <p className="text-xs text-muted-foreground flex items-center">
                  <Star className="h-3 w-3 mr-1 text-yellow-500" />
                  Premium Admin
                </p>
              </div>
            </div>

            {/* Theme Toggle in Sidebar */}
            <div className="mb-4">
              <ThemeToggleButton />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl disabled:opacity-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-20 items-center justify-between glass border-b border-border/50 px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-accent/50"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your portfolio with ease</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted/30 border border-border/50">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
              />
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-accent/50"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-accent/50"
              >
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-accent/50"
              >
                <Mail className="h-4 w-4 mr-2" />
                Messages
              </Button>
            </div>

            {/* View Site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">View Site</span>
            </a>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8 bg-muted/20 min-h-screen">
          {children}
        </main>
      </div>

      {/* Logout Dialog */}
      <LogoutDialog
        isOpen={showLogoutDialog}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
};

export default AdminLayout;
