/// <reference types="vitest/globals" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import '@testing-library/jest-dom';

// Use global vi from vitest globals
declare const vi: {
	fn: (implementation?: (...args: any[]) => any) => any;
	mock: (path: string, factory?: () => any) => void;
	clearAllMocks: () => void;
	resetAllMocks: () => void;
	restoreAllMocks: () => void;
};

// CRITICAL: Set up browser environment detection for Svelte 5 BEFORE any imports
// Svelte 5 checks for these globals to determine if it's running in a browser

// Ensure browser environment is properly detected by Svelte 5
Object.defineProperty(globalThis, 'navigator', {
	value: {
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
		language: 'en-US',
		languages: ['en-US', 'en'],
		onLine: true,
		cookieEnabled: true,
		platform: 'Win32',
		vendor: 'Google Inc.'
	},
	writable: true,
	configurable: true
});

// Set up critical browser globals that Svelte 5 checks for
Object.defineProperty(globalThis, 'location', {
	value: {
		href: 'http://localhost:3000',
		origin: 'http://localhost:3000',
		protocol: 'http:',
		host: 'localhost:3000',
		hostname: 'localhost',
		port: '3000',
		pathname: '/',
		search: '',
		hash: '',
		assign: vi.fn(),
		replace: vi.fn(),
		reload: vi.fn(),
		toString: () => 'http://localhost:3000'
	},
	writable: true,
	configurable: true
});

// Ensure window and document are properly set up for Svelte 5
if (typeof globalThis !== 'undefined') {
	if (!globalThis.window) {
		globalThis.window = globalThis as any;
	}
	
	if (!globalThis.document && globalThis.window?.document) {
		globalThis.document = globalThis.window.document;
	}
}

// Mock SvelteKit stores for testing - using proper Svelte stores
vi.mock('$app/stores', async () => {
	const { readable } = await import('svelte/store');
	
	return {
		page: readable({
			url: { href: 'http://localhost:3000/' } as any,
			params: {},
			route: { id: null },
			status: 200,
			error: null,
			data: {},
			form: null,
			state: {}
		}),
		navigating: readable(null),
		updated: readable(false)
	};
});

// Mock SvelteKit environment - ensure browser is true for Svelte 5
vi.mock('$app/environment', () => ({
	browser: true,
	dev: true,
	building: false,
	version: '1.0.0'
}));

// Mock SvelteKit navigation functions
vi.mock('$app/navigation', () => ({
	goto: vi.fn().mockResolvedValue(undefined),
	invalidate: vi.fn().mockResolvedValue(undefined),
	invalidateAll: vi.fn().mockResolvedValue(undefined),
	preloadData: vi.fn().mockResolvedValue(undefined),
	preloadCode: vi.fn().mockResolvedValue(undefined),
	beforeNavigate: vi.fn(),
	afterNavigate: vi.fn(),
	pushState: vi.fn(),
	replaceState: vi.fn()
}));

// Mock SvelteKit forms
vi.mock('$app/forms', () => ({
	enhance: vi.fn(() => ({
		destroy: vi.fn()
	})),
	applyAction: vi.fn().mockResolvedValue(undefined),
	deserialize: vi.fn()
}));

// Mock localStorage for tests
const createMockStorage = () => {
	const store = new Map<string, string>();
	
	return {
		getItem: vi.fn((key: string) => store.get(key) ?? null),
		setItem: vi.fn((key: string, value: string) => {
			store.set(key, String(value));
		}),
		removeItem: vi.fn((key: string) => {
			store.delete(key);
		}),
		clear: vi.fn(() => {
			store.clear();
		}),
		key: vi.fn((index: number) => {
			const keys = Array.from(store.keys());
			return keys[index] ?? null;
		}),
		get length() {
			return store.size;
		}
	};
};

Object.defineProperty(globalThis, 'localStorage', {
	value: createMockStorage(),
	writable: true,
	configurable: true
});

Object.defineProperty(globalThis, 'sessionStorage', {
	value: createMockStorage(),
	writable: true,
	configurable: true
});

// Mock matchMedia for tests
Object.defineProperty(globalThis, 'matchMedia', {
	writable: true,
	configurable: true,
	value: vi.fn().mockImplementation((query: string) => {
		const listeners = new Set<(event: any) => void>();
		
		return {
			matches: query.includes('max-width: 768px') ? false : true,
			media: query,
			onchange: null,
			addListener: vi.fn((listener: (event: any) => void) => {
				listeners.add(listener);
			}),
			removeListener: vi.fn((listener: (event: any) => void) => {
				listeners.delete(listener);
			}),
			addEventListener: vi.fn((type: string, listener: (event: any) => void) => {
				if (type === 'change') {
					listeners.add(listener);
				}
			}),
			removeEventListener: vi.fn((type: string, listener: (event: any) => void) => {
				if (type === 'change') {
					listeners.delete(listener);
				}
			}),
			dispatchEvent: vi.fn()
		};
	})
});

// If no test provides an IntersectionObserver mock, give a safe default so
// code that relies on construction doesn't crash. Individual tests should
// mock `global.IntersectionObserver` or `global.window.IntersectionObserver`
// locally (they already do) — in that case this global will be overridden.
if (!(globalThis as any).IntersectionObserver) {
	(globalThis as any).IntersectionObserver = class {
		callback: any;
		root: any = null;
		rootMargin: string = '0px';
		thresholds: number[] = [0];

		constructor(callback: any) {
			this.callback = callback;
			// spyable instance methods
			(this as any).observe = vi.fn();
			(this as any).unobserve = vi.fn();
			(this as any).disconnect = vi.fn();
			(this as any).takeRecords = vi.fn(() => []);
		}
	};
}

// Mock ResizeObserver for responsive components
// Provide a constructable ResizeObserver mock with spyable methods
if (!(globalThis as any).ResizeObserver) {
	(globalThis as any).ResizeObserver = class {
		callback: any;
		constructor(callback: any) {
			this.callback = callback;
			(this as any).observe = vi.fn();
			(this as any).unobserve = vi.fn();
			(this as any).disconnect = vi.fn();
		}
	};
}

// Mock requestAnimationFrame and cancelAnimationFrame
globalThis.requestAnimationFrame = vi.fn((callback: any) => {
	return (globalThis as any).setTimeout(() => callback(Date.now()), 16);
});

globalThis.cancelAnimationFrame = vi.fn((id: number) => {
	(globalThis as any).clearTimeout(id);
});

// Mock performance API for performance tests
Object.defineProperty(globalThis, 'performance', {
	value: {
		now: vi.fn(() => Date.now()),
		mark: vi.fn(),
		measure: vi.fn(),
		getEntriesByType: vi.fn(() => []),
		getEntriesByName: vi.fn(() => []),
		clearMarks: vi.fn(),
		clearMeasures: vi.fn(),
		timing: {
			navigationStart: Date.now() - 1000,
			loadEventEnd: Date.now(),
			domContentLoadedEventEnd: Date.now() - 500,
			domComplete: Date.now() - 200
		}
	},
	writable: true,
	configurable: true
});

// Mock fetch API for HTTP requests in tests
globalThis.fetch = vi.fn().mockResolvedValue({
	ok: true,
	status: 200,
	statusText: 'OK',
	json: vi.fn().mockResolvedValue({}),
	text: vi.fn().mockResolvedValue(''),
	blob: vi.fn().mockResolvedValue({} as any),
	arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(0)),
	headers: {} as any,
	redirected: false,
	type: 'basic',
	url: 'http://localhost:3000',
	clone: vi.fn(),
	body: null,
	bodyUsed: false
});

// Mock HTMLCanvasElement.getContext for axe-core compatibility
if (typeof (globalThis as any).HTMLCanvasElement !== 'undefined') {
	(globalThis as any).HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((contextType: string) => {
		if (contextType === '2d') {
			return {
				fillStyle: '',
				strokeStyle: '',
				lineWidth: 1,
				font: '10px sans-serif',
				textAlign: 'start',
				textBaseline: 'alphabetic',
				fillRect: vi.fn(),
				strokeRect: vi.fn(),
				clearRect: vi.fn(),
				fillText: vi.fn(),
				strokeText: vi.fn(),
				measureText: vi.fn().mockReturnValue({ width: 0 }),
				beginPath: vi.fn(),
				closePath: vi.fn(),
				moveTo: vi.fn(),
				lineTo: vi.fn(),
				arc: vi.fn(),
				stroke: vi.fn(),
				fill: vi.fn(),
				save: vi.fn(),
				restore: vi.fn(),
				translate: vi.fn(),
				rotate: vi.fn(),
				scale: vi.fn(),
				createImageData: vi.fn().mockReturnValue({ data: new Uint8ClampedArray(4), width: 1, height: 1 }),
				getImageData: vi.fn().mockReturnValue({ data: new Uint8ClampedArray(4), width: 1, height: 1 }),
				putImageData: vi.fn(),
				canvas: {
					width: 300,
					height: 150,
					toDataURL: vi.fn().mockReturnValue('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
				}
			};
		}
		return null;
	});

	// Also mock the HTMLCanvasElement.toDataURL directly
	(globalThis as any).HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
}

// Polyfill getComputedStyle to accept pseudo-element parameter used by axe-core
// jsdom's getComputedStyle may not accept the second argument, axe-core calls
// it with pseudo elements which throws. Wrap the original to ignore the
// pseudo-element parameter and return a compatible object.
const _origGetComputedStyle = (globalThis as any).getComputedStyle;
(globalThis as any).getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
	if (typeof _origGetComputedStyle === 'function') {
		try {
			// Call original without pseudoElt to avoid Not implemented error
			const result = _origGetComputedStyle.call(globalThis, elt);
			// Ensure there's a getPropertyValue function (axe expects this)
			if (typeof (result as any).getPropertyValue !== 'function') {
				return { getPropertyValue: () => '', ...result };
			}
			return result;
		} catch (e) {
			// Fallback minimal implementation
			return { getPropertyValue: (_: string) => '' } as any;
		}
	}
	return { getPropertyValue: (_: string) => '' } as any;
};

// NOTE: Do not mock $lib/stores or $lib/stores/theme here — tests should exercise
// the real theme store implementation to validate behavior. If specific tests
// need to mock parts of the store, they should do so locally in the test file.


// Ensure all browser globals are properly set for Svelte 5 detection
Object.defineProperty(globalThis, 'window', {
	value: globalThis,
	writable: true,
	configurable: true
});

Object.defineProperty(globalThis, 'document', {
	value: globalThis.document,
	writable: true,
	configurable: true
});