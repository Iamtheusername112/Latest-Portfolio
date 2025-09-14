"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  Type, 
  Image, 
  Save, 
  Eye, 
  Trash2, 
  Plus,
  Check,
  X,
  Palette,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AdminLayout from '@/components/admin/admin-layout';

export default function LogoManagement() {
  const [logoData, setLogoData] = useState({
    type: 'text',
    textContent: 'Iwu Francis',
    imageUrl: '',
    svgContent: '',
    showText: true,
    textSize: 'md',
    variant: 'default',
    alt: 'Iwu Francis Logo',
    width: null,
    height: null
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewMode, setPreviewMode] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Load current logo settings
  useEffect(() => {
    loadLogoSettings();
  }, []);

  const loadLogoSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/logo');
      
      if (response.ok) {
        const data = await response.json();
        if (data.logo) {
          setLogoData(data.logo);
        }
      }
    } catch (error) {
      console.error('Error loading logo settings:', error);
      setMessage('Error loading logo settings');
    } finally {
      setIsLoading(false);
    }
  };

  const saveLogoSettings = async () => {
    try {
      setIsSaving(true);
      setMessage('');
      
      const response = await fetch('/api/admin/logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logoData)
      });

      if (response.ok) {
        setMessage('Logo settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Error saving logo settings');
      }
    } catch (error) {
      console.error('Error saving logo settings:', error);
      setMessage('Error saving logo settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // For now, we'll use a placeholder URL
    // In production, you'd upload to a cloud storage service
    const imageUrl = URL.createObjectURL(file);
    
    setLogoData(prev => ({
      ...prev,
      type: 'image',
      imageUrl,
      alt: file.name.split('.')[0]
    }));
  };

  const handleTypeChange = (type) => {
    setLogoData(prev => ({
      ...prev,
      type,
      // Reset relevant fields when changing type
      ...(type === 'text' && { imageUrl: '', svgContent: '' }),
      ...(type === 'image' && { textContent: '', svgContent: '' }),
      ...(type === 'svg' && { textContent: '', imageUrl: '' })
    }));
  };

  const renderLogoPreview = () => {
    const { type, textContent, imageUrl, svgContent, showText, textSize, variant } = logoData;
    
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

    return (
      <div className="flex items-center space-x-2 p-4 border rounded-lg bg-muted/30">
        {type === 'text' && (
          <span className={cn('font-bold gradient-text', textSizeClasses[textSize])}>
            {textContent}
          </span>
        )}
        
        {type === 'image' && imageUrl && (
          <img 
            src={imageUrl} 
            alt={logoData.alt}
            className={cn('object-contain', sizeClasses[textSize])}
          />
        )}
        
        {type === 'svg' && svgContent && (
          <div 
            className={cn('flex items-center', sizeClasses[textSize])}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
        
        {showText && textContent && type !== 'text' && (
          <span className={cn('font-bold gradient-text', textSizeClasses[textSize])}>
            {textContent}
          </span>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading logo settings...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Logo Management</h1>
            <p className="text-muted-foreground">Customize your site's logo and branding</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            {previewMode ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>

      {/* Message */}
      {message && (
        <div className={cn(
          "p-4 rounded-lg border",
          message.includes('success') 
            ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200"
            : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
        )}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Logo Settings</span>
            </CardTitle>
            <CardDescription>
              Configure your logo type and appearance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Logo Type</label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={logoData.type === 'text' ? 'default' : 'outline'}
                  onClick={() => handleTypeChange('text')}
                  className="flex items-center space-x-2"
                >
                  <Type className="h-4 w-4" />
                  <span>Text</span>
                </Button>
                <Button
                  variant={logoData.type === 'image' ? 'default' : 'outline'}
                  onClick={() => handleTypeChange('image')}
                  className="flex items-center space-x-2"
                >
                  <Image className="h-4 w-4" />
                  <span>Image</span>
                </Button>
                <Button
                  variant={logoData.type === 'svg' ? 'default' : 'outline'}
                  onClick={() => handleTypeChange('svg')}
                  className="flex items-center space-x-2"
                >
                  <Palette className="h-4 w-4" />
                  <span>SVG</span>
                </Button>
              </div>
            </div>

            {/* Text Content */}
            {logoData.type === 'text' && (
              <div className="space-y-2">
                <label htmlFor="textContent" className="text-sm font-medium">
                  Text Content
                </label>
                <Input
                  id="textContent"
                  value={logoData.textContent}
                  onChange={(e) => setLogoData(prev => ({ ...prev, textContent: e.target.value }))}
                  placeholder="Enter logo text"
                />
              </div>
            )}

            {/* Image Upload */}
            {logoData.type === 'image' && (
              <div className="space-y-2">
                <label htmlFor="imageUpload" className="text-sm font-medium">
                  Upload Image
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {logoData.imageUrl && (
                  <Input
                    value={logoData.imageUrl}
                    onChange={(e) => setLogoData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="Or enter image URL"
                    className="mt-2"
                  />
                )}
              </div>
            )}

            {/* SVG Content */}
            {logoData.type === 'svg' && (
              <div className="space-y-2">
                <label htmlFor="svgContent" className="text-sm font-medium">
                  SVG Code
                </label>
                <Textarea
                  id="svgContent"
                  value={logoData.svgContent}
                  onChange={(e) => setLogoData(prev => ({ ...prev, svgContent: e.target.value }))}
                  placeholder="Paste your SVG code here"
                  rows={6}
                />
              </div>
            )}

            {/* Show Text Option */}
            {logoData.type !== 'text' && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showText"
                  checked={logoData.showText}
                  onChange={(e) => setLogoData(prev => ({ ...prev, showText: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="showText" className="text-sm font-medium">
                  Show text alongside logo
                </label>
              </div>
            )}

            {/* Text Content for Image/SVG */}
            {logoData.showText && logoData.type !== 'text' && (
              <div className="space-y-2">
                <label htmlFor="textContent" className="text-sm font-medium">
                  Text Content
                </label>
                <Input
                  id="textContent"
                  value={logoData.textContent}
                  onChange={(e) => setLogoData(prev => ({ ...prev, textContent: e.target.value }))}
                  placeholder="Enter text to display with logo"
                />
              </div>
            )}

            {/* Size Options */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Size</label>
              <div className="grid grid-cols-4 gap-2">
                {['sm', 'md', 'lg', 'xl'].map((size) => (
                  <Button
                    key={size}
                    variant={logoData.textSize === size ? 'default' : 'outline'}
                    onClick={() => setLogoData(prev => ({ ...prev, textSize: size }))}
                    className="capitalize"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Alt Text */}
            <div className="space-y-2">
              <label htmlFor="alt" className="text-sm font-medium">
                Alt Text
              </label>
              <Input
                id="alt"
                value={logoData.alt}
                onChange={(e) => setLogoData(prev => ({ ...prev, alt: e.target.value }))}
                placeholder="Logo alt text for accessibility"
              />
            </div>

            {/* Save Button */}
            <Button
              onClick={saveLogoSettings}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Logo Settings
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        {previewMode && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Preview</span>
              </CardTitle>
              <CardDescription>
                See how your logo will appear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Header Preview</h4>
                  {renderLogoPreview()}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Different Sizes</h4>
                  <div className="space-y-2">
                    {['sm', 'md', 'lg', 'xl'].map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground w-8">{size}:</span>
                        <div className="flex items-center space-x-2">
                          {logoData.type === 'text' && (
                            <span className={cn('font-bold gradient-text', {
                              'text-base': size === 'sm',
                              'text-xl': size === 'md',
                              'text-2xl': size === 'lg',
                              'text-3xl': size === 'xl'
                            })}>
                              {logoData.textContent}
                            </span>
                          )}
                          {logoData.type === 'image' && logoData.imageUrl && (
                            <img 
                              src={logoData.imageUrl} 
                              alt={logoData.alt}
                              className={cn('object-contain', {
                                'h-4 w-4': size === 'sm',
                                'h-6 w-6': size === 'md',
                                'h-8 w-8': size === 'lg',
                                'h-10 w-10': size === 'xl'
                              })}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </AdminLayout>
  );
}
