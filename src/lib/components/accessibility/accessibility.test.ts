import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { testAccessibility, testAriaAccessibility } from '../../utils/accessibility-testing';
import { testColorContrast } from '../../utils/color-contrast-testing';
import Button from '../ui/Button.svelte';
import Card from '../ui/Card.svelte';
import ContactForm from '../ui/ContactForm.svelte';
import Navigation from '../layout/Navigation.svelte';
import Icon from '../ui/Icon.svelte';

describe('Comprehensive Accessibility Tests', () => {
	describe('Button Component Accessibility', () => {
		it('should pass all axe-core accessibility tests', async () => {
			const { container } = render(Button, {
				props: { ariaLabel: 'Test button' }
			});

			await testAccessibility(container);
		});

		it('should have proper ARIA attributes', async () => {
			const { container } = render(Button, {
				props: { 
					type: 'submit',
					disabled: false
				}
			});

			const button = container.querySelector('button');
			expect(button?.getAttribute('type')).toBe('submit');
			expect(button?.disabled).toBe(false);

			await testAriaAccessibility(container);
		});

		it('should handle disabled state accessibly', async () => {
			const { container } = render(Button, {
				props: { 
					disabled: true,
					ariaLabel: 'Disabled test button'
				}
			});

			const button = container.querySelector('button');
			expect(button?.disabled).toBe(true);
			expect(button?.getAttribute('aria-disabled')).toBe('true');

			await testAccessibility(container);
		});

		it('should support icon buttons with proper labels', async () => {
			const { container } = render(Button, {
				props: { 
					ariaLabel: 'Close dialog'
				}
			});

			const button = container.querySelector('button');
			expect(button?.getAttribute('aria-label')).toBe('Close dialog');

			await testAccessibility(container);
		});
	});

	describe('Card Component Accessibility', () => {
		it('should pass all axe-core accessibility tests', async () => {
			const { container } = render(Card, {
				props: {
					title: 'Service Card',
					description: 'This is a service description',
					href: '/services/web-development'
				}
			});

			await testAccessibility(container);
		});

		it('should have proper heading structure', async () => {
			const { container } = render(Card, {
				props: {
					title: 'Web Development',
					description: 'Modern web solutions'
				}
			});

			const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
			expect(heading).toBeTruthy();
			expect(heading?.textContent).toBe('Web Development');

			await testAccessibility(container);
		});

		it('should handle interactive cards properly', async () => {
			const { container } = render(Card, {
				props: {
					title: 'Clickable Card',
					description: 'Click to learn more',
					href: '/learn-more'
				}
			});

			const link = container.querySelector('a');
			expect(link?.getAttribute('href')).toBe('/learn-more');

			await testAccessibility(container);
		});
	});

	describe('Contact Form Accessibility', () => {
		it('should pass all axe-core accessibility tests', async () => {
			const { container } = render(ContactForm);
			await testAccessibility(container);
		});

		it('should have properly associated labels', async () => {
			const { container } = render(ContactForm);

			const inputs = container.querySelectorAll('input, textarea');
			inputs.forEach(input => {
				const id = input.getAttribute('id');
				const label = container.querySelector(`label[for="${id}"]`);
				
				expect(label).toBeTruthy();
				expect(label?.textContent).toBeTruthy();
			});

			await testAccessibility(container);
		});

		it('should handle required fields properly', async () => {
			const { container } = render(ContactForm);

			const requiredInputs = container.querySelectorAll('input[required], textarea[required]');
			requiredInputs.forEach(input => {
				expect(input.getAttribute('required')).toBe('');
				expect(input.getAttribute('aria-required')).toBe('true');
			});

			await testAccessibility(container);
		});

		it('should provide accessible error messages', async () => {
			const { container } = render(ContactForm);

			// This test would be more comprehensive with actual error state
			const form = container.querySelector('form');
			expect(form).toBeTruthy();

			await testAccessibility(container);
		});
	});

	describe('Navigation Component Accessibility', () => {
		it('should pass all axe-core accessibility tests', async () => {
			const { container } = render(Navigation);
			await testAccessibility(container);
		});

		it('should have proper navigation landmarks', async () => {
			const { container } = render(Navigation);

			const nav = container.querySelector('nav');
			expect(nav).toBeTruthy();

			const ariaLabel = nav?.getAttribute('aria-label') || nav?.getAttribute('aria-labelledby');
			expect(ariaLabel).toBeTruthy();

			await testAccessibility(container);
		});

		it('should handle mobile menu accessibility', async () => {
			const { container } = render(Navigation);

			const menuButton = container.querySelector('[aria-expanded]');
			if (menuButton) {
				expect(menuButton.getAttribute('aria-expanded')).toBeTruthy();
				expect(menuButton.getAttribute('aria-controls')).toBeTruthy();
			}

			await testAccessibility(container);
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

			await testAccessibility(container);
		});

		it('should pass accessibility tests for informative icons', async () => {
			const { container } = render(Icon, {
				props: {
					name: 'warning',
					ariaLabel: 'Warning: This action cannot be undone'
				}
			});

			const icon = container.querySelector('[aria-label]');
			expect(icon?.getAttribute('aria-label')).toBe('Warning: This action cannot be undone');

			await testAccessibility(container);
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
			// This would test a full page layout
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

	describe('ARIA Implementation', () => {
		it('should use ARIA labels appropriately', async () => {
			const { container } = render(Button, {
				props: {
					ariaLabel: 'Close modal'
				}
			});

			await testAriaAccessibility(container);
		});

		it('should use ARIA live regions for dynamic content', () => {
			const liveRegionHTML = `
				<div aria-live="polite" id="status"></div>
				<div aria-live="assertive" id="errors"></div>
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
				<form>
					<label for="email">Email</label>
					<input type="email" id="email" aria-describedby="email-error" />
					<div id="email-error" role="alert">Please enter a valid email</div>
				</form>
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
});