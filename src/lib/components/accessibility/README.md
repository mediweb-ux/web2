# Accessibility Testing Suite

This directory contains comprehensive accessibility testing tools and documentation for the agency website. The testing suite ensures WCAG 2.1 AA compliance across all components and user interactions.

## Overview

The accessibility testing suite includes:

- **Automated Testing**: axe-core integration for automated accessibility checks
- **Keyboard Navigation Testing**: Comprehensive keyboard interaction validation
- **Color Contrast Testing**: WCAG-compliant contrast ratio validation for both themes
- **Focus Management Testing**: Focus indicator and focus flow validation
- **Screen Reader Compatibility**: Manual testing checklist and guidelines

## Running Tests

### All Accessibility Tests
```bash
npm run test:accessibility
# or
npm run test:a11y
```

### Individual Test Categories
```bash
# Run specific test files
npx vitest run src/lib/components/accessibility/accessibility.test.ts
npx vitest run src/lib/components/accessibility/keyboard-navigation.test.ts
npx vitest run src/lib/components/accessibility/color-contrast.test.ts
npx vitest run src/lib/components/accessibility/focus-management.test.ts
```

## Test Files

### `accessibility.test.ts`
Comprehensive accessibility tests using axe-core for all major components:
- Button component accessibility
- Card component accessibility  
- Contact form accessibility
- Navigation component accessibility
- Icon component accessibility
- Color contrast compliance
- Semantic HTML structure
- ARIA implementation

### `keyboard-navigation.test.ts`
Tests keyboard navigation functionality:
- Tab order and focus management
- Keyboard activation (Enter/Space)
- Arrow key navigation
- Escape key handling
- Focus indicators visibility
- Skip link functionality

### `color-contrast.test.ts`
Tests color contrast compliance:
- WCAG AA/AAA contrast ratios
- Light theme contrast validation
- Dark theme contrast validation
- Focus indicator contrast
- Error state contrast
- Link contrast in both themes

### `focus-management.test.ts`
Tests focus management across components:
- Focus indicators visibility
- Focus order in forms and navigation
- Focus trapping in modals
- Focus restoration after interactions
- Dynamic content focus management

## Utilities

### `accessibility-testing.ts`
Core accessibility testing utilities:
- `testAccessibility()` - Run axe-core tests
- `testColorContrast()` - Test color contrast
- `testAriaAccessibility()` - Test ARIA implementation
- `testKeyboardAccessibility()` - Test keyboard navigation

### `keyboard-testing.ts`
Keyboard navigation testing utilities:
- `simulateTabNavigation()` - Simulate tab key navigation
- `getFocusableElements()` - Get all focusable elements
- `hasVisibleFocusIndicator()` - Check focus indicator visibility
- `testKeyboardActivation()` - Test Enter/Space activation

### `color-contrast-testing.ts`
Color contrast testing utilities:
- `calculateContrastRatio()` - Calculate WCAG contrast ratios
- `testColorContrast()` - Test color combinations
- `testThemeContrast()` - Test entire theme contrast
- `testElementContrast()` - Test DOM element contrast

## Manual Testing

### Screen Reader Testing
Use the comprehensive checklist in `screen-reader-checklist.md`:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

### Browser Testing
Test across multiple browsers:
- Chrome + NVDA
- Firefox + NVDA  
- Safari + VoiceOver
- Edge + NVDA

## WCAG 2.1 AA Compliance

The testing suite validates compliance with:

### Perceivable
- **1.1.1** Non-text Content - Alt text for images
- **1.3.1** Info and Relationships - Semantic markup
- **1.3.2** Meaningful Sequence - Logical reading order
- **1.4.1** Use of Color - Not color-only information
- **1.4.3** Contrast (Minimum) - 4.5:1 contrast ratio
- **1.4.4** Resize text - 200% zoom support

### Operable
- **2.1.1** Keyboard - Full keyboard accessibility
- **2.1.2** No Keyboard Trap - Focus management
- **2.4.1** Bypass Blocks - Skip links
- **2.4.2** Page Titled - Descriptive page titles
- **2.4.3** Focus Order - Logical tab order
- **2.4.6** Headings and Labels - Descriptive headings
- **2.4.7** Focus Visible - Visible focus indicators

### Understandable
- **3.1.1** Language of Page - Page language specified
- **3.2.1** On Focus - No context changes on focus
- **3.2.2** On Input - No context changes on input
- **3.3.1** Error Identification - Clear error messages
- **3.3.2** Labels or Instructions - Form labels

### Robust
- **4.1.1** Parsing - Valid HTML
- **4.1.2** Name, Role, Value - Proper ARIA usage

## Continuous Integration

### Pre-commit Hooks
Add accessibility tests to pre-commit hooks:
```bash
# In .husky/pre-commit or similar
npm run test:accessibility
```

### CI/CD Pipeline
Include accessibility tests in CI pipeline:
```yaml
# Example GitHub Actions
- name: Run Accessibility Tests
  run: npm run test:accessibility
```

## Common Issues and Solutions

### Focus Management
- **Issue**: Focus lost after dynamic content changes
- **Solution**: Manually manage focus with `element.focus()`

### Color Contrast
- **Issue**: Insufficient contrast in custom colors
- **Solution**: Use contrast testing utilities to validate colors

### Keyboard Navigation
- **Issue**: Elements not keyboard accessible
- **Solution**: Ensure proper tabindex and keyboard event handlers

### Screen Reader Compatibility
- **Issue**: Content not announced properly
- **Solution**: Use semantic HTML and appropriate ARIA attributes

## Resources

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluator
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Accessibility audit
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) - Free Windows screen reader
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) - Commercial Windows screen reader
- [VoiceOver](https://support.apple.com/guide/voiceover/) - Built-in macOS/iOS screen reader

## Contributing

When adding new components or features:

1. **Write accessibility tests** for new components
2. **Test with keyboard navigation** - ensure full keyboard support
3. **Validate color contrast** - test in both light and dark themes
4. **Test with screen readers** - use the manual testing checklist
5. **Update documentation** - add any new testing requirements

### Test Coverage Goals
- **100%** of interactive components have keyboard tests
- **100%** of color combinations meet WCAG AA standards
- **100%** of components pass axe-core validation
- **90%+** coverage of manual screen reader testing checklist