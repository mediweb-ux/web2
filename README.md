# MediWeb Solutions

A professional website for MediWeb Solutions, offering web development, medical services, and educational courses. Built with modern web technologies for optimal performance and accessibility.

## 🚀 Features

- **Modern Stack**: SvelteKit + TypeScript + Tailwind CSS
- **Responsive Design**: Mobile-first, works on all devices
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized for Core Web Vitals
- **SEO Ready**: Meta tags, structured data, sitemap
- **Dark/Light Theme**: Automatic theme switching
- **Type Safety**: Full TypeScript support
- **Progressive Enhancement**: Works without JavaScript

## 🛠 Tech Stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + Playwright
- **Linting**: ESLint + Prettier
- **Build**: Vite
- **Deployment**: Static site generation

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd mediweb-svelte

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Lint and format
npm run lint
npm run format
```

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/     # UI components
│   │   ├── layout/     # Header, Footer, Navigation
│   │   ├── sections/   # Page sections
│   │   └── ui/         # Reusable UI components
│   ├── stores/         # Svelte stores (theme, etc.)
│   ├── data/           # Static data
│   └── assets/         # Images, fonts
├── routes/             # SvelteKit routes
│   ├── tjenester/      # Services pages
│   ├── kontakt/        # Contact page
│   └── om-oss/         # About page
└── static/             # Static assets
```

## 🚀 Deployment

### Build

```bash
npm run build
```

The built site will be in the `build/` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag & drop the `build` folder or connect via Git
- **Your VPS**: Upload the `build` folder to your web server
- **GitHub Pages**: Use GitHub Actions for automatic deployment

### Environment Variables

Create `.env` files for different environments:

- `.env.local` - Local development
- `.env.production` - Production settings
- `.env.staging` - Staging environment

## 🎨 Customization

### Theme Colors

Edit `src/app.css` to customize the color scheme:

```css
:root {
  --primary: 221 83% 45%;
  --background: 0 0% 100%;
  /* ... other colors */
}
```

### Content

- **Services**: Edit `src/lib/data/services.ts`
- **Navigation**: Update `src/lib/components/layout/Navigation.svelte`
- **Contact Info**: Modify `src/routes/kontakt/+page.svelte`

## 📄 License

© 2025 MediWeb Solutions. All rights reserved.