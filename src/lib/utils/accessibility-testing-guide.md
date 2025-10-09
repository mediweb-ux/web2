# Accessibility Testing Guide

This guide explains how to use jest-axe with Svelte 5 components in our testing environment.

## Setup

The accessibility testing setup is configured in:
- `src/test-setup.ts` - Contains browser mocks and environment setup for Svelte 5 compatibility
- Canvas API mocking is included for components that use canvas elements
- All browser APIs are properly mocked to support axe-core functionality

## Working Configuration

The test environment is fully configured for accessibility testing with Svelte 5:
- ✅ jest-axe integration working
- ✅ Canvas API properly mocked
- ✅ Browser environment simulation complete
- ✅ All axe-core rules supported

## Basic Usage

```typescript
import { render } from '@testing-library/svelte';
import { axe, toHaveNoViolations } from 'jest-axe';
import MyComponent from './MyComponent.svelte';

expect.extend(toHaveNoViolations);

it('should not have accessibility violations', async () => {
  const { container } = render(MyComponent, { 
    props: { /* component props */ } 
  });
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Using Utility Functions

```typescript
import { testAccessibility } from '$lib/utils/accessibility-testing';

it('should pass accessibility tests', async () => {
  const { container } = render(MyComponent);
  await testAccessibility(container);
});
```

## Custom Configuration

```typescript
it('should pass accessibility with custom rules', async () => {
  const { container } = render(MyComponent);
  
  const results = await axe(container, {
    rules: {
      'color-contrast': { enabled: false }, // Disable specific rules
      'region': { enabled: false }
    }
  });
  
  expect(results).toHaveNoViolations();
});
```

## WCAG Compliance Testing

```typescript
it('should meet WCAG 2.1 AA standards', async () => {
  const { container } = render(MyComponent);
  
  const results = await axe(container, {
    tags: ['wcag2a', 'wcag2aa', 'wcag21aa']
  });
  
  expect(results).toHaveNoViolations();
});
```

## Testing Specific Accessibility Areas

### Color Contrast
```typescript
import { testColorContrast } from '$lib/utils/accessibility-testing';

it('should have proper color contrast', async () => {
  const { container } = render(MyComponent);
  const results = await testColorContrast(container);
  expect(results).toHaveNoViolations();
});
```

### Keyboard Navigation
```typescript
import { testKeyboardAccessibility } from '$lib/utils/accessibility-testing';

it('should be keyboard accessible', async () => {
  const { container } = render(MyComponent);
  const results = await testKeyboardAccessibility(container);
  expect(results).toHaveNoViolations();
});
```

### ARIA Implementation
```typescript
import { testAriaAccessibility } from '$lib/utils/accessibility-testing';

it('should have proper ARIA implementation', async () => {
  const { container } = render(MyComponent);
  const results = await testAriaAccessibility(container);
  expect(results).toHaveNoViolations();
});
```

## Common Issues and Solutions

### Canvas Context Error
If you see "HTMLCanvasElement.prototype.getContext" errors, the canvas mock in `src/test-setup.ts` should handle this automatically.

### Region Rule Violations
For component testing, the `region` rule is disabled by default in `defaultAxeConfig` since individual components don't need to be landmark regions.

### Button Name Violations
Ensure buttons have accessible names via:
- `ariaLabel` prop
- Text content
- `aria-labelledby` attribute

### Color Contrast Issues
Test with both light and dark themes:
```typescript
it('should have proper contrast in both themes', async () => {
  const { container } = render(MyComponent);
  
  // Test light theme
  document.documentElement.classList.remove('dark');
  let results = await testColorContrast(container);
  expect(results).toHaveNoViolations();
  
  // Test dark theme
  document.documentElement.classList.add('dark');
  results = await testColorContrast(container);
  expect(results).toHaveNoViolations();
});
```

## Best Practices

1. **Always test with realistic props** - Use meaningful labels and content
2. **Test different states** - Normal, disabled, loading, error states
3. **Test interactive elements** - Buttons, links, form controls
4. **Test complex components** - Forms, navigation, modals
5. **Use semantic HTML** - Proper headings, landmarks, lists
6. **Provide alternative text** - Images, icons, complex content
7. **Test keyboard navigation** - Tab order, focus management
8. **Test screen reader compatibility** - ARIA labels, descriptions, live regions

## Running Accessibility Tests

```bash
# Run all accessibility tests
npm run test:accessibility

# Run specific component accessibility tests
npm run test:run src/lib/components/ui/Button.test.ts

# Run comprehensive accessibility suite
npm run test:run src/lib/components/ui/accessibility.test.ts
```

## Integration with CI/CD

Accessibility tests run as part of the regular test suite and will fail the build if violations are found. This ensures accessibility is maintained throughout development.