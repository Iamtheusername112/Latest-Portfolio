import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config.js';
import { mediaFiles } from '@/lib/db/schema.js';

export async function DELETE() {
  try {
    console.log('Clearing all media files...');
    
    // Get current count
    const beforeCount = await db.select().from(mediaFiles);
    console.log(`Found ${beforeCount.length} media files to delete`);
    
    // Delete all media files
    const result = await db.delete(mediaFiles);
    console.log('Delete result:', result);
    
    // Verify deletion
    const afterCount = await db.select().from(mediaFiles);
    console.log(`Remaining files: ${afterCount.length}`);
    
    return NextResponse.json({
      success: true,
      deletedCount: beforeCount.length,
      remainingCount: afterCount.length,
      message: `Deleted ${beforeCount.length} media files`
    });
    
  } catch (error) {
    console.error('Error clearing media files:', error);
    return NextResponse.json(
      { 
        error: 'Failed to clear media files',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
