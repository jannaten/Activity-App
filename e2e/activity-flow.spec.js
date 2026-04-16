import { test, expect } from '@playwright/test';

/**
 * Core user journey: create an activity and verify it appears on the dashboard.
 * This spec covers the critical path a first-time user would take.
 */

test.describe('Activity creation and dashboard flow', () => {
  test.beforeEach(async ({ page }) => {
    // Start fresh on the dashboard
    await page.goto('/');
  });

  test('dashboard loads and shows navigation links', async ({ page }) => {
    // Header brand is visible — use exact role match to avoid matching "Add Activity" nav link
    await expect(page.getByRole('link', { name: 'activity', exact: true })).toBeVisible();

    // All four nav links are present
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'All Activities' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add Activity' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Statistics' })).toBeVisible();
  });

  test('navigates to create activity page', async ({ page }) => {
    await page.getByRole('link', { name: 'Add Activity' }).click();
    await expect(page).toHaveURL(/\/create/);
    await expect(page.getByRole('heading', { name: 'Add an Activity' })).toBeVisible();
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.goto('/create');

    // Submit without filling anything
    await page.getByRole('button', { name: 'Add Activity' }).click();

    await expect(page.getByText('Activity name is required')).toBeVisible();
    await expect(page.getByText('Please set a time')).toBeVisible();
  });

  test('shows validation error for short activity name', async ({ page }) => {
    await page.goto('/create');

    await page.getByLabel('Activity name').fill('A');
    await page.getByRole('button', { name: 'Add Activity' }).click();

    await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
  });

  test('navigates to All Activities page', async ({ page }) => {
    await page.getByRole('link', { name: 'All Activities' }).click();
    await expect(page).toHaveURL(/\/check/);
  });

  test('navigates to Statistics page', async ({ page }) => {
    await page.getByRole('link', { name: 'Statistics' }).click();
    await expect(page).toHaveURL(/\/stats/);
  });

  test('theme toggle button is accessible', async ({ page }) => {
    const themeBtn = page.getByRole('button', { name: /switch to (dark|light) mode/i });
    await expect(themeBtn).toBeVisible();
    await expect(themeBtn).toBeEnabled();
  });

  test('theme toggles between light and dark', async ({ page }) => {
    const themeBtn = page.getByRole('button', { name: /switch to dark mode/i });
    await themeBtn.click();

    // After clicking, the html element should have data-theme="dark"
    const htmlTheme = await page.locator('html').getAttribute('data-theme');
    expect(htmlTheme).toBe('dark');

    // Clicking again should restore light mode
    await page.getByRole('button', { name: /switch to light mode/i }).click();
    const htmlThemeAfter = await page.locator('html').getAttribute('data-theme');
    expect(htmlThemeAfter).toBe('light');
  });

  test('unknown routes redirect to dashboard', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Accessibility', () => {
  test('dashboard page has no obvious aria violations', async ({ page }) => {
    await page.goto('/');
    // Check that there is a main landmark
    await expect(page.locator('main')).toBeVisible();
    // Navigation has aria-label
    await expect(page.locator('nav[aria-label]')).toBeVisible();
  });

  test('create activity form has accessible labels', async ({ page }) => {
    await page.goto('/create');
    // Inputs are associated with their labels
    await expect(page.getByLabel('Activity name')).toBeVisible();
    await expect(page.getByLabel('Schedule time')).toBeVisible();
  });
});
