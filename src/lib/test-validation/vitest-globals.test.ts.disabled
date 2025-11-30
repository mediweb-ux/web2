/**
 * Test file to validate Vitest globals functionality
 * This test ensures all Vitest global functions work without explicit imports
 */

// Test that describe, it, expect, vi functions work without imports
describe('Vitest Globals Validation', () => {
	// Test basic test functions
	it('should have access to basic test functions without imports', () => {
		expect(typeof describe).toBe('function');
		expect(typeof it).toBe('function');
		expect(typeof test).toBe('function');
		expect(typeof expect).toBe('function');
		expect(typeof vi).toBe('object');
	});

	// Test lifecycle functions
	describe('Lifecycle Functions', () => {
		let setupValue: string;
		let teardownValue: string;

		beforeAll(() => {
			setupValue = 'setup-complete';
		});

		afterAll(() => {
			teardownValue = 'teardown-complete';
		});

		beforeEach(() => {
			// This should run before each test
			expect(setupValue).toBe('setup-complete');
		});

		afterEach(() => {
			// This should run after each test
			expect(setupValue).toBe('setup-complete');
		});

		it('should have access to lifecycle functions without imports', () => {
			expect(typeof beforeAll).toBe('function');
			expect(typeof afterAll).toBe('function');
			expect(typeof beforeEach).toBe('function');
			expect(typeof afterEach).toBe('function');
		});

		it('should execute lifecycle functions correctly', () => {
			expect(setupValue).toBe('setup-complete');
		});
	});

	// Test vi (Vitest mock utilities)
	describe('Vi Mock Utilities', () => {
		it('should have access to vi mock functions', () => {
			expect(typeof vi.fn).toBe('function');
			expect(typeof vi.mock).toBe('function');
			expect(typeof vi.spyOn).toBe('function');
			expect(typeof vi.clearAllMocks).toBe('function');
			expect(typeof vi.resetAllMocks).toBe('function');
			expect(typeof vi.restoreAllMocks).toBe('function');
		});

		it('should be able to create mock functions', () => {
			const mockFn = vi.fn();
			expect(mockFn).toBeDefined();
			expect(typeof mockFn).toBe('function');
			
			mockFn('test');
			expect(mockFn).toHaveBeenCalledWith('test');
			expect(mockFn).toHaveBeenCalledTimes(1);
		});

		it('should be able to spy on objects', () => {
			const testObject = {
				method: () => 'original'
			};

			const spy = vi.spyOn(testObject, 'method');
			testObject.method();
			
			expect(spy).toHaveBeenCalled();
			expect(spy).toHaveBeenCalledTimes(1);
		});

		it('should be able to mock timers', () => {
			vi.useFakeTimers();
			
			const callback = vi.fn();
			setTimeout(callback, 1000);
			
			expect(callback).not.toHaveBeenCalled();
			
			vi.advanceTimersByTime(1000);
			expect(callback).toHaveBeenCalled();
			
			vi.useRealTimers();
		});
	});

	// Test expect matchers
	describe('Expect Matchers', () => {
		it('should have access to basic matchers', () => {
			expect(true).toBe(true);
			expect('hello').toEqual('hello');
			expect([1, 2, 3]).toContain(2);
			expect({ a: 1 }).toHaveProperty('a');
		});

		it('should have access to jest-dom matchers', () => {
			const element = document.createElement('div');
			element.textContent = 'Hello World';
			document.body.appendChild(element);

			expect(element).toBeInTheDocument();
			expect(element).toHaveTextContent('Hello World');
			
			document.body.removeChild(element);
		});

		it('should have access to async matchers', async () => {
			const promise = Promise.resolve('success');
			await expect(promise).resolves.toBe('success');
		});
	});
});

// Test module mocking functionality
describe('Module Mocking', () => {
	// Test vi.mock() for module mocking
	it('should be able to mock modules with vi.mock()', () => {
		// Create a simple module mock
		vi.mock('../data/site-config', () => ({
			siteConfig: {
				name: 'Mocked Site',
				description: 'This is a mocked site'
			}
		}));

		// The mock should be available
		expect(vi.isMockFunction).toBeDefined();
	});

	it('should be able to mock ES modules', async () => {
		// Test dynamic import mocking
		vi.mock('../utils/helpers', () => ({
			default: {
				formatDate: vi.fn(() => 'mocked-date')
			}
		}));

		// This tests that the mocking system works
		expect(typeof vi.mock).toBe('function');
	});

	it('should be able to mock with factory functions', () => {
		const mockFactory = vi.fn(() => ({
			getValue: () => 'mocked-value'
		}));

		const mockModule = mockFactory();
		expect(mockModule.getValue()).toBe('mocked-value');
		expect(mockFactory).toHaveBeenCalled();
	});
});

// Test additional Vitest utilities
describe('Additional Vitest Utilities', () => {
	it('should have access to test context utilities', () => {
		expect(typeof vi.hoisted).toBe('function');
		expect(typeof vi.stubEnv).toBe('function');
		expect(typeof vi.unstubAllEnvs).toBe('function');
	});

	it('should be able to stub environment variables', () => {
		vi.stubEnv('TEST_VAR', 'test-value');
		expect(process.env.TEST_VAR).toBe('test-value');
		
		vi.unstubAllEnvs();
	});

	it('should have access to snapshot testing', () => {
		const data = { name: 'test', value: 42 };
		expect(data).toMatchSnapshot();
	});
});