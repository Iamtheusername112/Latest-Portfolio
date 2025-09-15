#!/usr/bin/env node

import { db } from '../lib/db/config.js';
import { contactMessages } from '../lib/db/schema.js';
import { sql } from 'drizzle-orm';

async function debugDB() {
  console.log('🔍 Debugging Database...\n');

  try {
    console.log('1. Testing basic connection...');
    const result = await db.execute(sql`SELECT 1 as test`);
    console.log('✅ Basic connection works:', result);

    console.log('\n2. Testing contact_messages table...');
    const messages = await db.select().from(contactMessages);
    console.log('✅ Table query works, found:', messages.length, 'messages');

    console.log('\n3. Testing getMessageStats queries...');
    
    // Test the problematic queries one by one
    console.log('   - Testing total count...');
    const totalMessages = await db
      .select({ count: sql`count(*)` })
      .from(contactMessages);
    console.log('   ✅ Total count works:', totalMessages[0].count);

    console.log('   - Testing unread count...');
    const unreadMessages = await db
      .select({ count: sql`count(*)` })
      .from(contactMessages)
      .where(sql`${contactMessages.isRead} = false`);
    console.log('   ✅ Unread count works:', unreadMessages[0].count);

    console.log('   - Testing today count...');
    const todayMessages = await db
      .select({ count: sql`count(*)` })
      .from(contactMessages)
      .where(sql`DATE(${contactMessages.createdAt}) = CURRENT_DATE`);
    console.log('   ✅ Today count works:', todayMessages[0].count);

    console.log('   - Testing this week count...');
    const thisWeekMessages = await db
      .select({ count: sql`count(*)` })
      .from(contactMessages)
      .where(sql`${contactMessages.createdAt} >= CURRENT_DATE - INTERVAL '7 days'`);
    console.log('   ✅ This week count works:', thisWeekMessages[0].count);

    console.log('\n✅ All tests passed!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
}

debugDB();
