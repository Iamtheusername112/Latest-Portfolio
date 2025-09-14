"use client";

import { cn } from "@/lib/utils";

const Logo = ({ 
  variant = "default", 
  size = "md", 
  showText = true, 
  className = "" 
}) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-10 w-10",
    xl: "h-12 w-12"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl", 
    xl: "text-2xl"
  };

  const logoSrc = {
    default: "/logo.svg",
    minimal: "/logo-minimal.svg",
    tech: "/logo-tech.svg"
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <img 
        src={logoSrc[variant]} 
        alt="Iwu Francis Logo" 
        className={cn(sizeClasses[size])}
      />
      {showText && (
        <span className={cn("font-bold gradient-text", textSizeClasses[size])}>
          Iwu Francis
        </span>
      )}
    </div>
  );
};

export default Logo;
