"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const DynamicLogo = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  fallback = 'Iwu Francis'
}) => {
  const [logoData, setLogoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLogoData();
  }, []);

  const loadLogoData = async () => {
    try {
      const response = await fetch('/api/admin/logo');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.logo) {
          setLogoData(data.logo);
        }
      }
    } catch (error) {
      console.error('Error loading logo data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  if (isLoading) {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <div className={cn('bg-muted animate-pulse rounded', sizeClasses[size])} />
        {showText && (
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        )}
      </div>
    );
  }

  if (!logoData) {
    // Fallback to default text logo
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <span className={cn('font-bold gradient-text', textSizeClasses[size])}>
          {fallback}
        </span>
      </div>
    );
  }

  const { type, textContent, imageUrl, svgContent, showText: dbShowText, textSize } = logoData;
  const shouldShowText = showText && (dbShowText || type === 'text');

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {/* Logo Icon/Image */}
      {type === 'text' && (
        <span className={cn('font-bold gradient-text', textSizeClasses[textSize || size])}>
          {textContent || fallback}
        </span>
      )}

      {type === 'image' && imageUrl && (
        <Image 
          src={imageUrl} 
          alt={logoData.alt || 'Logo'}
          width={48}
          height={48}
          className={cn('object-contain', sizeClasses[textSize || size])}
        />
      )}

      {type === 'svg' && svgContent && (
        <div 
          className={cn('flex items-center', sizeClasses[textSize || size])}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      )}

      {/* Text alongside logo (only for image/svg types when showText is true) */}
      {shouldShowText && textContent && type !== 'text' && (
        <span className={cn('font-bold gradient-text', textSizeClasses[textSize || size])}>
          {textContent}
        </span>
      )}
    </div>
  );
};

export default DynamicLogo;
