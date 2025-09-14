"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication status with database
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      console.log("AdminContext login called with:", credentials);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUser(data.user);
        console.log("Login successful, user authenticated");
        return true;
      } else {
        const error = await response.json();
        console.error("Login failed:", error.error);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log("🔄 Logging out...");
      
      // Call logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        console.log("✅ Logout successful");
      } else {
        console.warn("⚠️ Logout API failed, but continuing with local logout");
      }
      
      // Clear local state immediately
      setIsAuthenticated(false);
      setUser(null);
      
      // Clear any cached data
      if (typeof window !== 'undefined') {
        // Clear any localStorage items if they exist
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-user');
        
        // Clear any sessionStorage items
        sessionStorage.clear();
      }
      
      console.log("✅ Local logout completed");
      
    } catch (error) {
      console.error("❌ Logout error:", error);
      
      // Even if API fails, clear local state
      setIsAuthenticated(false);
      setUser(null);
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-user');
        sessionStorage.clear();
      }
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
