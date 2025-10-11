# Deployment Options for MediWeb Solutions

## Current Setup: Static File Serving (Recommended)

Your app is now configured to serve static files using the `serve` package. This is efficient and works well for your SvelteKit static site.

### Files Created:
- `nixpacks.toml` - Nixpacks configuration
- `Dockerfile` - Docker fallback configuration
- Updated `package.json` with serve dependency and start script

### How it works:
1. Nixpacks builds your app with `npm run build`
2. Serves the static files from the `build` directory using `serve`
3. Runs on port 3000

## Alternative: Node.js Adapter

If you want to switch to a Node.js server instead, follow these steps:

### 1. Install Node.js Adapter
```bash
npm install @sveltejs/adapter-node
```

### 2. Update svelte.config.js
```javascript
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      out: 'build',
      precompress: false,
      envPrefix: '',
    })
  }
};

export default config;
```

### 3. Update package.json start script
```json
{
  "scripts": {
    "start": "node build"
  }
}
```

### 4. Update nixpacks.toml
```toml
[phases.setup]
nixPkgs = ["nodejs_20", "npm-9_x"]

[phases.install]
cmds = ["npm ci"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"
```

## Deployment Instructions

### For Dokploy:
1. Push your code to GitHub with the new configuration files
2. In Dokploy, create a new application
3. Connect your GitHub repository
4. Set the build provider to "Nixpacks"
5. Deploy

### Environment Variables (if needed):
- `PORT=3000` (default)
- `HOST=0.0.0.0` (for Docker)

### Troubleshooting:
- If Nixpacks fails, Dokploy will automatically try the Dockerfile
- Check the build logs for any missing dependencies
- Ensure all files are committed to your repository

## Recommended Approach

Stick with the **static file serving** approach since:
- ✅ Faster loading times
- ✅ Lower server resource usage  
- ✅ Better caching capabilities
- ✅ Simpler deployment
- ✅ Your app is already optimized for static generation