import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema.js'

// Create the connection
const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_DXY9OhAjNv5r@ep-wandering-cherry-agjevspd-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

let client
let db

try {
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  client = postgres(connectionString)
  db = drizzle(client, { schema })
} catch (error) {
  console.error('Database connection error:', error)
  // Create a mock db for fallback
  db = null
}

export { db }
export default db
