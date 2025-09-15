#!/bin/bash

# Portfolio Backup Script
# This script creates backups of the database and application files

set -e

# Configuration
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/portfolio"
APP_DIR="/var/www/portfolio"
DB_NAME="portfolio_db"
DB_USER="portfolio_user"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

print_status "Starting backup process..."

# Backup database
print_status "Backing up database..."
if command -v pg_dump &> /dev/null; then
    pg_dump $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql
    print_status "Database backup created: db_backup_$DATE.sql"
else
    print_error "pg_dump not found. Please install PostgreSQL client tools"
    exit 1
fi

# Backup application files (excluding node_modules and .next)
print_status "Backing up application files..."
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='*.log' \
    -C $APP_DIR .

print_status "Application backup created: app_backup_$DATE.tar.gz"

# Backup uploads directory
if [ -d "$APP_DIR/public/uploads" ]; then
    print_status "Backing up uploads..."
    tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz -C $APP_DIR/public uploads
    print_status "Uploads backup created: uploads_backup_$DATE.tar.gz"
fi

# Clean up old backups (keep last 7 days)
print_status "Cleaning up old backups..."
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

# Show backup sizes
print_status "Backup sizes:"
ls -lh $BACKUP_DIR/*$DATE*

print_status "Backup completed successfully!"

# Optional: Upload to cloud storage (uncomment and configure as needed)
# print_status "Uploading to cloud storage..."
# aws s3 cp $BACKUP_DIR/db_backup_$DATE.sql s3://your-backup-bucket/
# aws s3 cp $BACKUP_DIR/app_backup_$DATE.tar.gz s3://your-backup-bucket/
# aws s3 cp $BACKUP_DIR/uploads_backup_$DATE.tar.gz s3://your-backup-bucket/
