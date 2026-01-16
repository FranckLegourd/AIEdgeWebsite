# Deployment Guide

This guide covers deploying the AI Edge International website to various platforms.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Building for Production](#building-for-production)
- [Hostinger Deployment](#hostinger-deployment)
- [Railway Deployment](#railway-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Docker Deployment](#docker-deployment)
- [Environment Configuration](#environment-configuration)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables are configured
- [ ] Build passes locally: `npm run build`
- [ ] TypeScript checks pass: `npm run check`
- [ ] Test the production build locally: `npm start`
- [ ] Email configuration is tested
- [ ] All translations are complete

---

## Building for Production

### Build Command

```bash
npm run build
```

This command:
1. Runs `vite build` to compile the React frontend
2. Runs `esbuild` to bundle the Express server

### Build Output

```
dist/
├── client/           # Static frontend assets
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].js
│   │   ├── index-[hash].css
│   │   └── ...
│   └── ...
└── index.js          # Bundled server
```

### Running Production Build

```bash
npm start
# or
NODE_ENV=production node dist/index.js
```

---

## Hostinger Deployment

Hostinger provides Node.js hosting through their VPS or Cloud Hosting plans.

### Step 1: Prepare Your Files

```bash
# Build locally
npm run build

# Files to upload:
# - dist/
# - package.json
# - package-lock.json
# - .env (create on server)
```

### Step 2: Connect to Server

```bash
ssh user@your-hostinger-ip
```

### Step 3: Upload Files

Use SFTP, SCP, or Hostinger's File Manager:

```bash
scp -r dist/ package.json package-lock.json user@server:/home/user/app/
```

### Step 4: Install Dependencies

```bash
cd ~/app
npm install --production
```

### Step 5: Configure Environment Variables

Create `.env` file:

```bash
nano .env
```

Add:

```env
NODE_ENV=production
SESSION_SECRET=your_secure_random_string
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=your_email@yourdomain.com
MAIL_PASSWORD=your_email_password
PORT=3000
```

### Step 6: Start the Application

Using PM2 (recommended):

```bash
npm install -g pm2
pm2 start dist/index.js --name "aiedge"
pm2 save
pm2 startup
```

### Step 7: Configure Reverse Proxy

In Hostinger panel or Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Railway Deployment

Railway provides easy deployment from GitHub.

### Step 1: Connect GitHub Repository

1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository

### Step 2: Configure Environment Variables

In Railway dashboard:

1. Go to your project
2. Click on the service
3. Go to "Variables" tab
4. Add each variable:

```
NODE_ENV=production
SESSION_SECRET=your_secure_random_string
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=your_email@yourdomain.com
MAIL_PASSWORD=your_email_password
```

### Step 3: Configure Build Settings

Railway should auto-detect the build command, but you can specify:

- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### Step 4: Deploy

Railway will automatically deploy on push to main branch.

### Step 5: Configure Domain

1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Vercel Deployment

Vercel excels at serverless deployments but requires adaptation for the Express backend.

### Option 1: Frontend Only (Vercel) + Separate Backend

Deploy only the frontend to Vercel:

1. Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client"
}
```

2. Host the backend separately (Railway, Render, etc.)

### Option 2: Vercel Serverless Functions

Convert Express routes to Vercel serverless functions (requires significant restructuring).

---

## Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SESSION_SECRET=${SESSION_SECRET}
      - MAIL_HOST=${MAIL_HOST}
      - MAIL_PORT=${MAIL_PORT}
      - MAIL_USERNAME=${MAIL_USERNAME}
      - MAIL_PASSWORD=${MAIL_PASSWORD}
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t aiedge-website .

# Run container
docker run -d \
  --name aiedge \
  -p 3000:3000 \
  --env-file .env \
  aiedge-website
```

### Docker with Nginx

```yaml
version: '3.8'

services:
  app:
    build: .
    expose:
      - "3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - app
    restart: unless-stopped
```

---

## Environment Configuration

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SESSION_SECRET` | Secret for session encryption | `a-very-long-random-string-here` |
| `MAIL_HOST` | SMTP server | `smtp.hostinger.com` |
| `MAIL_PORT` | SMTP port | `465` or `587` |
| `MAIL_USERNAME` | SMTP username | `email@domain.com` |
| `MAIL_PASSWORD` | SMTP password | `your-password` |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Set to `production` for prod |
| `PORT` | `3000` | Server port |

### Generating Secure Secrets

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using openssl
openssl rand -hex 64
```

---

## Post-Deployment

### Verify Deployment

1. **Homepage loads**: Visit your domain
2. **API responds**: Check `/api/user` (should return 401)
3. **Contact form**: Submit a test inquiry
4. **Email received**: Check your inbox for notification

### Set Up Monitoring

#### PM2 Monitoring (Free)

```bash
pm2 monit
pm2 logs aiedge
```

#### External Monitoring

- [UptimeRobot](https://uptimerobot.com/) - Free uptime monitoring
- [Sentry](https://sentry.io/) - Error tracking
- [LogDNA](https://www.logdna.com/) - Log management

### SSL/HTTPS

#### Using Certbot (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

#### Auto-renewal

```bash
sudo crontab -e
# Add:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## Troubleshooting

### Common Issues

#### Application Won't Start

**Symptoms**: Server fails to start

**Solutions**:
```bash
# Check logs
pm2 logs aiedge

# Verify environment variables
cat .env

# Check Node.js version
node --version  # Should be 20+
```

#### Email Not Sending

**Symptoms**: Contact form works but no email received

**Solutions**:
1. Verify SMTP credentials
2. Check firewall allows outbound SMTP
3. Check spam folder
4. Try port 587 if 465 fails

```javascript
// Test email manually
node -e "
const nodemailer = require('nodemailer');
const t = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: { user: 'email@domain.com', pass: 'password' }
});
t.verify().then(() => console.log('OK')).catch(console.error);
"
```

#### Session Not Persisting

**Symptoms**: User logged out between requests

**Solutions**:
1. Ensure `SESSION_SECRET` is set
2. Check cookie settings
3. Verify HTTPS in production (secure cookies)

#### 502 Bad Gateway

**Symptoms**: Nginx returns 502

**Solutions**:
```bash
# Check if app is running
pm2 status

# Check port binding
netstat -tlnp | grep 3000

# Check nginx config
sudo nginx -t
```

#### Memory Issues

**Symptoms**: Application crashes with OOM

**Solutions**:
```bash
# Increase Node.js memory
NODE_OPTIONS="--max-old-space-size=1024" node dist/index.js

# With PM2
pm2 start dist/index.js --node-args="--max-old-space-size=1024"
```

### Debug Mode

Enable debug logging:

```bash
DEBUG=* npm start
```

### Health Check Endpoint

Add a health check for monitoring:

```typescript
// In routes.ts
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

---

## Rollback Procedure

### Using Git

```bash
# Find previous working commit
git log --oneline -10

# Checkout previous version
git checkout <commit-hash>

# Rebuild and restart
npm run build
pm2 restart aiedge
```

### Using PM2

```bash
# Keep previous version
cp -r dist dist-backup

# If deployment fails, rollback
rm -rf dist
mv dist-backup dist
pm2 restart aiedge
```

---

## Performance Optimization

### Enable Gzip Compression

Add to Express:

```typescript
import compression from 'compression';
app.use(compression());
```

### Cache Static Assets

```typescript
app.use(express.static('dist/client', {
  maxAge: '1y',
  etag: true
}));
```

### Use a CDN

Consider serving static assets from:
- Cloudflare
- AWS CloudFront
- Fastly

---

## Security Hardening

### HTTP Security Headers

```typescript
import helmet from 'helmet';
app.use(helmet());
```

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

### Keep Dependencies Updated

```bash
npm audit
npm update
```

---

## Support

If you encounter issues:

1. Check this troubleshooting guide
2. Review server logs
3. Check GitHub issues
4. Contact: agent@aiedgeinternational.com
