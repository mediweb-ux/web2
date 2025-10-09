// Global test environment types
/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

// Vitest globals - ensure they're available in all test files
declare global {
  // Vitest test functions
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => void | Promise<void>): void;
  function test(name: string, fn: () => void | Promise<void>): void;
  
  // Vitest lifecycle functions
  function beforeEach(fn: () => void | Promise<void>): void;
  function afterEach(fn: () => void | Promise<void>): void;
  function beforeAll(fn: () => void | Promise<void>): void;
  function afterAll(fn: () => void | Promise<void>): void;
  
  // Vitest expect and vi
  const expect: import('vitest').ExpectStatic;
  const vi: typeof import('vitest').vi;
}

export {};