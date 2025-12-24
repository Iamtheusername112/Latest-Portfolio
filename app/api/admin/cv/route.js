import { NextResponse } from 'next/server'
import { CVService } from '@/lib/db/services/cv-service'

// Get CV content
export async function GET() {
  try {
    const cv = await CVService.getCVContent()
    
    // Ensure languages is always an array
    if (cv && !Array.isArray(cv.languages)) {
      cv.languages = []
    }
    
    console.log('Fetched CV data:', {
      id: cv?.id,
      languages: cv?.languages,
      languagesCount: cv?.languages?.length || 0,
      languagesType: typeof cv?.languages,
      isArray: Array.isArray(cv?.languages)
    })
    
    return NextResponse.json({ cv })
  } catch (error) {
    console.error('Error fetching CV content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch CV content' },
      { status: 500 }
    )
  }
}

// Update CV content
export async function POST(request) {
  try {
    const cvData = await request.json()

    // Ensure languages is properly formatted - always set it explicitly
    if (!Array.isArray(cvData.languages)) {
      cvData.languages = []
    }
    // Explicitly ensure it's an array (even if empty) to overwrite database value
    cvData.languages = Array.isArray(cvData.languages) ? cvData.languages : []

    // Ensure experience is properly formatted - always set it explicitly
    if (!Array.isArray(cvData.experience)) {
      cvData.experience = []
    }
    // Explicitly ensure it's an array (even if empty) to overwrite database value
    cvData.experience = Array.isArray(cvData.experience) ? cvData.experience : []

    console.log('Received CV data:', {
      languages: cvData.languages,
      languagesCount: cvData.languages.length,
      languagesData: JSON.stringify(cvData.languages),
      experience: cvData.experience,
      experienceCount: cvData.experience.length,
      experienceData: JSON.stringify(cvData.experience)
    })

    // Basic validation
    if (!cvData.fullName || !cvData.title || !cvData.email || !cvData.summary) {
      return NextResponse.json({ 
        error: 'Full name, title, email, and summary are required' 
      }, { status: 400 })
    }

    const updatedCV = await CVService.updateCVContent(cvData)
    
    console.log('Updated CV:', {
      languages: updatedCV.languages,
      languagesCount: updatedCV.languages?.length || 0,
      experience: updatedCV.experience,
      experienceCount: updatedCV.experience?.length || 0
    })
    
    return NextResponse.json({ cv: updatedCV })
  } catch (error) {
    console.error('Error updating CV content:', error)
    return NextResponse.json({ 
      error: 'Failed to update CV content' 
    }, { status: 500 })
  }
}
