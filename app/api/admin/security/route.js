import { NextResponse } from 'next/server';
import { SecurityService } from '@/lib/db/services/security-service';

// GET - Get security overview
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'events') {
      const events = await SecurityService.getRecentSecurityEvents();
      return NextResponse.json(events);
    }

    if (action === 'stats') {
      const stats = await SecurityService.getSecurityStats();
      return NextResponse.json(stats);
    }

    if (action === 'vulnerabilities') {
      const vulnerabilities = await SecurityService.getSecurityVulnerabilities();
      return NextResponse.json(vulnerabilities);
    }

    if (action === 'admin') {
      const admin = await SecurityService.getCurrentAdmin();
      return NextResponse.json(admin);
    }

    // Default: get security overview
    const overview = await SecurityService.getSecurityOverview();
    return NextResponse.json(overview);
  } catch (error) {
    console.error('Error fetching security data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch security data',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// POST - Update admin credentials
export async function POST(request) {
  try {
    const data = await request.json();
    const { action } = data;

    if (action === 'update-credentials') {
      const { currentPassword, newEmail, newPassword, newName } = data;
      
      // Get client IP
      const forwarded = request.headers.get('x-forwarded-for');
      const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

      if (!currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required' },
          { status: 400 }
        );
      }

      if (!newEmail && !newPassword && !newName) {
        return NextResponse.json(
          { error: 'At least one field must be updated' },
          { status: 400 }
        );
      }

      const result = await SecurityService.updateAdminCredentials(
        currentPassword,
        newEmail,
        newPassword,
        newName,
        ip
      );

      return NextResponse.json({
        success: true,
        message: 'Admin credentials updated successfully',
        admin: result.admin
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating admin credentials:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update admin credentials',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
