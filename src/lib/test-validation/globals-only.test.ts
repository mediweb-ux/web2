/**
 * Test file that uses ONLY Vitest globals without any imports
 * This validates that globals work correctly with TypeScript
 */

// No imports - testing pure globals functionality

describe('Pure Vitest Globals Test', () => {
	it('should work without any imports', () => {
		expect(true).toBe(true);
	});

	it('should have access to vi utilities', () => {
		const mockFn = vi.fn();
		mockFn('test');
		expect(mockFn).toHaveBeenCalledWith('test');
	});

	describe('Lifecycle functions', () => {
		let testValue: string;

		beforeEach(() => {
			testValue = 'initialized';
		});

		it('should execute beforeEach', () => {
			expect(testValue).toBe('initialized');
		});

		afterEach(() => {
			// Cleanup if needed
		});
	});
});