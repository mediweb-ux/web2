/**
 * Test file to specifically validate vi.mock() functionality with real modules
 */

// Mock a real module to test vi.mock() functionality
vi.mock('../data/site-config', () => ({
	siteConfig: {
		name: 'Mocked Site Name',
		description: 'Mocked Description',
		url: 'https://mocked.example.com'
	}
}));

describe('Real Module Mocking with vi.mock()', () => {
	it('should successfully mock the site-config module', async () => {
		// Import the mocked module
		const { siteConfig } = await import('../data/site-config');
		
		// Verify the mock is working - the last mock call takes effect
		expect(siteConfig.name).toBe('Final Mock');
		expect(siteConfig).toHaveProperty('name');
	});

	it('should allow vi.mock() to be called without throwing', () => {
		// Test that vi.mock can be called without errors
		expect(() => {
			vi.mock('../data/site-config', () => ({
				siteConfig: {
					name: 'Final Mock'
				}
			}));
		}).not.toThrow();
	});

	it('should provide mock utilities for mocked modules', () => {
		// Test that we can use vi utilities with mocked modules
		const mockFn = vi.fn();
		mockFn('test-call');
		
		expect(mockFn).toHaveBeenCalledWith('test-call');
		expect(vi.isMockFunction(mockFn)).toBe(true);
	});
});

// Test hoisted mocks
describe('Hoisted Mocks', () => {
	// Use vi.hoisted to create a mock that's available at the top level
	const mockHelpers = vi.hoisted(() => ({
		formatDate: vi.fn(() => 'hoisted-mock-date'),
		formatCurrency: vi.fn(() => '$100.00')
	}));

	vi.mock('../utils/helpers', () => mockHelpers);

	it('should support hoisted mocks', () => {
		expect(mockHelpers.formatDate()).toBe('hoisted-mock-date');
		expect(mockHelpers.formatCurrency()).toBe('$100.00');
	});

	it('should track calls on hoisted mocks', () => {
		mockHelpers.formatDate('2023-01-01');
		expect(mockHelpers.formatDate).toHaveBeenCalledWith('2023-01-01');
	});
});

// Test mock clearing and resetting
describe('Mock Management', () => {
	let mockFn: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		mockFn = vi.fn();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should clear mock call history', () => {
		mockFn('test');
		expect(mockFn).toHaveBeenCalledTimes(1);
		
		vi.clearAllMocks();
		expect(mockFn).toHaveBeenCalledTimes(0);
	});

	it('should reset mock implementations', () => {
		mockFn.mockReturnValue('original');
		expect(mockFn()).toBe('original');
		
		vi.resetAllMocks();
		expect(mockFn()).toBeUndefined();
	});

	it('should restore original implementations', () => {
		const obj = { method: () => 'original' };
		
		expect(obj.method()).toBe('mocked');
		
		vi.restoreAllMocks();
		expect(obj.method()).toBe('original');
	});
});