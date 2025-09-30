'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Save,
  Eye,
  Upload,
  Image,
  Video,
  Palette,
  Settings,
  User,
  Globe,
  Download,
  MousePointer,
  Link,
  Code,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import AdminLayout from '@/components/admin/admin-layout'

export default function HeroManagement() {
  const [heroData, setHeroData] = useState({
    name: 'Iwu Francis',
    title: 'Full Stack Web Developer',
    description:
      'I create beautiful, functional, and user-centered digital experiences that bring ideas to life. Passionate about clean code, modern technologies, and continuous learning.',
    cvUrl: '/cv.pdf',
    profileImageUrl: '',
    backgroundImageUrl: '',
    backgroundVideoUrl: '',
    backgroundType: 'gradient',
    primaryButtonText: 'View My Work',
    primaryButtonAction: 'scroll',
    primaryButtonLink: '',
    secondaryButtonText: 'Download CV',
    secondaryButtonAction: 'download',
    secondaryButtonLink: '/cv.pdf',
    showScrollIndicator: true,
    scrollIndicatorText: 'Scroll Down',
    socialLinks: {
      github: 'https://github.com/Iamtheusername112',
      linkedin: 'https://linkedin.com/in/francis-iwu-878973238',
      instagram: 'https://www.instagram.com/fran_cis3831?igsh=azdxemFwNGl0dzU3',
      email: 'mailto:iwufrancischisom20@gmail.com',
    },
    customCss: '',
    isActive: true,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [previewMode, setPreviewMode] = useState(true)

  // Load hero data
  useEffect(() => {
    loadHeroData()
  }, [])

  const loadHeroData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/hero')

      if (response.ok) {
        const data = await response.json()
        if (data.hero) {
          setHeroData(data.hero)
        }
      }
    } catch (error) {
      console.error('Error loading hero data:', error)
      setMessage('Error loading hero data')
    } finally {
      setIsLoading(false)
    }
  }

  const saveHeroData = async () => {
    try {
      setIsSaving(true)
      setMessage('')

      const response = await fetch('/api/admin/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroData),
      })

      if (response.ok) {
        setMessage('Hero settings saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        const error = await response.json()
        setMessage(error.message || 'Error saving hero settings')
      }
    } catch (error) {
      console.error('Error saving hero settings:', error)
      setMessage('Error saving hero settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileUpload = (type, event) => {
    const file = event.target.files[0]
    if (!file) return

    // For now, we'll use a placeholder URL
    // In production, you'd upload to a cloud storage service
    const fileUrl = URL.createObjectURL(file)

    if (type === 'profile') {
      setHeroData((prev) => ({ ...prev, profileImageUrl: fileUrl }))
    } else if (type === 'background') {
      setHeroData((prev) => ({ ...prev, backgroundImageUrl: fileUrl }))
    } else if (type === 'video') {
      setHeroData((prev) => ({ ...prev, backgroundVideoUrl: fileUrl }))
    }
  }

  const handleSocialLinkChange = (platform, value) => {
    setHeroData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }))
  }

  const renderPreview = () => {
    return (
      <div className='min-h-screen flex items-center justify-center relative overflow-hidden bg-pattern'>
        {/* Background */}
        {heroData.backgroundType === 'image' && heroData.backgroundImageUrl && (
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${heroData.backgroundImageUrl})` }}
          />
        )}
        {heroData.backgroundType === 'video' && heroData.backgroundVideoUrl && (
          <video
            className='absolute inset-0 w-full h-full object-cover'
            autoPlay
            muted
            loop
          >
            <source src={heroData.backgroundVideoUrl} type='video/mp4' />
          </video>
        )}
        {heroData.backgroundType === 'gradient' && (
          <>
            <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]' />
          </>
        )}

        {/* Content */}
        <div className='container mx-auto px-4 relative z-10'>
          <div className='text-center max-w-4xl mx-auto'>
            {/* Profile Image */}
            {heroData.profileImageUrl && (
              <div className='mb-6'>
                <img
                  src={heroData.profileImageUrl}
                  alt={heroData.name}
                  className='w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20'
                />
              </div>
            )}

            {/* Name and Title */}
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4'>
              Hi, I'm{' '}
              <span className='gradient-text animate-glow'>
                {heroData.name}
              </span>
            </h1>
            <h2 className='text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-medium'>
              {heroData.title}
            </h2>

            {/* Description */}
            <p className='text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed'>
              {heroData.description}
            </p>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
              <Button size='lg' className='w-full sm:w-auto btn-premium'>
                {heroData.primaryButtonText}
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='w-full sm:w-auto btn-premium glass'
              >
                <Download className='mr-2 h-4 w-4' />
                {heroData.secondaryButtonText}
              </Button>
            </div>

            {/* Social Links */}
            <div className='flex justify-center space-x-6'>
              {Object.entries(heroData.socialLinks).map(([platform, url]) => (
                <Button
                  key={platform}
                  variant='ghost'
                  size='icon'
                  className='h-12 w-12 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110'
                  title={platform}
                >
                  <Globe className='h-6 w-6' />
                </Button>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          {heroData.showScrollIndicator && (
            <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
              <Button
                variant='ghost'
                size='icon'
                className='h-12 w-12 rounded-full animate-bounce'
              >
                <MousePointer className='h-6 w-6' />
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className='flex items-center justify-center h-64'>
          <div className='text-center'>
            <Loader2 className='h-8 w-8 animate-spin mx-auto mb-4' />
            <p className='text-muted-foreground'>Loading hero settings...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold gradient-text'>
              Hero Management
            </h1>
            <p className='text-muted-foreground'>
              Customize your hero section content and appearance
            </p>
          </div>
          <div className='flex space-x-2'>
            <Button
              variant='outline'
              onClick={() => setPreviewMode(!previewMode)}
              className='flex items-center space-x-2'
            >
              <Eye className='h-4 w-4' />
              {previewMode ? 'Hide Preview' : 'Show Preview'}
            </Button>
            <Button
              onClick={saveHeroData}
              disabled={isSaving}
              className='flex items-center space-x-2'
            >
              {isSaving ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <Save className='h-4 w-4' />
              )}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={cn(
              'p-4 rounded-lg border flex items-center space-x-2',
              message.includes('success')
                ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200'
                : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200'
            )}
          >
            {message.includes('success') ? (
              <CheckCircle className='h-5 w-5' />
            ) : (
              <XCircle className='h-5 w-5' />
            )}
            <span>{message}</span>
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Hero Settings */}
          <div className='space-y-6'>
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <User className='h-5 w-5' />
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription>
                  Set your name, title, and description
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    value={heroData.name}
                    onChange={(e) =>
                      setHeroData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder='Your name'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='title'>Title/Profession</Label>
                  <Input
                    id='title'
                    value={heroData.title}
                    onChange={(e) =>
                      setHeroData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder='Your profession or title'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    value={heroData.description}
                    onChange={(e) =>
                      setHeroData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder='Tell people about yourself'
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media Uploads */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Upload className='h-5 w-5' />
                  <span>Media Uploads</span>
                </CardTitle>
                <CardDescription>
                  Upload profile image and background media
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Profile Image */}
                <div className='space-y-2'>
                  <Label>Profile Image</Label>
                  <div className='flex items-center space-x-2'>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleFileUpload('profile', e)}
                      className='flex-1'
                    />
                    <Button variant='outline' size='icon'>
                      <Image className='h-4 w-4' />
                    </Button>
                  </div>
                  {heroData.profileImageUrl && (
                    <Input
                      value={heroData.profileImageUrl}
                      onChange={(e) =>
                        setHeroData((prev) => ({
                          ...prev,
                          profileImageUrl: e.target.value,
                        }))
                      }
                      placeholder='Or enter image URL'
                      className='mt-2'
                    />
                  )}
                </div>

                {/* Background Type */}
                <div className='space-y-2'>
                  <Label>Background Type</Label>
                  <Select
                    value={heroData.backgroundType}
                    onValueChange={(value) =>
                      setHeroData((prev) => ({
                        ...prev,
                        backgroundType: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select background type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='gradient'>Gradient</SelectItem>
                      <SelectItem value='image'>Image</SelectItem>
                      <SelectItem value='video'>Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Background Image */}
                {heroData.backgroundType === 'image' && (
                  <div className='space-y-2'>
                    <Label>Background Image</Label>
                    <div className='flex items-center space-x-2'>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => handleFileUpload('background', e)}
                        className='flex-1'
                      />
                      <Button variant='outline' size='icon'>
                        <Image className='h-4 w-4' />
                      </Button>
                    </div>
                    {heroData.backgroundImageUrl && (
                      <Input
                        value={heroData.backgroundImageUrl}
                        onChange={(e) =>
                          setHeroData((prev) => ({
                            ...prev,
                            backgroundImageUrl: e.target.value,
                          }))
                        }
                        placeholder='Or enter image URL'
                        className='mt-2'
                      />
                    )}
                  </div>
                )}

                {/* Background Video */}
                {heroData.backgroundType === 'video' && (
                  <div className='space-y-2'>
                    <Label>Background Video</Label>
                    <div className='flex items-center space-x-2'>
                      <Input
                        type='file'
                        accept='video/*'
                        onChange={(e) => handleFileUpload('video', e)}
                        className='flex-1'
                      />
                      <Button variant='outline' size='icon'>
                        <Video className='h-4 w-4' />
                      </Button>
                    </div>
                    {heroData.backgroundVideoUrl && (
                      <Input
                        value={heroData.backgroundVideoUrl}
                        onChange={(e) =>
                          setHeroData((prev) => ({
                            ...prev,
                            backgroundVideoUrl: e.target.value,
                          }))
                        }
                        placeholder='Or enter video URL'
                        className='mt-2'
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Buttons Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Settings className='h-5 w-5' />
                  <span>Buttons Configuration</span>
                </CardTitle>
                <CardDescription>
                  Configure your call-to-action buttons
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Primary Button */}
                <div className='space-y-2'>
                  <Label>Primary Button</Label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input
                      value={heroData.primaryButtonText}
                      onChange={(e) =>
                        setHeroData((prev) => ({
                          ...prev,
                          primaryButtonText: e.target.value,
                        }))
                      }
                      placeholder='Button text'
                    />
                    <Select
                      value={heroData.primaryButtonAction}
                      onValueChange={(value) =>
                        setHeroData((prev) => ({
                          ...prev,
                          primaryButtonAction: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='scroll'>
                          Scroll to Section
                        </SelectItem>
                        <SelectItem value='link'>External Link</SelectItem>
                        <SelectItem value='download'>Download File</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {(heroData.primaryButtonAction === 'link' ||
                    heroData.primaryButtonAction === 'download') && (
                    <Input
                      value={heroData.primaryButtonLink}
                      onChange={(e) =>
                        setHeroData((prev) => ({
                          ...prev,
                          primaryButtonLink: e.target.value,
                        }))
                      }
                      placeholder='Enter URL or file path'
                    />
                  )}
                </div>

                {/* Secondary Button */}
                <div className='space-y-2'>
                  <Label>Secondary Button</Label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input
                      value={heroData.secondaryButtonText}
                      onChange={(e) =>
                        setHeroData((prev) => ({
                          ...prev,
                          secondaryButtonText: e.target.value,
                        }))
                      }
                      placeholder='Button text'
                    />
                    <Select
                      value={heroData.secondaryButtonAction}
                      onValueChange={(value) =>
                        setHeroData((prev) => ({
                          ...prev,
                          secondaryButtonAction: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='scroll'>
                          Scroll to Section
                        </SelectItem>
                        <SelectItem value='link'>External Link</SelectItem>
                        <SelectItem value='download'>Download File</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {(heroData.secondaryButtonAction === 'link' ||
                    heroData.secondaryButtonAction === 'download') && (
                    <Input
                      value={heroData.secondaryButtonLink}
                      onChange={(e) =>
                        setHeroData((prev) => ({
                          ...prev,
                          secondaryButtonLink: e.target.value,
                        }))
                      }
                      placeholder='Enter URL or file path'
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Globe className='h-5 w-5' />
                  <span>Social Links</span>
                </CardTitle>
                <CardDescription>
                  Configure your social media links
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {Object.entries(heroData.socialLinks).map(([platform, url]) => (
                  <div key={platform} className='space-y-2'>
                    <Label className='capitalize'>{platform}</Label>
                    <Input
                      value={url}
                      onChange={(e) =>
                        handleSocialLinkChange(platform, e.target.value)
                      }
                      placeholder={`Enter ${platform} URL`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Code className='h-5 w-5' />
                  <span>Advanced Settings</span>
                </CardTitle>
                <CardDescription>Fine-tune your hero section</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Scroll Indicator */}
                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    id='showScrollIndicator'
                    checked={heroData.showScrollIndicator}
                    onChange={(e) =>
                      setHeroData((prev) => ({
                        ...prev,
                        showScrollIndicator: e.target.checked,
                      }))
                    }
                    className='rounded'
                  />
                  <Label htmlFor='showScrollIndicator'>
                    Show scroll indicator
                  </Label>
                </div>

                {heroData.showScrollIndicator && (
                  <div className='space-y-2'>
                    <Label htmlFor='scrollIndicatorText'>
                      Scroll Indicator Text
                    </Label>
                    <Input
                      id='scrollIndicatorText'
                      value={heroData.scrollIndicatorText}
                      onChange={(e) =>
                        setHeroData((prev) => ({
                          ...prev,
                          scrollIndicatorText: e.target.value,
                        }))
                      }
                      placeholder='Scroll indicator text'
                    />
                  </div>
                )}

                {/* Custom CSS */}
                <div className='space-y-2'>
                  <Label htmlFor='customCss'>Custom CSS</Label>
                  <Textarea
                    id='customCss'
                    value={heroData.customCss}
                    onChange={(e) =>
                      setHeroData((prev) => ({
                        ...prev,
                        customCss: e.target.value,
                      }))
                    }
                    placeholder='Add custom CSS styles'
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          {previewMode && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center space-x-2'>
                  <Eye className='h-5 w-5' />
                  <span>Live Preview</span>
                </CardTitle>
                <CardDescription>
                  See how your hero section will appear on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='border rounded-lg overflow-hidden'>
                  {renderPreview()}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
