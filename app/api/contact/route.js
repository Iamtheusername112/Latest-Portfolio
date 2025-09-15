import { NextResponse } from 'next/server';
import { ContactMessagesService } from '@/lib/db/services/contact-messages-service';

// POST - Submit contact form
export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Get client IP and user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Prepare message data
    const messageData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject?.trim() || 'Contact Form Submission',
      message: data.message.trim(),
      phone: data.phone?.trim() || null,
      company: data.company?.trim() || null,
      priority: data.priority || 'normal',
      ipAddress: ip,
      userAgent: userAgent,
      status: 'unread',
      isRead: false
    };

    // Create message in database
    const newMessage = await ContactMessagesService.createMessage(messageData);
    
    console.log('✅ New contact message received:', {
      id: newMessage.id,
      name: newMessage.name,
      email: newMessage.email,
      subject: newMessage.subject
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      messageId: newMessage.id
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again later.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// GET - Get contact messages (admin only)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      status: searchParams.get('status'),
      priority: searchParams.get('priority'),
      isRead: searchParams.get('isRead') === 'true' ? true : searchParams.get('isRead') === 'false' ? false : undefined,
      search: searchParams.get('search'),
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')) : undefined
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    const messages = await ContactMessagesService.getAllMessages(filters);
    
    return NextResponse.json(messages);

  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
