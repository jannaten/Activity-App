import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateActivity from './CreateActivity';
import { renderWithProviders } from '../../test/utils';
import type { Activity } from '../../types';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useNavigate: () => mockNavigate };
});

/** Returns a time string (HH:MM) guaranteed to be at least 1 hour in the future. */
function futuretime(): string {
  const d = new Date();
  const h = Math.min(d.getHours() + 1, 22);
  const m = d.getMinutes();
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

describe('CreateActivity', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  // ── Rendering ─────────────────────────────────────────────────────────────
  it('renders the form heading', () => {
    renderWithProviders(<CreateActivity />);
    expect(screen.getByRole('heading', { name: /add an activity/i })).toBeInTheDocument();
  });

  it('renders the activity name input', () => {
    renderWithProviders(<CreateActivity />);
    expect(screen.getByLabelText(/activity name/i)).toBeInTheDocument();
  });

  it('renders the time input', () => {
    renderWithProviders(<CreateActivity />);
    expect(screen.getByLabelText(/schedule time/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    renderWithProviders(<CreateActivity />);
    expect(screen.getByRole('button', { name: /add activity/i })).toBeInTheDocument();
  });

  // ── Validation errors — required fields ───────────────────────────────────
  it('shows "Activity name is required" when name is empty on submit', async () => {
    renderWithProviders(<CreateActivity />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add activity/i }));
    });
    await screen.findByText(/activity name is required/i);
  });

  it('shows "Please set a time" when time is empty on submit', async () => {
    renderWithProviders(<CreateActivity />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add activity/i }));
    });
    await screen.findByText(/please set a time/i);
  });

  // ── Validation errors — name length ───────────────────────────────────────
  it('shows min-length error for a 1-character name', async () => {
    renderWithProviders(<CreateActivity />);
    fireEvent.change(screen.getByLabelText(/activity name/i), { target: { value: 'A' } });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add activity/i }));
    });
    await screen.findByText(/at least 2 characters/i);
  });

  // ── Accessibility attributes on invalid inputs ─────────────────────────────
  it('sets aria-invalid on the name input when there is an error', async () => {
    renderWithProviders(<CreateActivity />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add activity/i }));
    });
    await waitFor(() => {
      expect(screen.getByLabelText(/activity name/i)).toHaveAttribute('aria-invalid', 'true');
    });
  });

  // ── Successful submission ─────────────────────────────────────────────────
  it('shows success message and dispatches addActivity on valid submit', async () => {
    const { store } = renderWithProviders(<CreateActivity />);

    fireEvent.change(screen.getByLabelText(/activity name/i), {
      target: { value: 'Morning run' },
    });
    fireEvent.change(screen.getByLabelText(/schedule time/i), {
      target: { value: futuretime() },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add activity/i }));
    });

    await screen.findByText(/activity added/i);

    const { activities } = store.getState().activities;
    expect(activities.some((a: Activity) => a.name === 'Morning run')).toBe(true);
  });

  it('navigates to dashboard after the 1200ms delay post-submit', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0));

    try {
      renderWithProviders(<CreateActivity />);

      fireEvent.change(screen.getByLabelText(/activity name/i), {
        target: { value: 'Evening walk' },
      });
      fireEvent.change(screen.getByLabelText(/schedule time/i), {
        target: { value: '09:30' },
      });

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /add activity/i }));
      });

      await act(async () => {
        vi.advanceTimersByTime(1200);
      });

      expect(mockNavigate).toHaveBeenCalledWith('/');
    } finally {
      vi.useRealTimers();
    }
  });
});
