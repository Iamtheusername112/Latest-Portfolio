import { NextResponse } from 'next/server';
import { ContactService } from '@/lib/db/services/contact-service';

export async function GET() {
  try {
    const contactInfo = await ContactService.ensureContactInfoExists();
    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact info' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const updatedContactInfo = await ContactService.updateContactInfo(data);
    return NextResponse.json(updatedContactInfo);
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json(
      { error: 'Failed to update contact info' },
      { status: 500 }
    );
  }
}
