# Screen Reader Compatibility Testing Checklist

This checklist provides a comprehensive guide for manually testing screen reader compatibility across the agency website. Test with multiple screen readers when possible (NVDA, JAWS, VoiceOver, TalkBack).

## Pre-Testing Setup

### Screen Reader Software
- [ ] **NVDA** (Windows) - Free, widely used
- [ ] **JAWS** (Windows) - Most popular commercial screen reader
- [ ] **VoiceOver** (macOS/iOS) - Built-in Apple screen reader
- [ ] **TalkBack** (Android) - Built-in Android screen reader
- [ ] **Orca** (Linux) - Built-in Linux screen reader

### Browser Compatibility
- [ ] Test with Chrome + NVDA
- [ ] Test with Firefox + NVDA
- [ ] Test with Safari + VoiceOver
- [ ] Test with Edge + NVDA

## General Navigation Testing

### Page Structure
- [ ] **Page title** is announced when page loads
- [ ] **Headings** create logical hierarchy (H1 → H2 → H3, etc.)
- [ ] **Landmarks** are properly announced (main, nav, header, footer, aside)
- [ ] **Skip links** are available and functional
- [ ] **Page language** is correctly identified

### Navigation
- [ ] **Main navigation** is announced as navigation landmark
- [ ] **Menu items** are clearly announced with their purpose
- [ ] **Current page** is indicated in navigation
- [ ] **Breadcrumbs** (if present) are announced logically
- [ ] **Mobile menu** toggle is properly labeled and announced

## Content Testing

### Text Content
- [ ] **All text** is announced clearly
- [ ] **Headings** provide meaningful page structure
- [ ] **Paragraphs** are announced as separate blocks
- [ ] **Lists** are announced with item count and position
- [ ] **Emphasis** (bold, italic) is conveyed appropriately

### Links
- [ ] **Link purpose** is clear from link text alone
- [ ] **External links** are identified as opening in new window/tab
- [ ] **Download links** indicate file type and size
- [ ] **Email/phone links** are properly identified
- [ ] **Link states** (visited, current) are announced

### Images
- [ ] **Decorative images** are ignored (empty alt or role="presentation")
- [ ] **Informative images** have descriptive alt text
- [ ] **Complex images** have detailed descriptions
- [ ] **Image links** combine image alt text with link purpose
- [ ] **Background images** with content have text alternatives

## Interactive Elements Testing

### Buttons
- [ ] **Button purpose** is clear from label
- [ ] **Button states** (pressed, expanded) are announced
- [ ] **Toggle buttons** announce current state
- [ ] **Icon buttons** have accessible names
- [ ] **Disabled buttons** are announced as unavailable

### Forms
- [ ] **Form fields** have clear, associated labels
- [ ] **Required fields** are identified
- [ ] **Field instructions** are associated with inputs
- [ ] **Error messages** are announced immediately
- [ ] **Success messages** are announced
- [ ] **Fieldsets** group related fields with legends
- [ ] **Form validation** provides clear feedback

### Form Controls
- [ ] **Text inputs** announce label and current value
- [ ] **Checkboxes** announce label and checked state
- [ ] **Radio buttons** announce group name and selection
- [ ] **Select dropdowns** announce options and selection
- [ ] **Textareas** announce label and content

## Component-Specific Testing

### Navigation Component
- [ ] **Hamburger menu** button is properly labeled
- [ ] **Menu expansion** state is announced
- [ ] **Menu items** are navigable with arrow keys
- [ ] **Menu closure** (Escape key) is announced
- [ ] **Focus management** works correctly

### Service Cards
- [ ] **Card structure** is logical (heading, description, link)
- [ ] **Card links** have descriptive text
- [ ] **Card images** have appropriate alt text
- [ ] **Card actions** are clearly identified

### Contact Form
- [ ] **Form purpose** is clear from heading/description
- [ ] **All fields** have associated labels
- [ ] **Required fields** are clearly marked
- [ ] **Validation errors** are announced immediately
- [ ] **Success confirmation** is announced
- [ ] **Form submission** process is clear

### Theme Toggle
- [ ] **Current theme** is announced
- [ ] **Theme change** is announced when toggled
- [ ] **Toggle button** has clear label
- [ ] **Theme persistence** doesn't affect screen reader

## Advanced Features Testing

### Dynamic Content
- [ ] **Content updates** are announced via ARIA live regions
- [ ] **Loading states** are communicated
- [ ] **Error states** are announced
- [ ] **Success states** are announced
- [ ] **Progressive enhancement** works without JavaScript

### Modal Dialogs (if present)
- [ ] **Modal opening** is announced
- [ ] **Modal title** is announced
- [ ] **Focus trapping** works correctly
- [ ] **Modal closure** is announced
- [ ] **Focus restoration** works after closing

### Responsive Behavior
- [ ] **Mobile layout** maintains screen reader functionality
- [ ] **Touch interactions** work with screen reader gestures
- [ ] **Orientation changes** don't break navigation
- [ ] **Zoom levels** (up to 200%) maintain functionality

## Theme Testing

### Light Theme
- [ ] **All content** is accessible in light theme
- [ ] **Focus indicators** are visible and announced
- [ ] **Color information** is not the only way to convey meaning
- [ ] **Contrast ratios** meet WCAG standards

### Dark Theme
- [ ] **All content** is accessible in dark theme
- [ ] **Theme switch** doesn't disrupt screen reader
- [ ] **Focus indicators** remain visible
- [ ] **Color information** is not the only way to convey meaning

## Error Scenarios Testing

### Network Issues
- [ ] **Offline state** is communicated
- [ ] **Failed requests** provide clear error messages
- [ ] **Retry mechanisms** are accessible

### JavaScript Disabled
- [ ] **Core functionality** works without JavaScript
- [ ] **Form submission** works
- [ ] **Navigation** remains functional
- [ ] **Content** is still accessible

## Performance Testing

### Loading States
- [ ] **Page loading** is communicated
- [ ] **Content loading** provides feedback
- [ ] **Image loading** doesn't block text announcement
- [ ] **Lazy loading** doesn't interfere with navigation

## Browser-Specific Testing

### Chrome + NVDA
- [ ] All general tests pass
- [ ] Form interactions work correctly
- [ ] Dynamic content updates are announced

### Firefox + NVDA
- [ ] All general tests pass
- [ ] ARIA implementation works correctly
- [ ] Focus management is consistent

### Safari + VoiceOver
- [ ] All general tests pass
- [ ] iOS-specific gestures work
- [ ] Mobile navigation is accessible

## Common Issues to Check

### Content Issues
- [ ] **Empty headings** or links
- [ ] **Redundant text** (e.g., "link" announced twice)
- [ ] **Missing context** for screen reader users
- [ ] **Unclear instructions** or labels

### Technical Issues
- [ ] **ARIA attributes** used correctly
- [ ] **Focus management** works in all scenarios
- [ ] **Live regions** announce changes appropriately
- [ ] **Semantic HTML** is used correctly

### Navigation Issues
- [ ] **Tab order** is logical
- [ ] **Focus trapping** works in modals
- [ ] **Skip links** function correctly
- [ ] **Keyboard shortcuts** don't conflict

## Testing Documentation

### For Each Test Session
- [ ] **Screen reader** and version used
- [ ] **Browser** and version used
- [ ] **Operating system** and version
- [ ] **Date** of testing
- [ ] **Issues found** with severity level
- [ ] **Recommendations** for fixes

### Issue Severity Levels
- **Critical**: Prevents access to core functionality
- **High**: Significantly impacts user experience
- **Medium**: Causes confusion or inefficiency
- **Low**: Minor annoyance or inconsistency

### Test Results Template
```
## Test Session: [Date]
**Screen Reader**: [Name and Version]
**Browser**: [Name and Version]
**OS**: [Operating System]

### Issues Found:
1. **[Severity]** - [Description]
   - Location: [Page/Component]
   - Expected: [What should happen]
   - Actual: [What actually happens]
   - Recommendation: [How to fix]

### Passed Tests:
- [List of successfully passed test items]

### Notes:
[Any additional observations or context]
```

## Automated Testing Integration

While this checklist focuses on manual testing, complement it with:
- [ ] **axe-core** automated tests
- [ ] **Lighthouse** accessibility audits
- [ ] **WAVE** browser extension checks
- [ ] **Color contrast** analyzers

## Regular Testing Schedule

- [ ] **Before each release** - Full checklist
- [ ] **Weekly** - Core functionality spot checks
- [ ] **After major updates** - Component-specific testing
- [ ] **Quarterly** - Complete cross-browser testing

## Resources

### Screen Reader Commands Reference
- **NVDA**: [NVDA User Guide](https://www.nvaccess.org/documentation/)
- **JAWS**: [JAWS Keystrokes](https://support.freedomscientific.com/Teachers/Surfs-Up/JAWS_Keystrokes)
- **VoiceOver**: [VoiceOver Commands](https://support.apple.com/guide/voiceover/welcome/mac)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyzers](https://www.tpgi.com/color-contrast-checker/)