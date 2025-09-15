"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAdmin } from './admin-context';

const MessagesContext = createContext();

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    // Return default values if not within a MessagesProvider
    return {
      messages: [],
      stats: {},
      loading: false,
      error: null,
      fetchMessages: () => {},
      addMessage: () => {},
      updateMessage: () => {},
      deleteMessage: () => {},
      markAsRead: () => {},
      markAsUnread: () => {},
      getUnreadCount: () => 0
    };
  }
  return context;
};

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({});
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

  const fetchMessages = async () => {
    // Only fetch if user is authenticated
    if (!isAuthenticated) {
      console.log('MessagesContext: Not authenticated, skipping fetch');
      setLoading(false);
      return;
    }

    // Check if we're on an admin page
    if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
      console.log('MessagesContext: Not on admin page, skipping fetch');
      setLoading(false);
      return;
    }

    // Final check - if still not authenticated, abort
    if (!isAuthenticated) {
      console.log('MessagesContext: Final check - not authenticated, aborting');
      return;
    }

    console.log('MessagesContext: Fetching messages data...');
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/messages');
      
      if (!response.ok) {
        // If we get 403, it means we shouldn't be making this call
        if (response.status === 403) {
          console.log('MessagesContext: Got 403 - not authenticated, clearing data');
          setMessages([]);
          setStats({});
          setError(null);
          return;
        }
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }
      
      const data = await response.json();
      setMessages(data.messages || []);
      setStats(data.stats || {});
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.message);
      setMessages([]);
      setStats({});
    } finally {
      setLoading(false);
    }
  };

  const addMessage = (message) => {
    setMessages(prev => [message, ...prev]);
    setStats(prev => ({
      ...prev,
      total: (prev.total || 0) + 1,
      unread: (prev.unread || 0) + 1
    }));
  };

  const updateMessage = (messageId, updates) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, ...updates } : msg
    ));
    
    // Update stats if message was marked as read
    if (updates.isRead && !updates.wasRead) {
      setStats(prev => ({
        ...prev,
        unread: Math.max(0, (prev.unread || 0) - 1)
      }));
    }
  };

  const removeMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    setStats(prev => ({
      ...prev,
      total: Math.max(0, (prev.total || 0) - 1)
    }));
  };

  const getUnreadCount = () => {
    return stats.unread || 0;
  };

  useEffect(() => {
    console.log('MessagesContext useEffect:', { isAuthenticated, authLoading });
    
    // Only fetch messages when authentication is complete and user is authenticated
    if (!authLoading && isAuthenticated) {
      // Double check we're on an admin page
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        fetchMessages();
      } else {
        console.log('MessagesContext: Not on admin page, skipping fetch in useEffect');
      }
    } else if (!authLoading && !isAuthenticated) {
      // Clear messages when user is not authenticated
      console.log('MessagesContext: Not authenticated, clearing data in useEffect');
      setMessages([]);
      setStats({});
      setError(null);
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  const value = {
    messages,
    stats,
    loading,
    error,
    fetchMessages,
    addMessage,
    updateMessage,
    removeMessage,
    getUnreadCount
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};
