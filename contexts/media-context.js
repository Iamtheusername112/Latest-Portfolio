"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const MediaContext = createContext();

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};

export const MediaProvider = ({ children }) => {
  const [mediaCount, setMediaCount] = useState(0);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/media');
      
      if (!response.ok) {
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
    fetchMedia();
  }, []);

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
