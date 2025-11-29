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

The project uses environment variables for sensitive configuration. Create a `.env.local` file in the project root for local development.

**Available Variables:**

```
# Resend Email Service (required for contact form)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@mediweb.no
RESEND_TO_CONTACT_EMAIL=your-email@example.com

# Google Analytics (optional)
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Setup Instructions:**

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Resend API key:
   - Visit [https://resend.com/api-keys](https://resend.com/api-keys)
   - Create a new API key
   - Copy it to `RESEND_API_KEY` in `.env.local`

3. Update contact email addresses:
   - `RESEND_FROM_EMAIL`: Should match your verified domain in Resend
   - `RESEND_TO_CONTACT_EMAIL`: Where contact form submissions are sent

4. (Optional) Add Google Analytics:
   - Get your Measurement ID from [Google Analytics](https://analytics.google.com/)
   - Add it to `GA_MEASUREMENT_ID`

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

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