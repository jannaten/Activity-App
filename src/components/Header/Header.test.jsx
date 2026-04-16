import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import { renderWithProviders } from '../../test/utils';

describe('Header', () => {
  // ── Snapshot ──────────────────────────────────────────────────────────────
  it('matches snapshot', () => {
    const { container } = renderWithProviders(<Header />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // ── Rendering ─────────────────────────────────────────────────────────────
  it('renders the brand link', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('activity')).toBeInTheDocument();
  });

  it('renders all four navigation links', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'All Activities' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Add Activity' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Statistics' })).toBeInTheDocument();
  });

  it('renders the theme toggle button', () => {
    renderWithProviders(<Header />);
    expect(
      screen.getByRole('button', { name: /switch to (dark|light) mode/i })
    ).toBeInTheDocument();
  });

  it('renders the hamburger menu button in the DOM (CSS-hidden at desktop viewport)', () => {
    const { container } = renderWithProviders(<Header />);
    // The hamburger is CSS-hidden (display:none) at desktop widths.
    // Query by aria-label attribute directly since accessible name is not computed for hidden elements.
    const hamburger = container.querySelector('[aria-label="Toggle navigation"]');
    expect(hamburger).toBeInTheDocument();
  });

  // ── Navigation ────────────────────────────────────────────────────────────
  it('nav links point to the correct hrefs', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'All Activities' })).toHaveAttribute('href', '/check');
    expect(screen.getByRole('link', { name: 'Add Activity' })).toHaveAttribute('href', '/create');
    expect(screen.getByRole('link', { name: 'Statistics' })).toHaveAttribute('href', '/stats');
  });

  // ── Hamburger menu (CSS-hidden at desktop — queried by aria-label attribute) ───
  it('hamburger button starts with aria-expanded="false"', () => {
    const { container } = renderWithProviders(<Header />);
    const hamburger = container.querySelector('[aria-label="Toggle navigation"]');
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the mobile menu when hamburger is clicked', () => {
    const { container } = renderWithProviders(<Header />);
    const hamburger = container.querySelector('[aria-label="Toggle navigation"]');
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the mobile menu on second hamburger click', () => {
    const { container } = renderWithProviders(<Header />);
    const hamburger = container.querySelector('[aria-label="Toggle navigation"]');
    fireEvent.click(hamburger);
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  // ── Theme toggle ──────────────────────────────────────────────────────────
  it('theme toggle aria-label reflects current mode', () => {
    renderWithProviders(<Header />, {
      preloadedState: { theme: { mode: 'light' } },
    });
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
  });

  it('dispatches toggleTheme when the theme button is clicked', () => {
    const { store } = renderWithProviders(<Header />, {
      preloadedState: { theme: { mode: 'light' } },
    });
    fireEvent.click(screen.getByRole('button', { name: /switch to dark mode/i }));
    expect(store.getState().theme.mode).toBe('dark');
  });

  // ── Accessibility ─────────────────────────────────────────────────────────
  it('nav element has an aria-label', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation');
  });
});
