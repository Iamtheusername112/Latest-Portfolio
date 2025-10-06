import { NextResponse } from 'next/server'
import { CVService } from '@/lib/db/services/cv-service'

// Get CV content
export async function GET() {
  try {
    const cv = await CVService.getCVContent()
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

    // Basic validation
    if (!cvData.fullName || !cvData.title || !cvData.email || !cvData.summary) {
      return NextResponse.json({ 
        error: 'Full name, title, email, and summary are required' 
      }, { status: 400 })
    }

    const updatedCV = await CVService.updateCVContent(cvData)
    return NextResponse.json({ cv: updatedCV })
  } catch (error) {
    console.error('Error updating CV content:', error)
    return NextResponse.json({ 
      error: 'Failed to update CV content' 
    }, { status: 500 })
  }
}
