import { NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/db/services/database-service';

// GET - Get database overview and metrics
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'metrics') {
      const metrics = await DatabaseService.getDatabaseMetrics();
      return NextResponse.json(metrics);
    }

    if (action === 'tables') {
      const tables = await DatabaseService.getTableInformation();
      return NextResponse.json(tables);
    }

    if (action === 'performance') {
      const performance = await DatabaseService.getPerformanceData();
      return NextResponse.json(performance);
    }

    if (action === 'status') {
      const status = await DatabaseService.getDatabaseStatus();
      return NextResponse.json(status);
    }

    if (action === 'health') {
      const health = await DatabaseService.getDatabaseHealth();
      return NextResponse.json(health);
    }

    if (action === 'backups') {
      const backups = await DatabaseService.getBackups();
      return NextResponse.json(backups);
    }

    // Default: get comprehensive database overview
    const [metrics, status, tables, performance, health] = await Promise.all([
      DatabaseService.getDatabaseMetrics(),
      DatabaseService.getDatabaseStatus(),
      DatabaseService.getTableInformation(),
      DatabaseService.getPerformanceData(),
      DatabaseService.getDatabaseHealth()
    ]);

    return NextResponse.json({
      metrics,
      status,
      tables,
      performance,
      health
    });
  } catch (error) {
    console.error('Error fetching database data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch database data',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// POST - Perform database operations
export async function POST(request) {
  try {
    const data = await request.json();
    const { action } = data;

    if (action === 'backup') {
      const backup = await DatabaseService.createBackup();
      return NextResponse.json({
        success: true,
        message: 'Database backup created successfully',
        backup
      });
    }

    if (action === 'optimize') {
      const result = await DatabaseService.optimizeDatabase();
      return NextResponse.json({
        success: true,
        message: 'Database optimization completed',
        result
      });
    }

    if (action === 'cleanup') {
      const result = await DatabaseService.cleanupLogs();
      return NextResponse.json({
        success: true,
        message: 'Log cleanup completed',
        result
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error performing database operation:', error);
    return NextResponse.json(
      { 
        error: 'Failed to perform database operation',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
