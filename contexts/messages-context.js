"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAdmin } from './admin-context';

const MessagesContext = createContext();

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, isLoading: authLoading } = useAdmin();

  const fetchMessages = async () => {
    // Only fetch if user is authenticated
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/messages');
      
      if (!response.ok) {
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
    // Only fetch messages when authentication is complete and user is authenticated
    if (!authLoading && isAuthenticated) {
      fetchMessages();
    } else if (!authLoading && !isAuthenticated) {
      // Clear messages when user is not authenticated
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
