import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('does not update the value before the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe('initial');
  });

  it('updates the value exactly when the delay elapses', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('updated');
  });

  it('resets the timer when value changes rapidly (debouncing effect)', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: 'c' });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: 'final' });
    // Only 200ms since last value change — should still be the initial
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('a');

    // After another 100ms the total since 'final' is 300ms
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('final');
  });

  it('uses 300ms as the default delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'start' },
    });
    rerender({ value: 'end' });

    act(() => {
      vi.advanceTimersByTime(299);
    });
    expect(result.current).toBe('start');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('end');
  });

  it('respects a custom delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
      initialProps: { value: 'start' },
    });
    rerender({ value: 'end' });

    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(result.current).toBe('start');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('end');
  });
});
