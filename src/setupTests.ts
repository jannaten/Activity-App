import '@testing-library/jest-dom';

// jsdom doesn't implement window.matchMedia — polyfill it so themeSlice
// and any component that calls matchMedia can be tested without errors.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
