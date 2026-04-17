import { screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import UndoToast from './UndoToast';
import { renderWithProviders, defaultActivitiesState, makeActivity } from '../../test/utils';

const stateWithUndo = {
  activities: {
    ...defaultActivitiesState,
    undoStack: [{ type: 'delete' as const, snapshot: makeActivity() }],
  },
};

const stateWithoutUndo = {
  activities: {
    ...defaultActivitiesState,
    undoStack: [],
  },
};

describe('UndoToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  // ── Hidden when no undo available ─────────────────────────────────────────
  it('renders nothing when undoStack is empty', () => {
    const { container } = renderWithProviders(<UndoToast />, {
      preloadedState: stateWithoutUndo,
    });
    expect(container).toBeEmptyDOMElement();
  });

  // ── Visible when undo available ───────────────────────────────────────────
  it('shows the toast when undoStack is non-empty', () => {
    renderWithProviders(<UndoToast />, { preloadedState: stateWithUndo });
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Action complete')).toBeInTheDocument();
  });

  it('renders both Undo and Dismiss buttons', () => {
    renderWithProviders(<UndoToast />, { preloadedState: stateWithUndo });
    expect(screen.getByRole('button', { name: /undo last action/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dismiss notification/i })).toBeInTheDocument();
  });

  // ── Dismiss ───────────────────────────────────────────────────────────────
  it('hides the toast when dismiss is clicked', () => {
    renderWithProviders(<UndoToast />, { preloadedState: stateWithUndo });
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  // ── Auto-dismiss ──────────────────────────────────────────────────────────
  it('auto-dismisses after 5 seconds', () => {
    renderWithProviders(<UndoToast />, { preloadedState: stateWithUndo });
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('does not dismiss before 5 seconds', () => {
    renderWithProviders(<UndoToast />, { preloadedState: stateWithUndo });
    act(() => {
      vi.advanceTimersByTime(4999);
    });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // ── Undo dispatches action ────────────────────────────────────────────────
  it('dispatches undoLastAction and hides when Undo is clicked', () => {
    const { store } = renderWithProviders(<UndoToast />, {
      preloadedState: stateWithUndo,
    });

    fireEvent.click(screen.getByRole('button', { name: /undo last action/i }));

    expect(store.getState().activities.undoStack).toHaveLength(0);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  // ── Accessibility ─────────────────────────────────────────────────────────
  it('uses role="status" for polite live region', () => {
    renderWithProviders(<UndoToast />, { preloadedState: stateWithUndo });
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });
});
