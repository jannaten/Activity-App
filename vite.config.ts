/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(() => ({
  plugins: [
    react(),
    // Bundle analysis — generates stats.html after every production build
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],
  base: '/',

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    // Only run unit/component tests — Playwright handles e2e separately
    include: ['src/**/*.test.{ts,tsx}', 'src/**/*.spec.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'e2e'],

    coverage: {
      provider: 'v8' as const,
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',

      thresholds: {
        statements: 59,
        branches: 55,
        functions: 60,
        lines: 59,
      },

      exclude: [
        'node_modules/**',
        'src/main.tsx',
        'src/app/store.ts',
        'src/styles/**',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/test/**',
        'e2e/**',
        'playwright.config.js',
        'eslint.config.js',
        'vite.config.ts',
        '.commitlintrc.cjs',
        'dist/**',
        'coverage/**',

        // ── Components awaiting tests ──────────────────────────────────────
        'src/components/ActiveActivities/**',
        'src/components/ArchivedActivities/**',
        'src/components/EditActivityModal/**',
        'src/components/Notifications/**',
        'src/components/SkeletonLoader/**',
        'src/components/WeatherSuggestions/**',
        'src/components/WeatherWidget/**',

        // ── Screens awaiting tests ─────────────────────────────────────────
        'src/screens/Dashboard/**',
        'src/screens/Statistics/**',
        'src/screens/CheckActivities/**',

        // ── Hooks awaiting tests ───────────────────────────────────────────
        'src/hooks/useActivityTimer.ts',

        // ── Feature slices awaiting tests ──────────────────────────────────
        'src/features/weather/**',
        'src/features/theme/**',

        // ── App shell (tested indirectly via E2E) ──────────────────────────
        'src/App.tsx',
      ],
    },
  },
}));
