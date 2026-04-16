import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  // ── Snapshot ─────────────────────────────────────────────────────────────
  it('matches snapshot (primary/medium defaults)', () => {
    const { container } = render(<Button>Save</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  // ── Rendering ─────────────────────────────────────────────────────────────
  it('renders its children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('defaults to type="button" to prevent accidental form submission', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respects an explicit type="submit"', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  // ── Variants & sizes ──────────────────────────────────────────────────────
  it('applies the "primary" CSS module class by default', () => {
    const { container } = render(<Button>Primary</Button>);
    expect(container.firstChild.className).toMatch(/primary/);
  });

  it('applies the "secondary" CSS module class when variant="secondary"', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild.className).toMatch(/secondary/);
  });

  it('applies the "large" CSS module class when size="large"', () => {
    const { container } = render(<Button size="large">Large</Button>);
    expect(container.firstChild.className).toMatch(/large/);
  });

  it('applies the "small" CSS module class when size="small"', () => {
    const { container } = render(<Button size="small">Small</Button>);
    expect(container.firstChild.className).toMatch(/small/);
  });

  // ── Disabled state ────────────────────────────────────────────────────────
  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ── Interactions ──────────────────────────────────────────────────────────
  it('calls onClick exactly once when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  // ── Pass-through props ────────────────────────────────────────────────────
  it('forwards extra props (aria-label) to the underlying button', () => {
    render(<Button aria-label="save document">Save</Button>);
    expect(screen.getByRole('button', { name: /save document/i })).toBeInTheDocument();
  });

  it('forwards data attributes to the underlying button', () => {
    render(<Button data-testid="my-btn">Test</Button>);
    expect(screen.getByTestId('my-btn')).toBeInTheDocument();
  });
});
