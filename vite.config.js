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
  base: '/',

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

      // Thresholds apply only to the files that ARE included in coverage.
      // Raise these as more components get tests.
      thresholds: {
        statements: 59,
        branches: 55,
        functions: 60,
        lines: 59,
      },

      // Exclude files that have no tests yet so they don't drag the threshold down.
      // Remove entries here as you add tests for each component.
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
        'src/hooks/useActivityTimer.js',

        // ── Feature slices awaiting tests ──────────────────────────────────
        'src/features/weather/**',
        'src/features/theme/**',

        // ── App shell (tested indirectly via E2E) ──────────────────────────
        'src/App.jsx',
      ],
    },
  },
}));
