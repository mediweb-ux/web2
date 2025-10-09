// Mock for $app/forms to provide form functionality in tests
import { vi } from 'vitest';

export const enhance = vi.fn((form, options) => {
	return {
		destroy: vi.fn()
	};
});

export const applyAction = vi.fn();
export const deserialize = vi.fn();