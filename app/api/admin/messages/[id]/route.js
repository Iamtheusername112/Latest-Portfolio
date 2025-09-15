import { NextResponse } from 'next/server';
import { ContactMessagesService } from '@/lib/db/services/contact-messages-service';

// GET - Get specific message
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const message = await ContactMessagesService.getMessageById(parseInt(id));
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(message);

  } catch (error) {
    console.error('Error fetching message:', error);
    return NextResponse.json(
      { error: 'Failed to fetch message' },
      { status: 500 }
    );
  }
}

// PUT - Update specific message
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    // Filter out fields that shouldn't be updated
    const { id: messageId, createdAt, updatedAt, ...cleanData } = data;
    
    const updatedMessage = await ContactMessagesService.updateMessageStatus(
      parseInt(id), 
      data.status || 'unread',
      cleanData
    );
    
    if (!updatedMessage) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedMessage);

  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE - Delete specific message
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const deletedMessage = await ContactMessagesService.deleteMessage(parseInt(id));
    
    if (!deletedMessage) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
      deletedMessage
    });

  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
