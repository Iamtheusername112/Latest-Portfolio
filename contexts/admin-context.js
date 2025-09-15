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

  // Token refresh function
  const attemptTokenRefresh = async () => {
    try {
      console.log("🔄 Attempting token refresh...");
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        setUser(data.user);
        console.log("✅ Token refreshed successfully");
        return true;
      } else {
        console.log("❌ Token refresh failed");
        return false;
      }
    } catch (error) {
      console.error("❌ Token refresh error:", error);
      return false;
    }
  };

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
            console.log("✅ User authenticated:", data.user);
          } else {
            console.log("❌ User not authenticated:", data.message);
            // Try to refresh token before giving up
            await attemptTokenRefresh();
          }
        } else if (response.status === 401) {
          console.log("❌ Auth verification failed (401), attempting token refresh...");
          // Try to refresh token
          const refreshSuccess = await attemptTokenRefresh();
          if (!refreshSuccess) {
            // Clear invalid tokens if refresh fails
            if (typeof window !== 'undefined') {
              document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            }
          }
        } else {
          console.log("❌ Auth verification failed:", response.status);
          // Clear any invalid tokens
          if (typeof window !== 'undefined') {
            document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // Clear any invalid tokens on error
        if (typeof window !== 'undefined') {
          document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
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
        console.log("✅ Login successful, user authenticated:", data.user);
        
        // Verify the token was set in cookies
        if (typeof window !== 'undefined') {
          const tokenExists = document.cookie.includes('admin-token=');
          console.log("🍪 Token set in cookies:", tokenExists);
        }
        
        return { success: true };
      } else {
        let errorMessage = "Login failed. Please try again.";
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (parseError) {
          console.warn("Could not parse error response:", parseError);
        }
        
        console.log("Login failed:", errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: "Network error. Please check your connection and try again." 
      };
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
