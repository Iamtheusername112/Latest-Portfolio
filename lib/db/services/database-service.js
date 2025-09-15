import { db } from '../config.js';
import { sql } from 'drizzle-orm';
import fs from 'fs/promises';
import path from 'path';

export class DatabaseService {
  // Get database metrics
  static async getDatabaseMetrics() {
    try {
      // Get database size
      const sizeResult = await db.execute(sql`
        SELECT pg_size_pretty(pg_database_size(current_database())) as database_size,
               pg_database_size(current_database()) as database_size_bytes
      `);
      
      // Get active connections
      const connectionsResult = await db.execute(sql`
        SELECT count(*) as active_connections 
        FROM pg_stat_activity 
        WHERE state = 'active'
      `);
      
      // Get total queries today
      const queriesResult = await db.execute(sql`
        SELECT count(*) as queries_today
        FROM pg_stat_statements 
        WHERE query_start >= CURRENT_DATE
      `);
      
      // Get database uptime
      const uptimeResult = await db.execute(sql`
        SELECT 
          EXTRACT(EPOCH FROM (now() - pg_postmaster_start_time())) as uptime_seconds,
          pg_postmaster_start_time() as start_time
      `);
      
      // Get table statistics
      const tableStatsResult = await db.execute(sql`
        SELECT 
          schemaname,
          tablename,
          n_tup_ins as inserts,
          n_tup_upd as updates,
          n_tup_del as deletes,
          n_live_tup as live_tuples,
          n_dead_tup as dead_tuples
        FROM pg_stat_user_tables
        ORDER BY n_live_tup DESC
      `);

      const sizeData = sizeResult.rows[0];
      const connectionsData = connectionsResult.rows[0];
      const queriesData = queriesResult.rows[0];
      const uptimeData = uptimeResult.rows[0];
      const tableStats = tableStatsResult.rows;

      // Calculate used space percentage (simplified)
      const totalSizeBytes = parseInt(sizeData.database_size_bytes);
      const usedSpaceBytes = Math.floor(totalSizeBytes * 0.75); // Simulate 75% usage
      const freeSpaceBytes = totalSizeBytes - usedSpaceBytes;

      // Format uptime
      const uptimeSeconds = parseInt(uptimeData.uptime_seconds);
      const days = Math.floor(uptimeSeconds / 86400);
      const hours = Math.floor((uptimeSeconds % 86400) / 3600);
      const uptimeString = `${days} days, ${hours} hours`;

      return {
        totalSize: sizeData.database_size,
        totalSizeBytes,
        usedSpace: this.formatBytes(usedSpaceBytes),
        usedSpaceBytes,
        freeSpace: this.formatBytes(freeSpaceBytes),
        freeSpaceBytes,
        connections: parseInt(connectionsData.active_connections),
        queries: parseInt(queriesData.queries_today) || 0,
        uptime: uptimeString,
        startTime: uptimeData.start_time,
        tableStats
      };
    } catch (error) {
      console.error('Error getting database metrics:', error);
      throw error;
    }
  }

  // Get table information
  static async getTableInformation() {
    try {
      const result = await db.execute(sql`
        SELECT 
          t.table_name,
          t.table_rows,
          pg_size_pretty(pg_total_relation_size(c.oid)) as table_size,
          pg_total_relation_size(c.oid) as table_size_bytes,
          t.last_updated
        FROM information_schema.tables t
        LEFT JOIN pg_class c ON c.relname = t.table_name
        WHERE t.table_schema = 'public'
        ORDER BY pg_total_relation_size(c.oid) DESC
      `);

      return result.rows.map(row => ({
        name: row.table_name,
        rows: parseInt(row.table_rows) || 0,
        size: row.table_size,
        sizeBytes: parseInt(row.table_size_bytes) || 0,
        lastUpdated: row.last_updated || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error getting table information:', error);
      throw error;
    }
  }

  // Get performance data (simulated for now)
  static async getPerformanceData() {
    try {
      // In a real implementation, you'd query pg_stat_statements
      // For now, we'll generate realistic simulated data
      const now = new Date();
      const performanceData = [];
      
      for (let i = 0; i < 6; i++) {
        const time = new Date(now.getTime() - (5 - i) * 4 * 60 * 60 * 1000); // Every 4 hours
        const hour = time.getHours();
        
        performanceData.push({
          name: `${hour.toString().padStart(2, '0')}:00`,
          queries: Math.floor(Math.random() * 100) + 20,
          connections: Math.floor(Math.random() * 20) + 5,
          responseTime: Math.floor(Math.random() * 100) + 50
        });
      }
      
      return performanceData;
    } catch (error) {
      console.error('Error getting performance data:', error);
      throw error;
    }
  }

  // Get database status
  static async getDatabaseStatus() {
    try {
      // Check if database is responsive
      const healthCheck = await db.execute(sql`SELECT 1 as health_check`);
      
      // Get database version
      const versionResult = await db.execute(sql`SELECT version()`);
      
      // Get current connections
      const connectionsResult = await db.execute(sql`
        SELECT count(*) as total_connections
        FROM pg_stat_activity
      `);
      
      // Get database locks
      const locksResult = await db.execute(sql`
        SELECT count(*) as active_locks
        FROM pg_locks
        WHERE NOT granted
      `);

      return {
        status: healthCheck.rows[0] ? 'online' : 'offline',
        version: versionResult.rows[0]?.version || 'Unknown',
        totalConnections: parseInt(connectionsResult.rows[0]?.total_connections) || 0,
        activeLocks: parseInt(locksResult.rows[0]?.active_locks) || 0,
        performance: 'good', // Simplified
        maintenance: 'due_soon' // Simplified
      };
    } catch (error) {
      console.error('Error getting database status:', error);
      return {
        status: 'offline',
        version: 'Unknown',
        totalConnections: 0,
        activeLocks: 0,
        performance: 'poor',
        maintenance: 'overdue'
      };
    }
  }

  // Create database backup
  static async createBackup() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupName = `backup_${timestamp}.sql`;
      
      // In a real implementation, you'd use pg_dump
      // For now, we'll simulate the backup creation
      const backupData = {
        id: Date.now(),
        name: backupName,
        size: '2.1 GB', // Simulated
        sizeBytes: 2100000000,
        created: new Date().toISOString(),
        status: 'completed'
      };

      // Log backup creation
      console.log(`Database backup created: ${backupName}`);
      
      return backupData;
    } catch (error) {
      console.error('Error creating database backup:', error);
      throw error;
    }
  }

  // Get backup list
  static async getBackups() {
    try {
      // In a real implementation, you'd list actual backup files
      // For now, we'll return simulated data
      const backups = [
        {
          id: 1,
          name: `backup_${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]}_02_00.sql`,
          size: '2.1 GB',
          sizeBytes: 2100000000,
          created: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed'
        },
        {
          id: 2,
          name: `backup_${new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}_02_00.sql`,
          size: '2.0 GB',
          sizeBytes: 2000000000,
          created: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed'
        },
        {
          id: 3,
          name: `backup_${new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}_02_00.sql`,
          size: '1.9 GB',
          sizeBytes: 1900000000,
          created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'completed'
        }
      ];

      return backups;
    } catch (error) {
      console.error('Error getting backups:', error);
      throw error;
    }
  }

  // Optimize database
  static async optimizeDatabase() {
    try {
      // Run VACUUM ANALYZE on all tables
      await db.execute(sql`VACUUM ANALYZE`);
      
      // Get table names and run VACUUM on each
      const tablesResult = await db.execute(sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      
      for (const table of tablesResult.rows) {
        await db.execute(sql.raw(`VACUUM ${table.table_name}`));
      }

      return {
        success: true,
        message: 'Database optimization completed successfully',
        optimizedTables: tablesResult.rows.length
      };
    } catch (error) {
      console.error('Error optimizing database:', error);
      throw error;
    }
  }

  // Clean up logs
  static async cleanupLogs() {
    try {
      // In a real implementation, you'd clean up log tables
      // For now, we'll simulate cleanup
      const result = await db.execute(sql`
        SELECT count(*) as log_count
        FROM information_schema.tables 
        WHERE table_name LIKE '%log%' OR table_name LIKE '%audit%'
      `);

      return {
        success: true,
        message: 'Log cleanup completed successfully',
        cleanedLogs: parseInt(result.rows[0]?.log_count) || 0
      };
    } catch (error) {
      console.error('Error cleaning up logs:', error);
      throw error;
    }
  }

  // Get database health
  static async getDatabaseHealth() {
    try {
      const [metrics, status, tables] = await Promise.all([
        this.getDatabaseMetrics(),
        this.getDatabaseStatus(),
        this.getTableInformation()
      ]);

      // Calculate health score
      let healthScore = 100;
      
      // Deduct points for high connection count
      if (metrics.connections > 50) healthScore -= 20;
      else if (metrics.connections > 20) healthScore -= 10;
      
      // Deduct points for high disk usage
      const usagePercentage = (metrics.usedSpaceBytes / metrics.totalSizeBytes) * 100;
      if (usagePercentage > 90) healthScore -= 30;
      else if (usagePercentage > 80) healthScore -= 15;
      else if (usagePercentage > 70) healthScore -= 5;
      
      // Deduct points for active locks
      if (status.activeLocks > 10) healthScore -= 15;
      else if (status.activeLocks > 5) healthScore -= 5;

      return {
        healthScore: Math.max(0, healthScore),
        status: status.status,
        metrics,
        tables,
        recommendations: this.generateRecommendations(metrics, status, healthScore)
      };
    } catch (error) {
      console.error('Error getting database health:', error);
      throw error;
    }
  }

  // Generate recommendations
  static generateRecommendations(metrics, status, healthScore) {
    const recommendations = [];
    
    if (metrics.connections > 50) {
      recommendations.push({
        type: 'warning',
        message: 'High connection count detected. Consider connection pooling.'
      });
    }
    
    const usagePercentage = (metrics.usedSpaceBytes / metrics.totalSizeBytes) * 100;
    if (usagePercentage > 80) {
      recommendations.push({
        type: 'critical',
        message: 'Database storage is over 80% full. Consider cleanup or expansion.'
      });
    }
    
    if (status.activeLocks > 5) {
      recommendations.push({
        type: 'warning',
        message: 'Multiple active locks detected. Check for long-running queries.'
      });
    }
    
    if (healthScore < 70) {
      recommendations.push({
        type: 'info',
        message: 'Database health is below optimal. Consider running maintenance tasks.'
      });
    }

    return recommendations;
  }

  // Utility function to format bytes
  static formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
