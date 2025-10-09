declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';
  
  export function axe(element: Element | Document, options?: any): Promise<AxeResults>;
  export const toHaveNoViolations: any;
}

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}