#!/bin/bash

# Portfolio Deployment Script for Hostinger VPS
# Run this script on your VPS after initial setup

set -e  # Exit on any error

echo "🚀 Starting Portfolio Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please do not run this script as root"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the portfolio project directory"
    exit 1
fi

print_status "Installing dependencies..."
npm install

print_status "Building application..."
npm run build

print_status "Setting up environment variables..."
if [ ! -f ".env.local" ]; then
    print_warning "Creating .env.local from example..."
    cp production.env.example .env.local
    print_warning "Please edit .env.local with your production values before continuing"
    print_warning "Run: nano .env.local"
    exit 1
fi

print_status "Setting up database..."
if command -v psql &> /dev/null; then
    print_status "Database setup required. Please run:"
    echo "npm run db:migrate"
    echo "npm run create-admin"
else
    print_warning "PostgreSQL not found. Please install PostgreSQL first"
fi

print_status "Setting up PM2..."
if command -v pm2 &> /dev/null; then
    print_status "Starting application with PM2..."
    pm2 start ecosystem.config.js
    pm2 save
    print_status "PM2 startup configuration:"
    pm2 startup
else
    print_warning "PM2 not found. Please install PM2 first: npm install -g pm2"
fi

print_status "Setting up Nginx configuration..."
if command -v nginx &> /dev/null; then
    print_status "Nginx configuration required. Please:"
    echo "1. Copy the Nginx config from DEPLOYMENT_GUIDE.md"
    echo "2. Save it to /etc/nginx/sites-available/portfolio"
    echo "3. Enable the site: sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/"
    echo "4. Test config: sudo nginx -t"
    echo "5. Restart Nginx: sudo systemctl restart nginx"
else
    print_warning "Nginx not found. Please install Nginx first"
fi

print_status "Setting up SSL certificate..."
if command -v certbot &> /dev/null; then
    print_status "To set up SSL certificate, run:"
    echo "sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com"
else
    print_warning "Certbot not found. Please install Certbot first"
fi

print_status "Setting up firewall..."
if command -v ufw &> /dev/null; then
    print_status "Configuring firewall..."
    sudo ufw allow ssh
    sudo ufw allow 80
    sudo ufw allow 443
    sudo ufw --force enable
    print_status "Firewall configured"
else
    print_warning "UFW not found. Please install UFW first"
fi

print_status "Setting up backups..."
mkdir -p /var/backups/portfolio
chmod +x backup.sh
print_status "Backup script created. Add to crontab for automatic backups:"
echo "0 2 * * * /var/www/portfolio/backup.sh"

print_status "🎉 Deployment setup complete!"
print_status "Next steps:"
echo "1. Edit .env.local with your production values"
echo "2. Set up your database"
echo "3. Configure Nginx"
echo "4. Set up SSL certificate"
echo "5. Point your domain to this server"
echo "6. Test your application"

print_status "Useful commands:"
echo "- View logs: pm2 logs portfolio"
echo "- Restart app: pm2 restart portfolio"
echo "- Check status: pm2 status"
echo "- View Nginx logs: sudo tail -f /var/log/nginx/error.log"
