"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAdmin } from './admin-context';

const MediaContext = createContext();

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    // Return default values if not within a MediaProvider
    return {
      mediaCount: 0,
      mediaFiles: [],
      loading: false,
      error: null,
      fetchMedia: () => {},
      addMediaFile: () => {},
      removeMediaFile: () => {},
      clearAllMedia: () => {},
      updateMediaCount: () => {}
    };
  }
  return context;
};

export const MediaProvider = ({ children }) => {
  const [mediaCount, setMediaCount] = useState(0);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Safely get admin context
  let isAuthenticated = false;
  let authLoading = false;
  try {
    const adminContext = useAdmin();
    isAuthenticated = adminContext?.isAuthenticated || false;
    authLoading = adminContext?.isLoading || false;
  } catch (e) {
    // Admin context not available, use defaults
    isAuthenticated = false;
    authLoading = false;
  }

  const fetchMedia = async () => {
    // Only fetch if user is authenticated
    if (!isAuthenticated) {
      console.log('MediaContext: Not authenticated, skipping fetch');
      setLoading(false);
      return;
    }

    // Check if we're on an admin page
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
      console.log('MediaContext: Not on admin page, skipping fetch');
      setLoading(false);
      return;
    }

    // Final check - if still not authenticated, abort
    if (!isAuthenticated) {
      console.log('MediaContext: Final check - not authenticated, aborting');
      return;
    }

    console.log('MediaContext: Fetching media data...');
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/media');
      
      if (!response.ok) {
        // If we get 403, it means we shouldn't be making this call
        if (response.status === 403) {
          console.log('MediaContext: Got 403 - not authenticated, clearing data');
          setMediaFiles([]);
          setMediaCount(0);
          setError(null);
          return;
        }
        throw new Error(`Failed to fetch media: ${response.status}`);
      }
      
      const data = await response.json();
      setMediaFiles(data);
      setMediaCount(data.length || 0);
    } catch (err) {
      console.error('Error fetching media:', err);
      setError(err.message);
      setMediaFiles([]);
      setMediaCount(0);
    } finally {
      setLoading(false);
    }
  };

  const addMediaFile = (file) => {
    setMediaFiles(prev => [...prev, file]);
    setMediaCount(prev => prev + 1);
  };

  const removeMediaFile = (fileId) => {
    setMediaFiles(prev => prev.filter(file => file.id !== fileId));
    setMediaCount(prev => Math.max(0, prev - 1));
  };

  const clearAllMedia = () => {
    setMediaFiles([]);
    setMediaCount(0);
  };

  const updateMediaCount = (count) => {
    setMediaCount(count);
  };

  useEffect(() => {
    console.log('MediaContext useEffect:', { isAuthenticated, authLoading });
    
    if (isAuthenticated && !authLoading) {
      // Double check we're on an admin page
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        fetchMedia();
      } else {
        console.log('MediaContext: Not on admin page, skipping fetch in useEffect');
      }
    } else if (!authLoading && !isAuthenticated) {
      // Clear media when user is not authenticated
      console.log('MediaContext: Not authenticated, clearing data in useEffect');
      setMediaFiles([]);
      setMediaCount(0);
      setError(null);
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  const value = {
    mediaCount,
    mediaFiles,
    loading,
    error,
    fetchMedia,
    addMediaFile,
    removeMediaFile,
    clearAllMedia,
    updateMediaCount
  };

  return (
    <MediaContext.Provider value={value}>
      {children}
    </MediaContext.Provider>
  );
};
