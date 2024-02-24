// FILEPATH: /Users/mangtri/Web/gx-lead/src/components/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from '../../../components/Button/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Test Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    render(<Button variant="secondary">Test Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toHaveClass('btn-secondary');
  });

  it('applies the correct size class', () => {
    render(<Button size="lg">Test Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toHaveClass('btn-lg');
  });

  it('applies the correct outline class when outline prop is true', () => {
    render(<Button outline variant="secondary">Test Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toHaveClass('btn-outline-secondary');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Test Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /Test Button/i });
    expect(buttonElement).toBeDisabled();
  });
});