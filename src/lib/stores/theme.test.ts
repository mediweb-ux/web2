import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { get } from 'svelte/store';
import { theme, getCurrentTheme, prefersReducedMotion } from './theme';

// Mock browser environment
const mockLocalStorage = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};

const mockMatchMedia = vi.fn();

// Mock DOM methods
const mockClassList = {
	add: vi.fn(),
	remove: vi.fn(),
	toggle: vi.fn(),
	contains: vi.fn(),
};

const mockDocument = {
	documentElement: {
		classList: mockClassList,
	},
	querySelector: vi.fn(),
};

// Setup global mocks
Object.defineProperty(global, 'localStorage', {
	value: mockLocalStorage,
	writable: true,
});

Object.defineProperty(global, 'matchMedia', {
	value: mockMatchMedia,
	writable: true,
});

Object.defineProperty(global, 'document', {
	value: mockDocument,
	writable: true,
});

// Mock browser environment detection
vi.mock('$app/environment', () => ({
	browser: true,
}));

describe('Theme Store', () => {
	beforeEach(() => {
		// Reset all mocks
		vi.clearAllMocks();
		
		// Setup default matchMedia mock
		mockMatchMedia.mockImplementation((query: string) => ({
			matches: query.includes('dark') ? false : true,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}));
		
		// Setup default localStorage mock
		mockLocalStorage.getItem.mockReturnValue(null);
		
		// Setup default document mock
		mockDocument.querySelector.mockReturnValue({
			setAttribute: vi.fn(),
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('Initialization', () => {
		it('should initialize with light theme when no stored preference and system prefers light', () => {
			mockMatchMedia.mockImplementation((query: string) => ({
				matches: query.includes('dark') ? false : true,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			}));

			theme.init();
			
			expect(get(theme)).toBe('light');
			expect(mockClassList.remove).toHaveBeenCalledWith('dark');
		});

		it('should initialize with dark theme when no stored preference and system prefers dark', () => {
			mockMatchMedia.mockImplementation((query: string) => ({
				matches: query.includes('dark') ? true : false,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			}));

			theme.init();
			
			expect(get(theme)).toBe('dark');
			expect(mockClassList.add).toHaveBeenCalledWith('dark');
		});

		it('should initialize with stored preference over system preference', () => {
			mockLocalStorage.getItem.mockReturnValue('dark');
			mockMatchMedia.mockImplementation((query: string) => ({
				matches: false, // System prefers light
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			}));

			theme.init();
			
			expect(get(theme)).toBe('dark');
			expect(mockClassList.add).toHaveBeenCalledWith('dark');
		});

		it('should set up system theme change listener', () => {
			const mockMediaQuery = {
				matches: false,
				media: '(prefers-color-scheme: dark)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			};

			mockMatchMedia.mockReturnValue(mockMediaQuery);

			theme.init();

			expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
		});
	});

	describe('Theme Toggle', () => {
		it('should toggle from light to dark', () => {
			// Initialize with light theme
			theme.setTheme('light');
			
			theme.toggle();
			
			expect(get(theme)).toBe('dark');
			expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
			expect(mockClassList.add).toHaveBeenCalledWith('dark');
		});

		it('should toggle from dark to light', () => {
			// Initialize with dark theme
			theme.setTheme('dark');
			
			theme.toggle();
			
			expect(get(theme)).toBe('light');
			expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light');
			expect(mockClassList.remove).toHaveBeenCalledWith('dark');
		});
	});

	describe('Set Theme', () => {
		it('should set theme to light', () => {
			theme.setTheme('light');
			
			expect(get(theme)).toBe('light');
			expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'light');
			expect(mockClassList.remove).toHaveBeenCalledWith('dark');
		});

		it('should set theme to dark', () => {
			theme.setTheme('dark');
			
			expect(get(theme)).toBe('dark');
			expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
			expect(mockClassList.add).toHaveBeenCalledWith('dark');
		});
	});

	describe('Clear Preference', () => {
		it('should clear stored preference and use system preference (light)', () => {
			mockMatchMedia.mockImplementation((query: string) => ({
				matches: query.includes('dark') ? false : true,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			}));

			theme.clearPreference();
			
			expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('theme');
			expect(get(theme)).toBe('light');
			expect(mockClassList.remove).toHaveBeenCalledWith('dark');
		});

		it('should clear stored preference and use system preference (dark)', () => {
			mockMatchMedia.mockImplementation((query: string) => ({
				matches: query.includes('dark') ? true : false,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			}));

			theme.clearPreference();
			
			expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('theme');
			expect(get(theme)).toBe('dark');
			expect(mockClassList.add).toHaveBeenCalledWith('dark');
		});
	});

	describe('System Theme Change Handling', () => {
		it('should respond to system theme changes when no stored preference', () => {
			const mockMediaQuery = {
				matches: false,
				media: '(prefers-color-scheme: dark)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			};

			mockMatchMedia.mockReturnValue(mockMediaQuery);
			mockLocalStorage.getItem.mockReturnValue(null); // No stored preference

			theme.init();

			// Get the event handler that was registered
			const changeHandler = mockMediaQuery.addEventListener.mock.calls[0]?.[1];
			if (!changeHandler) {
				throw new Error('Event handler not registered');
			}

			// Simulate system changing to dark mode
			changeHandler({ matches: true });

			expect(get(theme)).toBe('dark');
			expect(mockClassList.add).toHaveBeenCalledWith('dark');
		});

		it('should not respond to system theme changes when user has stored preference', () => {
			const mockMediaQuery = {
				matches: false,
				media: '(prefers-color-scheme: dark)',
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			};

			mockMatchMedia.mockReturnValue(mockMediaQuery);
			mockLocalStorage.getItem.mockReturnValue('light'); // User has stored preference

			theme.init();

			// Get the event handler that was registered
			const changeHandler = mockMediaQuery.addEventListener.mock.calls[0]?.[1];
			if (!changeHandler) {
				throw new Error('Event handler not registered');
			}

			// Simulate system changing to dark mode
			changeHandler({ matches: true });

			// Theme should remain light because user has explicit preference
			expect(get(theme)).toBe('light');
		});
	});

	describe('Theme Color Meta Tag Updates', () => {
		it('should update theme-color meta tags when theme changes', () => {
			const lightMeta = { setAttribute: vi.fn() };
			const darkMeta = { setAttribute: vi.fn() };

			mockDocument.querySelector
				.mockReturnValueOnce(lightMeta) // First call for light meta
				.mockReturnValueOnce(darkMeta); // Second call for dark meta

			theme.setTheme('dark');

			expect(lightMeta.setAttribute).toHaveBeenCalledWith('content', '#1f2937');
			expect(darkMeta.setAttribute).toHaveBeenCalledWith('content', '#1f2937');
		});
	});
});

describe('Utility Functions', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('getCurrentTheme', () => {
		it('should return stored theme when available', () => {
			mockLocalStorage.getItem.mockReturnValue('dark');
			
			const currentTheme = getCurrentTheme();
			
			expect(currentTheme).toBe('dark');
		});

		it('should return system preference when no stored theme', () => {
			mockLocalStorage.getItem.mockReturnValue(null);
			mockMatchMedia.mockImplementation((query: string) => ({
				matches: query.includes('dark') ? true : false,
			}));
			
			const currentTheme = getCurrentTheme();
			
			expect(currentTheme).toBe('dark');
		});

		it('should return light as fallback', () => {
			mockLocalStorage.getItem.mockReturnValue(null);
			mockMatchMedia.mockImplementation((_query: string) => ({
				matches: false,
			}));
			
			const currentTheme = getCurrentTheme();
			
			expect(currentTheme).toBe('light');
		});
	});

	describe('prefersReducedMotion', () => {
		it('should return true when user prefers reduced motion', () => {
			mockMatchMedia.mockImplementation((query: string) => ({
				matches: query.includes('reduce') ? true : false,
			}));
			
			const reducedMotion = prefersReducedMotion();
			
			expect(reducedMotion).toBe(true);
		});

		it('should return false when user does not prefer reduced motion', () => {
			mockMatchMedia.mockImplementation((_query: string) => ({
				matches: false,
			}));
			
			const reducedMotion = prefersReducedMotion();
			
			expect(reducedMotion).toBe(false);
		});
	});
});