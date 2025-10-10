# Hero Section Background Images

The website now supports full-width background images for hero sections on all pages. This creates a more visually engaging experience while maintaining readability and accessibility.

## HeroSection Component

### Usage

```svelte
<script>
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import backgroundImage from '$lib/assets/hero-backgrounds/your-image.svg';
</script>

<HeroSection
  title="Your Page Title"
  subtitle="Your page subtitle or description"
  backgroundImage={backgroundImage}
  overlayOpacity={0.6}
  minHeight="min-h-[500px]"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Main heading text |
| `subtitle` | `string` | `''` | Subtitle/description text |
| `backgroundImage` | `string` | `''` | Path to background image |
| `overlayOpacity` | `number` | `0.6` | Dark overlay opacity (0-1) |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'center'` | Text alignment |
| `minHeight` | `string` | `'min-h-[400px]'` | Minimum height CSS class |
| `className` | `string` | `''` | Additional CSS classes |

### Slot Support

The component supports a default slot for additional content like buttons:

```svelte
<HeroSection title="Contact Us" subtitle="Get in touch">
  <div class="mt-8">
    <Button href="/contact" variant="primary">
      Start Your Project
    </Button>
  </div>
</HeroSection>
```

## Background Images

### Location
All hero background images are stored in:
```
src/lib/assets/hero-backgrounds/
```

### Current Images

1. **placeholder.svg** - Generic blue gradient with geometric patterns
2. **services.svg** - Green gradient with hexagonal patterns (for services pages)
3. **about.svg** - Purple gradient with team/collaboration elements (for about page)
4. **contact.svg** - Blue gradient with communication elements (for contact page)

### Image Specifications

**Recommended dimensions:** 1920x600px (3.2:1 aspect ratio)

**Format recommendations:**
- **SVG**: Best for geometric patterns, gradients, and scalable graphics
- **WebP**: Best for photographic content (smaller file sizes)
- **JPG**: Fallback for photographic content
- **PNG**: For images requiring transparency

### Creating New Background Images

#### For SVG (Recommended for patterns/gradients):
```svg
<svg width="1920" height="600" viewBox="0 0 1920 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="yourGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#your-color;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#your-color;stop-opacity:0.4" />
    </linearGradient>
  </defs>
  <rect width="1920" height="600" fill="url(#yourGradient)"/>
  <!-- Add your patterns/shapes here -->
</svg>
```

#### Design Guidelines:
- Use subtle patterns and low opacity elements
- Ensure text readability with proper contrast
- Consider both light and dark theme compatibility
- Keep file sizes reasonable (SVGs are preferred for this reason)
- Use brand colors that complement the site's color scheme

## Implementation Examples

### Services Page
```svelte
<HeroSection
  title="Our Services"
  subtitle="Professional solutions for your digital needs"
  backgroundImage={servicesBg}
  overlayOpacity={0.5}
  minHeight="min-h-[450px]"
/>
```

### About Page
```svelte
<HeroSection
  title="About Us"
  subtitle="Passionate team creating exceptional digital experiences"
  backgroundImage={aboutBg}
  overlayOpacity={0.6}
  minHeight="min-h-[500px]"
/>
```

### Contact Page
```svelte
<HeroSection
  title="Contact Us"
  subtitle="Ready to start your project? Let's talk!"
  backgroundImage={contactBg}
  overlayOpacity={0.4}
  minHeight="min-h-[500px]"
/>
```

## Accessibility Features

- **Text shadows** ensure readability on all backgrounds
- **Overlay opacity** can be adjusted for optimal contrast
- **Semantic HTML** with proper heading hierarchy
- **Responsive design** works on all screen sizes
- **Focus management** for keyboard navigation

## Performance Considerations

- **SVG images** are lightweight and scalable
- **CSS background-size: cover** ensures proper scaling
- **Lazy loading** can be implemented for large images
- **WebP format** recommended for photographic content

## Dark Mode Compatibility

The hero sections work seamlessly with the site's dark mode:
- White text with shadows for readability
- Overlay opacity adjusts automatically
- Background images remain consistent across themes

## Future Enhancements

Potential improvements to consider:
- **Video backgrounds** for dynamic content
- **Parallax scrolling** effects
- **Animated gradients** or subtle motion
- **Image optimization** with multiple formats
- **Content-aware overlays** that adjust based on image content