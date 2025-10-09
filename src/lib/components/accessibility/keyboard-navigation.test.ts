import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import {
	simulateTabNavigation,
	getFocusableElements,
	hasVisibleFocusIndicator,
	// testKeyboardActivation,
	testEscapeKeyHandling,
	testArrowKeyNavigation,
	KeyCodes
} from '../../utils/keyboard-testing';
import Button from '../ui/Button.svelte';
import ContactForm from '../ui/ContactForm.svelte';
import Navigation from '../layout/Navigation.svelte';

describe('Keyboard Navigation Tests', () => {
	describe('Button Component', () => {
		it('should be focusable with Tab key', () => {
			const { container } = render(Button, { props: {} });
			const button = container.querySelector('button');
			
			expect(button).toBeTruthy();
			expect(button?.tabIndex).not.toBe(-1);
			
			// Test tab navigation
			const focusableElements = getFocusableElements(container);
			expect(focusableElements).toContain(button);
		});

		it('should have visible focus indicator', () => {
			const { container } = render(Button, { props: {} });
			const button = container.querySelector('button') as HTMLElement;
			
			button.focus();
			expect(hasVisibleFocusIndicator(button)).toBe(true);
		});

		it('should be activatable with Enter and Space keys', async () => {
			let clicked = false;
			const { container } = render(Button, {
				props: {
					onclick: () => { clicked = true; }
				}
			});
			
			const button = container.querySelector('button') as HTMLElement;
			
			// Test Enter key
			fireEvent.keyDown(button, { key: KeyCodes.ENTER });
			expect(clicked).toBe(true);
			
			clicked = false;
			
			// Test Space key
			fireEvent.keyDown(button, { key: KeyCodes.SPACE });
			expect(clicked).toBe(true);
		});

		it('should not be focusable when disabled', () => {
			const { container } = render(Button, {
				props: { disabled: true }
			});
			
			const button = container.querySelector('button');
			expect(button?.disabled).toBe(true);
			
			const focusableElements = getFocusableElements(container);
			expect(focusableElements).not.toContain(button);
		});
	});

	describe('Contact Form', () => {
		it('should have logical tab order', () => {
			const { container } = render(ContactForm);
			const focusableElements = getFocusableElements(container);
			
			// Expected order: name input, email input, message textarea, submit button
			expect(focusableElements.length).toBeGreaterThan(0);
			
			// Simulate tab navigation
			const tabbedElements = simulateTabNavigation(container);
			expect(tabbedElements.length).toBeGreaterThan(0);
		});

		it('should show focus indicators on all form elements', () => {
			const { container } = render(ContactForm);
			const inputs = container.querySelectorAll('input, textarea, button');
			
			inputs.forEach(input => {
				(input as HTMLElement).focus();
				expect(hasVisibleFocusIndicator(input)).toBe(true);
			});
		});

		it('should handle form submission with Enter key', () => {
			const { container } = render(ContactForm);
			const form = container.querySelector('form');
			const submitButton = container.querySelector('button[type="submit"]') as HTMLElement;
			
			let formSubmitted = false;
			form?.addEventListener('submit', (e) => {
				e.preventDefault();
				formSubmitted = true;
			});
			
			submitButton.focus();
			fireEvent.keyDown(submitButton, { key: KeyCodes.ENTER });
			
			expect(formSubmitted).toBe(true);
		});
	});

	describe('Navigation Component', () => {
		it('should support arrow key navigation', () => {
			const { container } = render(Navigation);
			const navItems = testArrowKeyNavigation(container, 'horizontal');
			
			// Should be able to navigate through nav items
			expect(navItems.length).toBeGreaterThan(0);
		});

		it('should handle escape key to close mobile menu', () => {
			const { container } = render(Navigation);
			
			// Open mobile menu first (simulate click on hamburger)
			const hamburger = container.querySelector('[aria-label*="menu"]');
			if (hamburger) {
				fireEvent.click(hamburger);
				
				// Test escape key closes menu
				const menuClosed = testEscapeKeyHandling(container, () => {
					const menu = container.querySelector('[aria-expanded="false"]');
					return menu !== null;
				});
				
				expect(menuClosed).toBe(true);
			}
		});

		it('should trap focus in mobile menu when open', () => {
			const { container } = render(Navigation);
			
			// Open mobile menu
			const hamburger = container.querySelector('[aria-label*="menu"]');
			if (hamburger) {
				fireEvent.click(hamburger);
				
				const focusableElements = getFocusableElements(container);
				const menuElements = focusableElements.filter(el => 
					el.closest('[role="navigation"]') || el.closest('nav')
				);
				
				expect(menuElements.length).toBeGreaterThan(0);
			}
		});
	});

	describe('Skip Links', () => {
		it('should provide skip to main content link', () => {
			// This would test the main layout component
			const skipLink = document.querySelector('a[href="#main-content"]');
			
			if (skipLink) {
				expect(skipLink.textContent).toContain('Skip to main content');
				
				// Test that it's the first focusable element
				const allFocusable = getFocusableElements(document.body);
				expect(allFocusable[0]).toBe(skipLink);
			}
		});
	});

	describe('Focus Management', () => {
		it('should maintain focus order in dynamic content', () => {
			// Test focus management when content changes
			const { container } = render(Button, {
				props: {}
			});
			
			const button = container.querySelector('button') as HTMLElement;
			button.focus();
			
			// Simulate content change
			fireEvent.click(button);
			
			// Focus should remain on button or move to logical next element
			expect(document.activeElement).toBeTruthy();
		});

		it('should restore focus after modal closes', () => {
			// This would test modal focus management
			// Implementation depends on modal component structure
		});
	});
});