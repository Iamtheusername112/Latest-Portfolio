# 🚀 Portfolio Setup Guide

## Environment Configuration

### Step 1: Create Environment File
Create a `.env.local` file in your project root with the following content:

```env
# Database Configuration
DATABASE_URL="your-neon-postgresql-connection-string-here"

# JWT Secret for authentication (change this in production)
JWT_SECRET="portfolio-admin-secret-key-2024-change-in-production"

# Admin Configuration
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"

# Next.js Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Development Configuration
NODE_ENV="development"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Setup Database
```bash
npm run setup
```

This will:
- Check environment variables
- Initialize the database
- Create default admin user
- Test authentication system

### Step 4: Start Development Server
```bash
npm run dev
```

## 🔐 Default Admin Credentials
- **Email**: `admin@example.com`
- **Password**: `admin123`

## 📱 Access Points
- **Portfolio**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin

## 🛠️ Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run setup` - Complete setup (database + admin user)
- `npm run check-env` - Check environment variables
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:push` - Push schema changes to database

## 🔧 Troubleshooting

### Environment Variables Not Loading
1. Make sure `.env.local` exists in project root
2. Restart your development server
3. Run `npm run check-env` to verify

### Database Connection Issues
1. Check your `DATABASE_URL` is correct
2. Ensure your Neon database is active
3. Run `npm run db:push` to sync schema

### Authentication Issues
1. Run `npm run setup` to recreate admin user
2. Check browser console for errors
3. Clear browser cookies and try again

## 🎯 Features Included
- ✅ Modern portfolio website
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Admin panel with database
- ✅ Content management system
- ✅ Secure authentication
- ✅ Media management
- ✅ SEO optimization
- ✅ Performance monitoring
- ✅ Security features

## 🔒 Security Best Practices

### Environment Variables
- **Never commit** `.env.local` or `.env` files to version control
- **Use strong, unique** JWT secrets (at least 32 characters)
- **Rotate secrets** regularly in production
- **Use different secrets** for development and production

### Database Security
- **Use connection pooling** in production
- **Enable SSL** for database connections
- **Restrict database access** to your application only
- **Regular backups** and monitoring

### Application Security
- **HTTPS only** in production
- **HTTP-only cookies** for authentication
- **Rate limiting** on authentication endpoints
- **Input validation** on all forms
- **Regular security updates**

## 🚀 Production Deployment
1. Change `JWT_SECRET` to a secure random string (32+ characters)
2. Update `NEXTAUTH_URL` to your domain
3. Set `NODE_ENV=production`
4. Use a secure database connection string
5. Enable HTTPS and security headers
6. Deploy to Vercel, Netlify, or your preferred platform
