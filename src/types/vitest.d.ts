/// <reference types="vitest/globals" />

// This file ensures Vitest globals are available in TypeScript
// when using globals: true in vitest.config.ts

declare global {
	// Vitest globals are already declared by vitest/globals
	// This file just ensures they're properly recognized
}

export {};