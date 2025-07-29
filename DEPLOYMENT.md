# Deployment Guide

## Environment Variables

This application uses environment variables to make it flexible across different hosting environments.

### Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
POSTGRES_URL="your-postgres-connection-string"

# Authentication
AUTH_SECRET="your-generated-secret-key"

# Application URL (for metadata and Open Graph)
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### Environment-Specific Setup

#### Local Development
```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### Vercel Deployment
```env
NEXT_PUBLIC_APP_URL="https://your-app-name.vercel.app"
```

#### Other Hosting Platforms
```env
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### Generating AUTH_SECRET

You can generate a secure secret key using:

```bash
# macOS/Linux
openssl rand -base64 32

# Windows
# Use https://generate-secret.vercel.app/32
```

### Database Setup

Make sure your PostgreSQL database is set up with the required tables. The application expects:

- `users` table with `id`, `name`, `email`, `password` columns
- `customers` table with customer data
- `invoices` table with invoice data

### Testing Authentication

Use these credentials to test the authentication:
- Email: `user@nextmail.com`
- Password: `123456`

## Deployment Platforms

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repository
2. Add environment variables in the Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Railway
1. Connect your GitHub repository
2. Add environment variables in the Railway dashboard
3. Deploy automatically

## Notes

- The `NEXT_PUBLIC_APP_URL` is used for metadata and Open Graph images
- The application will work without this variable (defaults to localhost)
- Make sure to update the URL when deploying to production