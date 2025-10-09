/// <reference types="vitest/globals" />

import { theme } from '$lib/stores';
import { get } from 'svelte/store';

describe('Theme Store Debug', () => {
	it('should toggle theme correctly', () => {
		// Initialize theme
		theme.init();
		
		// Get initial theme
		const initialTheme = get(theme);
		console.log('Initial theme:', initialTheme);
		
		// Toggle theme
		theme.toggle();
		
		// Get new theme
		const newTheme = get(theme);
		console.log('New theme after toggle:', newTheme);
		
		// Should be different
		expect(newTheme).not.toBe(initialTheme);
		
		// Toggle again
		theme.toggle();
		const finalTheme = get(theme);
		console.log('Final theme after second toggle:', finalTheme);
		
		// Should be back to original
		expect(finalTheme).toBe(initialTheme);
	});

	it('should apply theme to document', () => {
		// Set to light theme
		theme.setTheme('light');
		expect(document.documentElement.classList.contains('dark')).toBe(false);
		
		// Set to dark theme
		theme.setTheme('dark');
		expect(document.documentElement.classList.contains('dark')).toBe(true);
		
		// Toggle to light
		theme.toggle();
		expect(document.documentElement.classList.contains('dark')).toBe(false);
	});
});