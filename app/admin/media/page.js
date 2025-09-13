"use client";

import { useAdmin } from "@/contexts/admin-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Image, 
  Upload, 
  Search, 
  Filter,
  Grid,
  List,
  Download,
  Trash2,
  Edit,
  Eye,
  Plus,
  Folder,
  File,
  Video,
  Music,
  Archive
} from "lucide-react";

export default function MediaManagement() {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("library");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Sample media data - moved before conditional returns
  const [mediaFiles, setMediaFiles] = useState([
    {
      id: 1,
      name: "hero-background.jpg",
      type: "image",
      size: "2.4 MB",
      url: "/api/placeholder/400/300",
      alt: "Hero section background",
      uploadedAt: "2024-01-15",
      category: "backgrounds"
    },
    {
      id: 2,
      name: "profile-picture.png",
      type: "image",
      size: "1.2 MB",
      url: "/api/placeholder/300/300",
      alt: "Profile picture",
      uploadedAt: "2024-01-14",
      category: "profile"
    },
    {
      id: 3,
      name: "project-screenshot-1.png",
      type: "image",
      size: "3.1 MB",
      url: "/api/placeholder/600/400",
      alt: "E-commerce project screenshot",
      uploadedAt: "2024-01-13",
      category: "projects"
    },
    {
      id: 4,
      name: "project-demo.mp4",
      type: "video",
      size: "15.2 MB",
      url: "/api/placeholder/600/400",
      alt: "Project demo video",
      uploadedAt: "2024-01-12",
      category: "projects"
    },
    {
      id: 5,
      name: "resume.pdf",
      type: "document",
      size: "0.8 MB",
      url: "/api/placeholder/400/600",
      alt: "Resume document",
      uploadedAt: "2024-01-11",
      category: "documents"
    },
    {
      id: 6,
      name: "logo.svg",
      type: "image",
      size: "0.3 MB",
      url: "/api/placeholder/200/200",
      alt: "Company logo",
      uploadedAt: "2024-01-10",
      category: "branding"
    }
  ]);

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const categories = [
    { name: "All", count: mediaFiles.length },
    { name: "Images", count: mediaFiles.filter(f => f.type === "image").length },
    { name: "Videos", count: mediaFiles.filter(f => f.type === "video").length },
    { name: "Documents", count: mediaFiles.filter(f => f.type === "document").length },
    { name: "Backgrounds", count: mediaFiles.filter(f => f.category === "backgrounds").length },
    { name: "Projects", count: mediaFiles.filter(f => f.category === "projects").length },
    { name: "Profile", count: mediaFiles.filter(f => f.category === "profile").length },
    { name: "Branding", count: mediaFiles.filter(f => f.category === "branding").length }
  ];

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.alt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case "image":
        return <Image className="h-6 w-6" />;
      case "video":
        return <Video className="h-6 w-6" />;
      case "document":
        return <File className="h-6 w-6" />;
      default:
        return <File className="h-6 w-6" />;
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    // In a real app, this would upload to a server
    console.log("Uploading files:", files);
  };

  const handleFileDelete = (fileId) => {
    setMediaFiles(mediaFiles.filter(f => f.id !== fileId));
  };

  const handleBulkDelete = () => {
    setMediaFiles(mediaFiles.filter(f => !selectedFiles.includes(f.id)));
    setSelectedFiles([]);
  };

  // Conditional returns after all hooks
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Media Library</h1>
            <p className="text-muted-foreground mt-2">
              Manage your images, videos, and documents
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-upload').click()}
              className="flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Files</span>
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="glass border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search media files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-accent/50 transition-colors"
                    >
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Media Grid/List */}
          <div className="lg:col-span-3">
            <Card className="glass border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {filteredFiles.length} files
                  </CardTitle>
                  {selectedFiles.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {selectedFiles.length} selected
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleBulkDelete}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredFiles.map((file) => (
                      <div
                        key={file.id}
                        className={`relative group border border-border/50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 ${
                          selectedFiles.includes(file.id) ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => {
                          if (selectedFiles.includes(file.id)) {
                            setSelectedFiles(selectedFiles.filter(id => id !== file.id));
                          } else {
                            setSelectedFiles([...selectedFiles, file.id]);
                          }
                        }}
                      >
                        <div className="aspect-square bg-muted/30 flex items-center justify-center">
                          {file.type === "image" ? (
                            <img
                              src={file.url}
                              alt={file.alt}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center">
                              {getFileIcon(file.type)}
                              <p className="text-xs text-muted-foreground mt-2">
                                {file.type.toUpperCase()}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 bg-background/80 hover:bg-background"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Preview file
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 bg-background/80 hover:bg-background"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Edit file
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 bg-background/80 hover:bg-background text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFileDelete(file.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredFiles.map((file) => (
                      <div
                        key={file.id}
                        className={`flex items-center space-x-4 p-3 border border-border/50 rounded-lg hover:bg-accent/50 transition-colors ${
                          selectedFiles.includes(file.id) ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => {
                          if (selectedFiles.includes(file.id)) {
                            setSelectedFiles(selectedFiles.filter(id => id !== file.id));
                          } else {
                            setSelectedFiles([...selectedFiles, file.id]);
                          }
                        }}
                      >
                        <div className="w-12 h-12 bg-muted/30 rounded flex items-center justify-center">
                          {file.type === "image" ? (
                            <img
                              src={file.url}
                              alt={file.alt}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            getFileIcon(file.type)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {file.size} • {file.uploadedAt} • {file.category}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Preview file
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Edit file
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileDelete(file.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
