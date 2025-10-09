/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

// jest-axe type declarations
declare module 'jest-axe' {
  export function axe(element: Element | Document, config?: any): Promise<any>;
  export function toHaveNoViolations(received: any): any;
}

declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
  }
}

// Additional type declarations for test environment
declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
    IntersectionObserver: typeof IntersectionObserver;
    ResizeObserver: typeof ResizeObserver;
  }
  
  // Vitest globals - explicitly declare them
  var describe: typeof import('vitest').describe;
  var it: typeof import('vitest').it;
  var test: typeof import('vitest').test;
  var expect: typeof import('vitest').expect;
  var vi: typeof import('vitest').vi;
  var beforeEach: typeof import('vitest').beforeEach;
  var afterEach: typeof import('vitest').afterEach;
  var beforeAll: typeof import('vitest').beforeAll;
  var afterAll: typeof import('vitest').afterAll;
}

// Ensure proper module resolution for test files
declare module '*.test.ts' {
  // This ensures TypeScript treats test files properly
}

declare module '*.spec.ts' {
  // This ensures TypeScript treats spec files properly
}

// Mock module declarations for SvelteKit
declare module '$app/environment' {
  export const browser: boolean;
  export const dev: boolean;
  export const building: boolean;
  export const version: string;
}

declare module '$app/stores' {
  import type { Readable } from 'svelte/store';
  export const page: Readable<any>;
  export const navigating: Readable<any>;
  export const updated: Readable<boolean>;
}

declare module '$app/forms' {
  export function enhance(form: HTMLFormElement, options?: any): any;
}

declare module '$app/navigation' {
  export function goto(url: string, options?: any): Promise<void>;
  export function invalidate(url: string): Promise<void>;
  export function invalidateAll(): Promise<void>;
  export function preloadData(url: string): Promise<void>;
  export function preloadCode(url: string): Promise<void>;
  export function beforeNavigate(callback: (navigation: any) => void): void;
  export function afterNavigate(callback: (navigation: any) => void): void;
}

export {};