# Portfolio App Deployment Guide for Hostinger

This guide will walk you through deploying your Next.js portfolio application to Hostinger with a custom domain.

## Prerequisites

- Hostinger hosting account with VPS or Cloud hosting plan
- Domain name (can be purchased through Hostinger or external provider)
- Git repository with your code
- Basic knowledge of terminal/command line

## Step 1: Prepare Your Application for Production

### 1.1 Environment Variables
Create a `.env.production` file with your production settings:

```env
# Database (use Hostinger's database credentials)
DATABASE_URL="postgresql://username:password@host:port/database_name"

# Next.js
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-super-secret-key-here"

# App Configuration
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NODE_ENV="production"

# Security
ADMIN_EMAIL="iwufrancis571@gmail.com"
ADMIN_PASSWORD="YourSecurePassword123!"
```

### 1.2 Build Optimization
Update your `next.config.mjs` for production:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  images: {
    domains: ['yourdomain.com'],
    unoptimized: false,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
};

export default nextConfig;
```

### 1.3 Security Headers
Your middleware.js already includes security headers, but ensure they're production-ready.

## Step 2: Set Up Hostinger VPS/Cloud Hosting

### 2.1 Access Your VPS
1. Log into your Hostinger control panel
2. Go to VPS section
3. Access your VPS via SSH or terminal

### 2.2 Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (LTS version)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Nginx
sudo apt install nginx -y

# Install Git
sudo apt install git -y
```

### 2.3 Set Up PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
```

## Step 3: Deploy Your Application

### 3.1 Clone Your Repository

```bash
# Navigate to web directory
cd /var/www

# Clone your repository
sudo git clone https://github.com/yourusername/portfolio.git
sudo chown -R $USER:$USER /var/www/portfolio
cd portfolio
```

### 3.2 Install Dependencies and Build

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Set up environment variables
cp .env.example .env.local
nano .env.local  # Edit with your production values
```

### 3.3 Set Up Database

```bash
# Run database migrations
npm run db:migrate

# Create admin user
npm run create-admin
```

## Step 4: Configure Nginx

### 4.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration (will be set up with Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;

    # Static files
    location /_next/static/ {
        alias /var/www/portfolio/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        alias /var/www/portfolio/public/;
        expires 1y;
        add_header Cache-Control "public";
    }

    # Main application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4.2 Enable the Site

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Step 5: Set Up SSL Certificate

### 5.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 5.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Step 6: Set Up PM2 Process Management

### 6.1 Create PM2 Configuration

```bash
nano ecosystem.config.js
```

Add the following:

```javascript
module.exports = {
  apps: [{
    name: 'portfolio',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/portfolio',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

### 6.2 Start the Application

```bash
# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
```

## Step 7: Configure Domain DNS

### 7.1 Point Domain to Hostinger

1. Log into your domain registrar (or Hostinger if domain is there)
2. Update DNS records:
   - A record: `@` → Your VPS IP address
   - A record: `www` → Your VPS IP address
   - CNAME record: `www` → `yourdomain.com` (optional)

### 7.2 Wait for DNS Propagation

DNS changes can take 24-48 hours to fully propagate. You can check status using:
- https://dnschecker.org
- `nslookup yourdomain.com`

## Step 8: Final Security Setup

### 8.1 Configure Firewall

```bash
# Enable UFW
sudo ufw enable

# Allow SSH, HTTP, and HTTPS
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Check status
sudo ufw status
```

### 8.2 Set Up Automatic Updates

```bash
# Install unattended-upgrades
sudo apt install unattended-upgrades -y

# Configure automatic security updates
sudo dpkg-reconfigure -plow unattended-upgrades
```

## Step 9: Monitoring and Maintenance

### 9.1 Set Up Log Monitoring

```bash
# View application logs
pm2 logs portfolio

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 9.2 Set Up Backups

Create a backup script:

```bash
nano /var/www/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/portfolio"
mkdir -p $BACKUP_DIR

# Backup database
pg_dump portfolio_db > $BACKUP_DIR/db_backup_$DATE.sql

# Backup application files
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz /var/www/portfolio

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

Make it executable and set up cron:

```bash
chmod +x /var/www/backup.sh
crontab -e

# Add this line for daily backups at 2 AM
0 2 * * * /var/www/backup.sh
```

## Step 10: Testing Your Deployment

### 10.1 Test All Functionality

1. Visit `https://yourdomain.com`
2. Test all pages and features
3. Test admin panel at `https://yourdomain.com/admin`
4. Test contact form
5. Test file uploads
6. Test responsive design

### 10.2 Performance Testing

```bash
# Install testing tools
npm install -g lighthouse

# Run performance audit
lighthouse https://yourdomain.com --output html --output-path ./lighthouse-report.html
```

## Troubleshooting

### Common Issues

1. **502 Bad Gateway**: Check if PM2 is running (`pm2 status`)
2. **Database Connection Error**: Verify database credentials and connection
3. **SSL Certificate Issues**: Check Certbot logs (`sudo certbot logs`)
4. **Static Files Not Loading**: Check Nginx configuration and file permissions

### Useful Commands

```bash
# Restart application
pm2 restart portfolio

# View application status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# View system resources
htop
```

## Maintenance Schedule

- **Daily**: Check application logs
- **Weekly**: Review security updates
- **Monthly**: Update dependencies and run security audits
- **Quarterly**: Review and update SSL certificates

## Security Checklist

- ✅ HTTPS enabled with valid SSL certificate
- ✅ Security headers configured
- ✅ Firewall enabled
- ✅ Database credentials secured
- ✅ Admin routes protected
- ✅ Rate limiting enabled
- ✅ Input validation implemented
- ✅ File upload restrictions
- ✅ Regular backups configured

## Support

If you encounter issues:

1. Check the logs first
2. Verify all configurations
3. Test locally before deploying
4. Keep backups before making changes

Your portfolio is now live and secure! 🚀
