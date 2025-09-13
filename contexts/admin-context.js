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
    // Check if user is already logged in (from localStorage)
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("admin_token");
        const userData = localStorage.getItem("admin_user");
        
        if (token && userData) {
          // In a real app, you'd validate the token with your backend
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Clear invalid data
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    try {
      console.log("AdminContext login called with:", userData); // Debug log
      
      // In a real app, you'd get this from your backend
      const token = "demo_admin_token_" + Date.now();
      
      // Store in localStorage
      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_user", JSON.stringify(userData));
      
      setIsAuthenticated(true);
      setUser(userData);
      
      console.log("Login successful, user authenticated"); // Debug log
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
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
