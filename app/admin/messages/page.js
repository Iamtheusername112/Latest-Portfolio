"use client";

import { useAdmin } from "@/contexts/admin-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Search, 
  Filter,
  Eye,
  Reply,
  Archive,
  Trash2,
  Clock,
  User,
  Building,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  RefreshCw
} from "lucide-react";

export default function MessagesManagement() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageDetail, setShowMessageDetail] = useState(false);
  const [isPerformingAction, setIsPerformingAction] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Fetch messages from database
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoadingMessages(true);
        const response = await fetch('/api/admin/messages');
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
          setStats(data.stats || {});
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const filteredMessages = messages.filter(message => {
    // Tab filters
    if (activeTab === "unread") return !message.isRead;
    if (activeTab === "read") return message.isRead;
    if (activeTab === "archived") return message.status === "archived";
    if (activeTab === "replied") return message.status === "replied";
    
    // Priority filter
    if (priorityFilter !== 'all' && message.priority !== priorityFilter) {
      return false;
    }
    
    // Date filter
    if (dateFilter !== 'all') {
      const messageDate = new Date(message.createdAt);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      switch (dateFilter) {
        case 'today':
          return messageDate >= today;
        case 'yesterday':
          return messageDate >= yesterday && messageDate < today;
        case 'thisWeek':
          return messageDate >= thisWeek;
        case 'thisMonth':
          return messageDate >= thisMonth;
        default:
          break;
      }
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setShowMessageDetail(true);
    
    // Mark as read if not already read
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read', isRead: true, readAt: new Date() })
      });
      
      if (response.ok) {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId 
            ? { ...msg, isRead: true, status: 'read', readAt: new Date() }
            : msg
        ));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedMessages.length === 0) return;
    
    try {
      setIsPerformingAction(true);
      const response = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          messageIds: selectedMessages
        })
      });
      
      if (response.ok) {
        // Refresh messages
        await refreshMessages();
        setSelectedMessages([]);
        setShowBulkActions(false);
      } else {
        const errorData = await response.json();
        console.error('Bulk action failed:', {
          status: response.status,
          statusText: response.statusText,
          errorData: errorData,
          action: action,
          messageIds: selectedMessages
        });
        alert(`Bulk action failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error performing bulk action:', error);
    } finally {
      setIsPerformingAction(false);
    }
  };

  const handleIndividualAction = async (messageId, action, additionalData = {}) => {
    try {
      setIsPerformingAction(true);
      let response;
      
      if (action === 'delete') {
        response = await fetch(`/api/admin/messages/${messageId}`, {
          method: 'DELETE'
        });
      } else {
        response = await fetch(`/api/admin/messages/${messageId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: action,
            ...additionalData
          })
        });
      }
      
      if (response.ok) {
        await refreshMessages();
        if (action === 'delete') {
          setSelectedMessage(null);
          setShowMessageDetail(false);
        }
      } else {
        const errorData = await response.json();
        console.error('Action failed:', {
          status: response.status,
          statusText: response.statusText,
          errorData: errorData,
          action: action,
          messageId: messageId
        });
        alert(`Action failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error performing action:', error);
    } finally {
      setIsPerformingAction(false);
    }
  };

  const refreshMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        setStats(data.stats || {});
      }
    } catch (error) {
      console.error('Error refreshing messages:', error);
    }
  };

  const handleSelectMessage = (messageId) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map(msg => msg.id));
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyMessage.trim()) return;
    
    try {
      setIsPerformingAction(true);
      await handleIndividualAction(selectedMessage.id, 'replied', {
        adminNotes: replyMessage.trim(),
        repliedAt: new Date()
      });
      setReplyMessage('');
      setShowReplyForm(false);
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setIsPerformingAction(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'unread': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'read': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'replied': return <Reply className="h-4 w-4 text-purple-500" />;
      case 'archived': return <Archive className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Messages</h1>
            <p className="text-muted-foreground">Manage contact form submissions</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                  <p className="text-2xl font-bold">{stats.total || 0}</p>
                </div>
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold text-blue-500">{stats.unread || 0}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today</p>
                  <p className="text-2xl font-bold text-green-500">{stats.today || 0}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold text-purple-500">{stats.thisWeek || 0}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bulk Actions */}
        {selectedMessages.length > 0 && (
          <Card className="glass border-border/50 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">
                    {selectedMessages.length} message(s) selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMessages([])}
                  >
                    Clear Selection
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('markRead')}
                    disabled={isPerformingAction}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('markUnread')}
                    disabled={isPerformingAction}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Mark as Unread
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('archive')}
                    disabled={isPerformingAction}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleBulkAction('delete')}
                    disabled={isPerformingAction}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <Card className="glass border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Contact Messages</CardTitle>
                    <CardDescription>
                      {filteredMessages.length} message(s) found
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 flex-wrap">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                    >
                      <option value="all">All Priorities</option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="normal">Normal</option>
                      <option value="low">Low</option>
                    </select>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="thisWeek">This Week</option>
                      <option value="thisMonth">This Month</option>
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSelectAll}
                    >
                      {selectedMessages.length === filteredMessages.length ? 'Deselect All' : 'Select All'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                    <TabsTrigger value="read">Read</TabsTrigger>
                    <TabsTrigger value="replied">Replied</TabsTrigger>
                    <TabsTrigger value="archived">Archived</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="space-y-4 mt-6">
                    {isLoadingMessages ? (
                      <div className="flex items-center justify-center py-8">
                        <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                        Loading messages...
                      </div>
                    ) : isPerformingAction ? (
                      <div className="flex items-center justify-center py-8">
                        <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                        Processing action...
                      </div>
                    ) : filteredMessages.length === 0 ? (
                      <div className="text-center py-8">
                        <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No messages found</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`p-4 rounded-lg border transition-all hover:bg-accent/50 ${
                              selectedMessages.includes(message.id) ? 'bg-accent' : ''
                            } ${!message.isRead ? 'border-blue-200 bg-blue-50/50' : 'border-border'}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1 min-w-0">
                                <input
                                  type="checkbox"
                                  checked={selectedMessages.includes(message.id)}
                                  onChange={() => handleSelectMessage(message.id)}
                                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <div 
                                  className="flex-1 min-w-0 cursor-pointer"
                                  onClick={() => handleMessageClick(message)}
                                >
                                  <div className="flex items-center space-x-2 mb-2">
                                    {getStatusIcon(message.status)}
                                    <h4 className="font-medium truncate">{message.name}</h4>
                                    <Badge 
                                      className={`text-white text-xs ${getPriorityColor(message.priority)}`}
                                    >
                                      {message.priority}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground truncate">
                                    {message.subject}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {message.email} • {formatDate(message.createdAt)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 ml-4">
                                {message.phone && <Phone className="h-4 w-4 text-muted-foreground" />}
                                {message.company && <Building className="h-4 w-4 text-muted-foreground" />}
                                <div className="flex items-center space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleIndividualAction(message.id, 'read');
                                    }}
                                    disabled={isPerformingAction}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleIndividualAction(message.id, 'archive');
                                    }}
                                    disabled={isPerformingAction}
                                  >
                                    <Archive className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleIndividualAction(message.id, 'delete');
                                    }}
                                    disabled={isPerformingAction}
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            {selectedMessage ? (
              <Card className="glass border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Message Details</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMessageDetail(false)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">From</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedMessage.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedMessage.email}</span>
                      </div>
                      {selectedMessage.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedMessage.phone}</span>
                        </div>
                      )}
                      {selectedMessage.company && (
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedMessage.company}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Subject</h4>
                    <p className="text-sm">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Message</h4>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setShowReplyForm(!showReplyForm)}
                      >
                        <Reply className="h-4 w-4 mr-2" />
                        {showReplyForm ? 'Cancel Reply' : 'Reply'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleIndividualAction(selectedMessage.id, 'archive')}
                        disabled={isPerformingAction}
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleIndividualAction(selectedMessage.id, 'delete')}
                        disabled={isPerformingAction}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>

                    {showReplyForm && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Reply Message</label>
                          <Textarea
                            placeholder="Type your reply here..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            className="mt-1"
                            rows={4}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={handleReply}
                            disabled={isPerformingAction || !replyMessage.trim()}
                          >
                            <Reply className="h-4 w-4 mr-2" />
                            Send Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setReplyMessage('');
                              setShowReplyForm(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {selectedMessage.adminNotes && (
                      <div>
                        <h4 className="font-medium mb-2">Admin Notes</h4>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">{selectedMessage.adminNotes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass border-border/50">
                <CardContent className="p-8 text-center">
                  <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a message to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
