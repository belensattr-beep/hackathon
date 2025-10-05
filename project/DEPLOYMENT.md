# 🚀 Deployment Guide

## 🌐 Deployment Options

### Vercel (Recommended)

Vercel provides the easiest deployment experience with automatic builds and preview deployments.

#### Setup
1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   cd project
   vercel
   ```

2. **Environment Variables**
   Add to Vercel dashboard:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Build Configuration**
   ```json
   // vercel.json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

#### Automatic Deployment
- Push to `main` branch → Production deployment
- Create pull request → Preview deployment
- Automatic HTTPS and CDN

### Netlify

#### Setup
1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Environment Variables**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Build Configuration**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [build.environment]
     NODE_VERSION = "18"
   ```

### GitHub Pages

#### Setup
1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add Scripts**
   ```json
   // package.json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure Repository**
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch

### Render

#### Setup
1. **Create Web Service**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set start command: `npm run preview`

2. **Environment Variables**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  asteroid-simulator:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
```

### Build and Run
```bash
# Build image
docker build -t asteroid-simulator .

# Run container
docker run -p 80:80 asteroid-simulator

# Or use docker-compose
docker-compose up -d
```

## ☁️ Cloud Platform Deployment

### AWS Amplify

#### Setup
1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect GitHub repository
   - Select branch: `main`

2. **Build Settings**
   ```yaml
   # amplify.yml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Google Cloud Platform

#### Setup
1. **Create App Engine**
   ```yaml
   # app.yaml
   runtime: nodejs18
   env: standard
   
   handlers:
   - url: /
     static_files: dist/index.html
     upload: dist/index.html
   - url: /(.*)
     static_files: dist/\1
     upload: dist/(.*)
   ```

2. **Deploy**
   ```bash
   gcloud app deploy
   ```

### Azure Static Web Apps

#### Setup
1. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name asteroid-simulator \
     --resource-group myResourceGroup \
     --source https://github.com/your-username/asteroid-simulator \
     --location "Central US" \
     --branch main \
     --app-location "/project" \
     --output-location "dist"
   ```

2. **Configuration**
   ```json
   // staticwebapp.config.json
   {
     "routes": [
       {
         "route": "/*",
         "serve": "/index.html",
         "statusCode": 200
       }
     ]
   }
   ```

## 🔧 Environment Configuration

### Development
```bash
# .env.development
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=your_dev_key
VITE_NASA_API_KEY=DEMO_KEY
```

### Production
```bash
# .env.production
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_prod_key
VITE_NASA_API_KEY=your_nasa_api_key
```

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_NASA_API_KEY` | NASA API key | No (uses DEMO_KEY) |

## 📊 Performance Optimization

### Build Optimization
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'three': ['three'],
          'leaflet': ['leaflet'],
          'lucide': ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### CDN Configuration
```html
<!-- Use CDN for large libraries -->
<script src="https://unpkg.com/three@0.150.0/build/three.min.js"></script>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

### Caching Strategy
```javascript
// Service Worker for caching
const CACHE_NAME = 'asteroid-simulator-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

## 🔒 Security Configuration

### HTTPS Configuration
```nginx
# nginx.conf - HTTPS redirect
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
}
```

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://api.nasa.gov; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               connect-src 'self' https://api.nasa.gov https://*.supabase.co;">
```

## 📈 Monitoring and Analytics

### Error Tracking
```javascript
// Sentry integration
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV
});
```

### Performance Monitoring
```javascript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Analytics
```javascript
// Google Analytics
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

## 🚀 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: project/package-lock.json
      
      - name: Install dependencies
        run: |
          cd project
          npm ci
      
      - name: Build
        run: |
          cd project
          npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: project
```

## 🔄 Rollback Strategy

### Version Management
```bash
# Tag releases
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Rollback to previous version
git checkout v0.9.0
npm run build
# Deploy previous version
```

### Database Migrations
```sql
-- Supabase migration rollback
-- Rollback to previous migration
SELECT supabase_migrations.rollback('20240101000000');
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Build successful
- [ ] Security headers configured
- [ ] Performance optimized

### Post-deployment
- [ ] Application loads correctly
- [ ] API endpoints working
- [ ] Database connections established
- [ ] Error tracking configured
- [ ] Analytics working
- [ ] Performance monitoring active

### Monitoring
- [ ] Error rates normal
- [ ] Response times acceptable
- [ ] Resource usage within limits
- [ ] User feedback positive
- [ ] Security scans clean
