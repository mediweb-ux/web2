// Vitest global types for when globals: true is enabled
import type {
  describe as VitestDescribe,
  it as VitestIt,
  test as VitestTest,
  expect as VitestExpect,
  vi as VitestVi,
  beforeEach as VitestBeforeEach,
  afterEach as VitestAfterEach,
  beforeAll as VitestBeforeAll,
  afterAll as VitestAfterAll,
} from 'vitest';

declare global {
  const describe: typeof VitestDescribe;
  const it: typeof VitestIt;
  const test: typeof VitestTest;
  const expect: typeof VitestExpect;
  const vi: typeof VitestVi;
  const beforeEach: typeof VitestBeforeEach;
  const afterEach: typeof VitestAfterEach;
  const beforeAll: typeof VitestBeforeAll;
  const afterAll: typeof VitestAfterAll;
}

export {};