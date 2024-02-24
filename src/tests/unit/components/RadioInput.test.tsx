// FILEPATH: /Users/mangtri/Web/gx-lead/src/components/Input/RadioInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import RadioInput from '../../../components/Input/RadioInput';

describe('RadioInput', () => {
  it('renders correctly', () => {
    render(<RadioInput id='test' label='Test Radio' />);
    const inputElement = screen.getByRole('radio');
    const labelElement = screen.getByText('Test Radio');
    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });

  it('applies additional class names', () => {
    render(<RadioInput id='test' className='extra-class' />);
    const inputElement = screen.getByRole('radio');
    expect(inputElement).toHaveClass('extra-class');
  });

  it('forwards the ref to the input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<RadioInput id='test' ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('radio'));
  });

  it('fires the onChange event handler when clicked', () => {
    const handleChange = vi.fn();
    render(<RadioInput id='test' onChange={handleChange} />);
    const inputElement = screen.getByRole('radio');
    fireEvent.click(inputElement);
    expect(handleChange).toHaveBeenCalled();
  });
});