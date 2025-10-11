# 404 Error Troubleshooting Guide

## Problem: 404 Errors on All Pages

If you're seeing 404 errors on every page while the header and footer still show, this is a common SvelteKit static hosting issue.

## Root Cause

The issue occurs when:

1. SvelteKit generates static files but the hosting platform doesn't serve them correctly
2. Trailing slash configuration conflicts with server expectations
3. Fallback routing isn't properly configured

## Solution Applied

We've fixed this by updating the configuration:

### 1. Updated `src/routes/+layout.js`

```javascript
export const trailingSlash = 'never'; // Changed from 'always'
```

### 2. Updated `svelte.config.js`

```javascript
adapter: adapter({
	fallback: '404.html', // Changed from 'index.html'
	strict: true // Ensure all routes are prerendered
});
```

### 3. Generated Multiple File Formats

The build now creates:

- **Directory structure**: `/om-oss/index.html` (for URLs like `/om-oss/`)
- **Flat files**: `/om-oss.html` (for URLs like `/om-oss`)
- **Fallback**: `404.html` for missing pages

### 4. Added Server Configuration Files

- `_redirects` - For Netlify-style platforms
- `.htaccess` - For Apache servers

## Verification

After deployment, test these URLs:

- ✅ `https://yoursite.com/` (homepage)
- ✅ `https://yoursite.com/om-oss` (about page)
- ✅ `https://yoursite.com/tjenester` (services page)
- ✅ `https://yoursite.com/kontakt` (contact page)

## Platform-Specific Notes

### Dokploy/Docker

The updated Dockerfile uses `serve --single` flag for proper SPA routing.

### Netlify

Uses `_redirects` file for routing configuration.

### Apache/cPanel

Uses `.htaccess` file for URL rewriting.

### Nginx

May need additional configuration in your server block:

```nginx
location / {
    try_files $uri $uri.html $uri/ /404.html;
}
```

## If Issues Persist

1. **Check server logs** for specific error messages
2. **Verify build output** contains both directory and flat file structures
3. **Test locally** with `npm run preview`
4. **Check hosting platform documentation** for SPA/static site requirements

## Quick Fix Commands

```bash
# Rebuild with new configuration
npm run build

# Verify deployment readiness
npm run verify:deployment

# Test locally
npm run preview
```
