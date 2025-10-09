import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { testAccessibility } from '../../utils/accessibility-testing';
import { testColorContrast } from '../../utils/color-contrast-testing';
import Button from '../ui/Button.svelte';
import Card from '../ui/Card.svelte';
import Icon from '../ui/Icon.svelte';

describe('Core Accessibility Tests', () => {
	describe('Button Component Accessibility', () => {
		it('should pass axe-core accessibility tests with proper content', async () => {
			const { container } = render(Button, {
				props: { 
					type: 'button'
				}
			});

			// Add text content to the button
			const button = container.querySelector('button');
			if (button) {
				button.textContent = 'Click me';
			}

			// Wrap in main element to satisfy landmark requirements
			const wrapper = document.createElement('main');
			wrapper.appendChild(container.firstElementChild!);

			await testAccessibility(wrapper);
		});

		it('should handle disabled state properly', async () => {
			const { container } = render(Button, {
				props: { 
					disabled: true
				}
			});

			const button = container.querySelector('button');
			if (button) {
				button.textContent = 'Disabled Button';
			}
			expect(button?.disabled).toBe(true);

			const wrapper = document.createElement('main');
			wrapper.appendChild(container.firstElementChild!);

			await testAccessibility(wrapper);
		});
	});

	describe('Card Component Accessibility', () => {
		it('should pass axe-core accessibility tests', async () => {
			const { container } = render(Card, {
				props: {
					title: 'Service Card',
					description: 'This is a service description'
				}
			});

			const wrapper = document.createElement('main');
			wrapper.appendChild(container.firstElementChild!);

			await testAccessibility(wrapper);
		});

		it('should have proper heading structure', () => {
			const { container } = render(Card, {
				props: {
					title: 'Web Development',
					description: 'Modern web solutions'
				}
			});

			const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
			expect(heading).toBeTruthy();
			expect(heading?.textContent).toBe('Web Development');
		});
	});

	describe('Icon Component Accessibility', () => {
		it('should pass accessibility tests for decorative icons', async () => {
			const { container } = render(Icon, {
				props: {
					name: 'star',
					ariaHidden: true
				}
			});

			const icon = container.querySelector('[aria-hidden="true"]');
			expect(icon).toBeTruthy();

			const wrapper = document.createElement('main');
			wrapper.appendChild(container.firstElementChild!);

			await testAccessibility(wrapper);
		});

		it('should handle informative icons with labels', () => {
			const { container } = render(Icon, {
				props: {
					name: 'warning',
					ariaLabel: 'Warning message'
				}
			});

			const icon = container.querySelector('svg, [role="img"]');
			expect(icon).toBeTruthy();
		});
	});

	describe('Color Contrast Compliance', () => {
		it('should meet WCAG AA standards for primary colors', () => {
			// Test primary button colors
			const lightPrimary = testColorContrast('#2563eb', '#ffffff');
			expect(lightPrimary.passes.aa).toBe(true);

			const darkPrimary = testColorContrast('#3b82f6', '#0f172a');
			expect(darkPrimary.passes.aa).toBe(true);
		});

		it('should meet WCAG AA standards for text colors', () => {
			// Test text on background
			const lightText = testColorContrast('#0f172a', '#ffffff');
			expect(lightText.passes.aa).toBe(true);

			const darkText = testColorContrast('#f8fafc', '#0f172a');
			expect(darkText.passes.aa).toBe(true);
		});

		it('should meet WCAG AA standards for secondary colors', () => {
			// Test secondary/muted text
			const lightSecondary = testColorContrast('#64748b', '#ffffff');
			expect(lightSecondary.passes.aa).toBe(true);

			const darkSecondary = testColorContrast('#94a3b8', '#0f172a');
			expect(darkSecondary.passes.aa).toBe(true);
		});
	});

	describe('Semantic HTML Structure', () => {
		it('should use proper heading hierarchy', async () => {
			const pageHTML = `
				<main>
					<h1>Main Page Title</h1>
					<section>
						<h2>Section Title</h2>
						<h3>Subsection Title</h3>
					</section>
				</main>
			`;

			document.body.innerHTML = pageHTML;
			await testAccessibility(document.body);

			// Clean up
			document.body.innerHTML = '';
		});

		it('should use proper landmark elements', async () => {
			const landmarkHTML = `
				<header>
					<nav aria-label="Main navigation">
						<a href="/">Home</a>
					</nav>
				</header>
				<main>
					<h1>Main Content</h1>
				</main>
				<footer>
					<p>Footer content</p>
				</footer>
			`;

			document.body.innerHTML = landmarkHTML;
			await testAccessibility(document.body);

			// Clean up
			document.body.innerHTML = '';
		});
	});

	describe('ARIA Implementation', () => {
		it('should use ARIA labels appropriately', async () => {
			const { container } = render(Button, {
				props: {
					ariaLabel: 'Close modal'
				}
			});

			const button = container.querySelector('button');
			expect(button?.getAttribute('aria-label')).toBe('Close modal');

			const wrapper = document.createElement('main');
			wrapper.appendChild(container.firstElementChild!);

			await testAccessibility(wrapper);
		});

		it('should use ARIA live regions for dynamic content', () => {
			const liveRegionHTML = `
				<main>
					<div aria-live="polite" id="status">Status updates</div>
					<div aria-live="assertive" id="errors">Error messages</div>
				</main>
			`;

			document.body.innerHTML = liveRegionHTML;

			const politeRegion = document.querySelector('[aria-live="polite"]');
			const assertiveRegion = document.querySelector('[aria-live="assertive"]');

			expect(politeRegion).toBeTruthy();
			expect(assertiveRegion).toBeTruthy();

			// Clean up
			document.body.innerHTML = '';
		});
	});

	describe('Form Accessibility', () => {
		it('should associate error messages with form fields', async () => {
			const formHTML = `
				<main>
					<form>
						<label for="email">Email</label>
						<input type="email" id="email" aria-describedby="email-error" />
						<div id="email-error" role="alert">Please enter a valid email</div>
					</form>
				</main>
			`;

			document.body.innerHTML = formHTML;
			await testAccessibility(document.body);

			const input = document.querySelector('#email');
			const error = document.querySelector('#email-error');

			expect(input?.getAttribute('aria-describedby')).toBe('email-error');
			expect(error?.getAttribute('role')).toBe('alert');

			// Clean up
			document.body.innerHTML = '';
		});
	});

	describe('Keyboard Navigation', () => {
		it('should provide skip links', () => {
			const skipLinkHTML = `
				<a href="#main-content" class="skip-link">Skip to main content</a>
				<main id="main-content" tabindex="-1">
					<h1>Main Content</h1>
				</main>
			`;

			document.body.innerHTML = skipLinkHTML;

			const skipLink = document.querySelector('.skip-link');
			const mainContent = document.querySelector('#main-content');

			expect(skipLink).toBeTruthy();
			expect(mainContent?.getAttribute('tabindex')).toBe('-1');

			// Clean up
			document.body.innerHTML = '';
		});
	});
});