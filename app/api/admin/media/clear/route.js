import { NextResponse } from 'next/server';
import { db } from '@/lib/db/config.js';
import { mediaFiles } from '@/lib/db/schema.js';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE() {
  try {
    console.log('Clearing all media files...');
    
    // Get all media files before deletion
    const beforeCount = await db.select().from(mediaFiles);
    console.log(`Found ${beforeCount.length} media files to delete`);
    
    // Delete physical files first
    let deletedFiles = 0;
    for (const file of beforeCount) {
      if (file.url && file.url.startsWith('/uploads/')) {
        try {
          const filePath = path.join(process.cwd(), 'public', file.url);
          await unlink(filePath);
          deletedFiles++;
          console.log(`Physical file deleted: ${filePath}`);
        } catch (fileError) {
          console.warn(`Could not delete physical file for ${file.url}:`, fileError.message);
        }
      }
    }
    
    // Delete all media files from database
    const result = await db.delete(mediaFiles);
    console.log('Database delete result:', result);
    
    // Verify deletion
    const afterCount = await db.select().from(mediaFiles);
    console.log(`Remaining files in database: ${afterCount.length}`);
    
    return NextResponse.json({
      success: true,
      deletedCount: beforeCount.length,
      deletedFiles: deletedFiles,
      remainingCount: afterCount.length,
      message: `Deleted ${beforeCount.length} media files (${deletedFiles} physical files)`
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
