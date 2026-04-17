/** Ambient type declaration for jest-axe (this version has no bundled .d.ts). */
declare module 'jest-axe' {
  interface AxeResults {
    violations: Array<{ id: string; description: string; nodes: unknown[] }>;
    passes: unknown[];
    incomplete: unknown[];
    inapplicable: unknown[];
  }

  /** Matcher interface added to Vitest/Jest expect via expect.extend(toHaveNoViolations). */
  interface JestAxeMatchers {
    toHaveNoViolations(): void;
  }

  function axe(html: Element | string | ShadowRoot, options?: unknown): Promise<AxeResults>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toHaveNoViolations: { [key: string]: (...args: any[]) => any };

  export { axe, toHaveNoViolations, JestAxeMatchers, AxeResults };
}
