import { NextResponse } from 'next/server';
import { ContactMessagesService } from '@/lib/db/services/contact-messages-service';

// GET - Get all messages for admin dashboard
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
    const stats = await ContactMessagesService.getMessageStats();
    
    return NextResponse.json({
      messages,
      stats
    });

  } catch (error) {
    console.error('Error fetching admin messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST - Bulk operations on messages
export async function POST(request) {
  try {
    const data = await request.json();
    const { action, messageIds, updates } = data;

    if (!action || !messageIds || !Array.isArray(messageIds)) {
      return NextResponse.json(
        { error: 'Action and message IDs are required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'markRead':
        result = await ContactMessagesService.bulkUpdateMessages(messageIds, { 
          isRead: true, 
          status: 'read',
          readAt: new Date()
        });
        break;
        
      case 'markUnread':
        result = await ContactMessagesService.bulkUpdateMessages(messageIds, { 
          isRead: false, 
          status: 'unread',
          readAt: null
        });
        break;
        
      case 'archive':
        result = await ContactMessagesService.bulkUpdateMessages(messageIds, { 
          status: 'archived',
          archivedAt: new Date()
        });
        break;
        
      case 'update':
        if (!updates) {
          return NextResponse.json(
            { error: 'Updates are required for update action' },
            { status: 400 }
          );
        }
        result = await ContactMessagesService.bulkUpdateMessages(messageIds, updates);
        break;
        
      case 'delete':
        result = await ContactMessagesService.bulkDeleteMessages(messageIds);
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully ${action}ed ${result.length} message(s)`,
      affectedCount: result.length
    });

  } catch (error) {
    console.error('Error performing bulk operation:', error);
    return NextResponse.json(
      { error: 'Failed to perform operation' },
      { status: 500 }
    );
  }
}
