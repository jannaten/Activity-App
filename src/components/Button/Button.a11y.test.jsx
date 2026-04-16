/**
 * Accessibility tests using jest-axe.
 * These verify that rendered components have no detectable WCAG violations.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button';

expect.extend(toHaveNoViolations);

describe('Button — accessibility', () => {
  it('has no axe violations in default (primary) state', async () => {
    const { container } = render(<Button>Save changes</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no axe violations when disabled', async () => {
    const { container } = render(<Button disabled>Disabled button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no axe violations for secondary variant', async () => {
    const { container } = render(<Button variant="secondary">Cancel</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no axe violations when button has an aria-label', async () => {
    const { container } = render(<Button aria-label="Close modal">✕</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
