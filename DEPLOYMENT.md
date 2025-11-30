# Deployment Guide

## Quick Deployment Verification

Before deploying, run the verification script to ensure everything is ready:

```bash
npm run verify:deployment
```

This script will check:
- ✅ Dependencies are installed and synced
- ✅ Build completes successfully  
- ✅ Build artifacts are generated

## Common Deployment Issues

### 1. Package Lock File Out of Sync

**Error:** `npm ci can only install packages when your package.json and package-lock.json are in sync`

**Solution:**
```bash
# Delete the lock file and reinstall
rm package-lock.json
npm install

# Or regenerate with clean install
npm ci --force
```

### 2. 404 Errors on All Pages (Static Hosting)

**Error:** Header and footer show but all pages return 404 errors

**Cause:** SvelteKit routing configuration incompatible with static hosting

**Solution:**
The project is configured with:
- `trailingSlash = 'never'` in `+layout.js`
- `fallback: '404.html'` in `svelte.config.js`
- Both directory structure (`/page/index.html`) and flat files (`/page.html`)

This ensures compatibility with various static hosting platforms.

### 2. Missing Dependencies

**Error:** `Missing: [package-name] from lock file`

**Solution:**
```bash
# Regenerate package-lock.json
npm install

# Verify it's fixed
npm run verify:deployment
```

### 3. Build Failures

**Error:** Build process fails during deployment

**Solution:**
```bash
# Test build locally first
npm run build

# For production build
npm run build:production

# Check for TypeScript errors
npm run check
```

## Deployment Platforms

### Docker Deployment

The project includes a `Dockerfile` for containerized deployment:

```bash
# Build the Docker image
docker build -t mediweb-svelte .

# Run the container
docker run -p 3000:3000 mediweb-svelte
```

#### If your host auto-generates a Dockerfile

Some hosting providers (or build systems like Nixpacks) generate a Dockerfile from `nixpacks.toml` or their own templates. If your deployment logs show errors like `pnpm: command not found` or `UndefinedVar: $NIXPACKS_PATH`, prefer using the repository Dockerfile to avoid mismatches:

- Option A: Configure your host to use `Dockerfile.deploy` (this repo includes that file which mirrors the tested Dockerfile).
- Option B: Clear the host build cache and re-run the build so it picks up recent `nixpacks.toml` changes.

Adding `Dockerfile.deploy` or instructing the host to use the repo Dockerfile prevents host-generated Dockerfiles from invoking `pnpm` before it's installed.

### Quick bootstrap script (defensive)

If you cannot point the provider to `Dockerfile.deploy` and cannot clear the provider cache, you can instruct the host to run a small bootstrap script before the host's install step. The repo includes `scripts/bootstrap-install-pnpm.sh` which will attempt to enable/install `pnpm` safely.

Recommended build command (set in host build settings):

```bash
bash ./scripts/bootstrap-install-pnpm.sh && pnpm install --frozen-lockfile && pnpm run build
```

This ensures `pnpm` is available before `pnpm install` is run and prevents the `pnpm: command not found` error in hosts that execute `pnpm install` early in their generated Dockerfile.

### Static Hosting (Netlify, Vercel, etc.)

1. Build the project:
   ```bash
   npm run build:production
   ```

2. Deploy the `build/` directory to your static hosting platform.

### VPS Deployment

The GitHub Actions workflow includes a template for VPS deployment. Configure the following secrets:
- `VPS_SSH_KEY`: Your SSH private key
- `VPS_HOST`: Your server hostname/IP
- `VPS_USER`: SSH username
- `VPS_PATH`: Deployment path on server

## Environment Variables

Create appropriate `.env` files for different environments:

- `.env.local` - Local development
- `.env.staging` - Staging environment  
- `.env.production` - Production environment

## Build Targets

- `npm run build` - Standard build
- `npm run build:production` - Production build with optimizations
- `npm run build:staging` - Staging build with tests and linting

## Troubleshooting

If deployment fails:

1. Run `npm run verify:deployment` locally
2. Check the build logs for specific errors
3. Ensure all environment variables are set
4. Verify Node.js version compatibility (requires Node 20+)

## Support

For deployment issues, check:
- GitHub Actions logs
- Docker build logs
- Platform-specific deployment logs