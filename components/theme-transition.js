"use client";

import { useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";

const ThemeTransition = () => {
  const { theme, mounted } = useTheme();

  useEffect(() => {
    if (!mounted) return;
    
    // Add a class to the body for theme transitions
    document.body.classList.add("theme-transition");
    
    // Remove the class after transition completes
    const timer = setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 300);

    return () => clearTimeout(timer);
  }, [theme, mounted]);

  return null;
};

export default ThemeTransition;
