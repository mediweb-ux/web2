# 🚀 Deployment Guide

## GitHub Actions Workflow

The `.github/workflows/deploy.yml` file is configured for your MediWeb Solutions project.

### Current Status: ✅ Ready for Testing

The workflow will:
1. **Test**: Run linting, type checking, and tests
2. **Build**: Create production build using `npm run build:production`
3. **Deploy**: Upload build artifacts (VPS deployment ready to configure)

### Workflow Triggers

- **Push to main/master**: Full test, build, and deploy
- **Pull Requests**: Test and build only (no deployment)

## 🔧 VPS Deployment Setup

To enable automatic deployment to your VPS, add these secrets to your GitHub repository:

### GitHub Secrets (Settings → Secrets and variables → Actions)

```
VPS_SSH_KEY     = Your private SSH key for VPS access
VPS_HOST        = Your VPS IP address or domain
VPS_USER        = Your VPS username (e.g., root, ubuntu)
VPS_PATH        = Path to your web directory (e.g., /var/www/html)
```

### Enable VPS Deployment

Uncomment and configure these lines in `.github/workflows/deploy.yml`:

```yaml
# Install SSH key
mkdir -p ~/.ssh
echo "${{ secrets.VPS_SSH_KEY }}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan -H ${{ secrets.VPS_HOST }} >> ~/.ssh/known_hosts

# Deploy files to VPS
rsync -avz --delete build/ ${{ secrets.VPS_USER }}@${{ secrets.VPS_HOST }}:${{ secrets.VPS_PATH }}
```

## 🔑 SSH Key Setup

### 1. Generate SSH Key (if you don't have one)

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions@mediweb.no"
```

### 2. Add Public Key to VPS

```bash
# Copy public key to VPS
ssh-copy-id -i ~/.ssh/id_rsa.pub user@your-vps-ip

# Or manually add to ~/.ssh/authorized_keys on VPS
```

### 3. Add Private Key to GitHub Secrets

Copy the private key content:
```bash
cat ~/.ssh/id_rsa
```

Add it as `VPS_SSH_KEY` secret in GitHub.

## 🌐 Web Server Configuration

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    # SPA routing - fallback to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/html
    
    # SPA routing
    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Fallback to index.html
        FallbackResource /index.html
    </Directory>
</VirtualHost>
```

## 📋 Manual Deployment

If you prefer manual deployment:

```bash
# Build locally
npm run build:production

# Upload to VPS
scp -r build/* user@your-vps:/var/www/html/

# Or use rsync
rsync -avz --delete build/ user@your-vps:/var/www/html/
```

## 🔍 Testing the Workflow

1. **Push to GitHub**: The workflow will run automatically
2. **Check Actions tab**: Monitor the build and deployment process
3. **Download artifacts**: If deployment fails, you can download the build files manually

## 🎯 Next Steps

1. **Configure VPS secrets** in GitHub
2. **Uncomment deployment commands** in the workflow
3. **Test with a small change** to verify deployment works
4. **Set up domain and SSL** for production

Your deployment pipeline is ready! 🎉