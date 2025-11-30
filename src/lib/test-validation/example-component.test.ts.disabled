/**
 * Example Component Test
 * 
 * This file demonstrates the working Svelte 5 + Vitest configuration
 * and serves as a reference for writing new tests.
 */

/// <reference types="vitest/globals" />

import { fireEvent } from '@testing-library/svelte';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Example Test Patterns', () => {
	// Basic test to verify Vitest globals work
	it('demonstrates Vitest globals are working', () => {
		expect(true).toBe(true);
		
		const mockFn = vi.fn();
		mockFn('test');
		expect(mockFn).toHaveBeenCalledWith('test');
	});

	// Accessibility testing example
	it('demonstrates accessibility testing with jest-axe', async () => {
		// Create a simple accessible element
		const div = document.createElement('div');
		div.innerHTML = '<button aria-label="Test button">Click me</button>';
		
		const results = await axe(div);
		expect(results).toHaveNoViolations();
	});

	// DOM manipulation example
	it('demonstrates DOM testing capabilities', () => {
		const div = document.createElement('div');
		div.innerHTML = '<h1>Test Title</h1><p>Test content</p>';
		
		expect(div.querySelector('h1')).toHaveTextContent('Test Title');
		expect(div.querySelector('p')).toHaveTextContent('Test content');
	});

	// Event handling example
	it('demonstrates event handling', async () => {
		const button = document.createElement('button');
		button.textContent = 'Click me';
		
		const handleClick = vi.fn();
		button.addEventListener('click', handleClick);
		
		await fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	// Async testing example
	it('demonstrates async testing patterns', async () => {
		const asyncFunction = async () => {
			return new Promise(resolve => {
				setTimeout(() => resolve('async result'), 10);
			});
		};
		
		const result = await asyncFunction();
		expect(result).toBe('async result');
	});

	// Mock testing example
	it('demonstrates mocking capabilities', () => {
		// Mock localStorage (already mocked in test-setup.ts)
		localStorage.setItem('test-key', 'test-value');
		expect(localStorage.getItem('test-key')).toBe('test-value');
		
		// Mock matchMedia (already mocked in test-setup.ts)
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		expect(mediaQuery).toBeDefined();
		expect(typeof mediaQuery.matches).toBe('boolean');
	});

	// Canvas API testing example
	it('demonstrates canvas API mocking', () => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		
		expect(ctx).toBeDefined();
		expect(typeof ctx?.fillRect).toBe('function');
		
		// Test canvas toDataURL (mocked in test-setup.ts)
		const dataUrl = canvas.toDataURL();
		expect(dataUrl).toMatch(/^data:image\/png;base64,/);
	});

	// Performance testing example
	it('demonstrates performance testing', () => {
		const startTime = performance.now();
		
		// Simulate some work
		for (let i = 0; i < 10000; i++) {
			Math.random();
		}
		
		const endTime = performance.now();
		const duration = endTime - startTime;
		
		expect(duration).toBeGreaterThanOrEqual(0);
		expect(duration).toBeLessThan(1000); // Should complete within 1 second
	});

	// Browser API testing example
	it('demonstrates browser API mocking', () => {
		// Test IntersectionObserver (mocked in test-setup.ts)
		const callback = vi.fn();
		const observer = new IntersectionObserver(callback);
		
		expect(observer).toBeDefined();
		expect(typeof observer.observe).toBe('function');
		
		// Test ResizeObserver (mocked in test-setup.ts)
		const resizeCallback = vi.fn();
		const resizeObserver = new ResizeObserver(resizeCallback);
		
		expect(resizeObserver).toBeDefined();
		expect(typeof resizeObserver.observe).toBe('function');
	});
});

// Example utility function tests
describe('Example Utility Functions', () => {
	it('tests utility functions', () => {
		// Example utility function
		const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
		
		expect(formatCurrency(123.456)).toBe('$123.46');
		expect(formatCurrency(0)).toBe('$0.00');
		expect(formatCurrency(-50)).toBe('$-50.00');
	});

	it('tests validation functions', () => {
		// Example validation function
		const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		
		expect(isValidEmail('test@example.com')).toBe(true);
		expect(isValidEmail('invalid-email')).toBe(false);
		expect(isValidEmail('')).toBe(false);
	});
});

/**
 * This test file demonstrates:
 * 
 * ✅ Vitest globals working (describe, it, expect, vi)
 * ✅ jest-axe accessibility testing
 * ✅ DOM manipulation and testing
 * ✅ Event handling with fireEvent
 * ✅ Async testing patterns
 * ✅ Mocking capabilities (localStorage, matchMedia)
 * ✅ Canvas API mocking
 * ✅ Performance testing
 * ✅ Browser API mocking (IntersectionObserver, ResizeObserver)
 * ✅ Utility function testing
 * 
 * All the key features of the Svelte 5 + Vitest setup are working correctly.
 */