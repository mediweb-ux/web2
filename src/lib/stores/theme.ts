import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

// Create the theme store
function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		
		// Initialize theme from localStorage or system preference
		init: () => {
			if (!browser) return;
			
			const stored = globalThis.localStorage?.getItem('theme') as Theme | null;
			const systemPrefersDark = globalThis.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
			
			const initialTheme = stored || (systemPrefersDark ? 'dark' : 'light');
			
			set(initialTheme);
			applyTheme(initialTheme);
			
			// Listen for system theme changes
			const mediaQuery = globalThis.matchMedia?.('(prefers-color-scheme: dark)');
			const handleSystemThemeChange = (e: MediaQueryListEvent) => {
				// Only update if user hasn't set a preference
				if (!globalThis.localStorage?.getItem('theme')) {
					const newTheme = e.matches ? 'dark' : 'light';
					set(newTheme);
					applyTheme(newTheme);
				}
			};
			
			mediaQuery?.addEventListener('change', handleSystemThemeChange);
			
			// Return cleanup function
			return () => {
				mediaQuery?.removeEventListener('change', handleSystemThemeChange);
			};
		},
		
		// Toggle between light and dark themes
		toggle: () => {
			update(currentTheme => {
				const newTheme = currentTheme === 'light' ? 'dark' : 'light';
				
				if (browser) {
					globalThis.localStorage?.setItem('theme', newTheme);
					applyTheme(newTheme);
				}
				
				return newTheme;
			});
		},
		
		// Set specific theme
		setTheme: (theme: Theme) => {
			set(theme);
			
			if (browser) {
				globalThis.localStorage?.setItem('theme', theme);
				applyTheme(theme);
			}
		},
		
		// Clear stored preference (use system preference)
		clearPreference: () => {
			if (!browser) return;
		
			globalThis.localStorage?.removeItem('theme');
			const systemPrefersDark = globalThis.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false;
			const systemTheme = systemPrefersDark ? 'dark' : 'light';
		
			set(systemTheme);
			applyTheme(systemTheme);
		}
	};
}

// Apply theme to document
function applyTheme(theme: Theme) {
	if (!browser) return;
	
	const root = document.documentElement;
	
	if (theme === 'dark') {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}
	
	// Update theme-color meta tag for mobile browsers
	updateThemeColorMeta(theme);
}

// Update theme-color meta tags for mobile browsers
function updateThemeColorMeta(theme: Theme) {
	const lightMeta = document.querySelector('meta[name="theme-color"][media*="light"]');
	const darkMeta = document.querySelector('meta[name="theme-color"][media*="dark"]');
	
	if (lightMeta && darkMeta) {
		if (theme === 'dark') {
			lightMeta.setAttribute('content', '#1f2937'); // gray-800
			darkMeta.setAttribute('content', '#1f2937'); // gray-800
		} else {
			lightMeta.setAttribute('content', '#3b82f6'); // blue-500
			darkMeta.setAttribute('content', '#60a5fa'); // blue-400
		}
	}
}

// Export the theme store instance
export const theme = createThemeStore();

// Utility function to get current theme value (for SSR compatibility)
export function getCurrentTheme(): Theme {
	if (!browser) return 'light';
	
	const stored = localStorage.getItem('theme') as Theme | null;
	if (stored) return stored;
	
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Utility function to check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}