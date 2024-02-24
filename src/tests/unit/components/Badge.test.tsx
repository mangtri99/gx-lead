// FILEPATH: /Users/mangtri/Web/gx-lead/src/components/General/Badge.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Badge from '../../../components/General/Badge';

describe('Badge', () => {
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

  it('renders correctly', () => {
    render(<Badge color='primary'>Test Badge</Badge>);
    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toBeInTheDocument();
  });

  it('applies the correct color class', () => {
    colors.forEach(color => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render(<Badge color={color as any}>Test Badge {color}</Badge>);
      const badgeElement = screen.getByText(`Test Badge ${color}`);
      expect(badgeElement).toHaveClass(`text-bg-${color}`);
    });
  });

  it('applies additional class names', () => {
    render(<Badge color='primary' className='extra-class'>Test Badge</Badge>);
    const badgeElement = screen.getByText('Test Badge');
    expect(badgeElement).toHaveClass('extra-class');
  });
});