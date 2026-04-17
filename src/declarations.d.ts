// Module file — ensures these are augmentations, not full redeclarations.
export {};

/**
 * Vitest v3 defines Assertion in @vitest/expect (not 'vitest' directly).
 * Augment that package so expect(axeResults).toHaveNoViolations() type-checks.
 */
declare module '@vitest/expect' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Assertion<T = unknown> {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
