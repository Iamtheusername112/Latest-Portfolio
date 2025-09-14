const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

async function fixHeroSchema() {
  try {
    console.log('🔧 Fixing hero schema...');
    
    // Create database connection
    const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_DXY9OhAjNv5r@ep-wandering-cherry-agjevspd-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
    const client = postgres(connectionString);
    const db = drizzle(client);
    
    // Add missing columns to hero_content table
    const alterQueries = [
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS profile_image_url VARCHAR(500)`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS background_image_url VARCHAR(500)`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS background_video_url VARCHAR(500)`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS background_type VARCHAR(50) DEFAULT 'gradient'`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS primary_button_text VARCHAR(100) DEFAULT 'View My Work'`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS primary_button_action VARCHAR(50) DEFAULT 'scroll'`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS primary_button_link VARCHAR(500)`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS secondary_button_text VARCHAR(100) DEFAULT 'Download CV'`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS secondary_button_action VARCHAR(50) DEFAULT 'download'`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS secondary_button_link VARCHAR(500)`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS show_scroll_indicator BOOLEAN DEFAULT true`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS scroll_indicator_text VARCHAR(100) DEFAULT 'Scroll Down'`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS custom_css TEXT`,
      `ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true`
    ];

    for (const query of alterQueries) {
      try {
        await client.unsafe(query);
        console.log(`✅ Added column: ${query.split(' ')[5]}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️ Column already exists: ${query.split(' ')[5]}`);
        } else {
          console.error(`❌ Error adding column: ${error.message}`);
        }
      }
    }

    console.log('✅ Hero schema fixed successfully!');
    
    // Close connection
    await client.end();
    
  } catch (error) {
    console.error('❌ Error fixing hero schema:', error);
  }
}

fixHeroSchema();
