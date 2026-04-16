import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(() => ({
  plugins: [
    react(),
    // Bundle analysis — generates stats.html after every production build
    // View with: open stats.html  (or npm run analyze)
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],
  // Use /Activity-App/ base only when deploying to GitHub Pages (DEPLOY=true).
  // Local dev and local preview both use '/' so http://localhost:xxxx/ works directly.
  base: process.env.DEPLOY === 'true' ? '/Activity-App/' : '/',

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
    // Only run unit/component tests — Playwright handles e2e separately
    include: ['src/**/*.test.{js,jsx}', 'src/**/*.spec.{js,jsx}'],
    exclude: ['node_modules', 'dist', 'e2e'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',

      // Thresholds — fail CI if coverage drops below these
      thresholds: {
        statements: 60,
        branches: 55,
        functions: 60,
        lines: 60,
      },

      // Paths excluded from coverage measurement
      exclude: [
        'node_modules/**',
        'src/main.jsx',
        'src/app/store.js',
        'src/styles/**',
        '**/*.test.{js,jsx}',
        '**/*.spec.{js,jsx}',
        '**/test/**',
        'e2e/**',
        'playwright.config.js',
        'eslint.config.js',
        'vite.config.js',
        '.commitlintrc.cjs',
        'dist/**',
        'coverage/**',
      ],
    },
  },
}));
