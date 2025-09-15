import { NextResponse } from 'next/server';
import { PerformanceService } from '@/lib/db/services/performance-service';

// GET - Get performance data
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'analyze') {
      const analysis = await PerformanceService.analyzePerformance();
      return NextResponse.json(analysis);
    }

    if (action === 'trends') {
      const days = parseInt(searchParams.get('days')) || 30;
      const trends = await PerformanceService.getPerformanceTrends(days);
      return NextResponse.json(trends);
    }

    if (action === 'stats') {
      const stats = await PerformanceService.getPerformanceStats();
      return NextResponse.json(stats);
    }

    // Default: get current metrics
    const metrics = await PerformanceService.getCurrentMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    console.error('Error fetching performance data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch performance data',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// POST - Record performance metrics or run analysis
export async function POST(request) {
  try {
    const data = await request.json();
    const { action } = data;

    if (action === 'measure') {
      const metrics = await PerformanceService.measurePerformance();
      return NextResponse.json({
        success: true,
        message: 'Performance metrics recorded successfully',
        metrics
      });
    }

    if (action === 'record' && data.metrics) {
      const result = await PerformanceService.recordPerformanceMetrics(data.metrics);
      return NextResponse.json({
        success: true,
        message: 'Performance metrics recorded successfully',
        metrics: result
      });
    }

    return NextResponse.json(
      { error: 'Invalid action or missing data' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error recording performance data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to record performance data',
        message: error.message || 'Unknown error occurred',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
