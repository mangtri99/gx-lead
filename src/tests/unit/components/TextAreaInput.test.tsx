// FILEPATH: /Users/mangtri/Web/gx-lead/src/components/Input/TextAreaInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import TextAreaInput from '../../../components/Input/TextAreaInput';

describe('TextAreaInput', () => {
  it('renders correctly', () => {
    render(<TextAreaInput id='test' label='Test Label' />);
    const textareaElement = screen.getByRole('textbox');
    const labelElement = screen.getByText('Test Label');
    expect(textareaElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });

  it('applies additional class names', () => {
    render(<TextAreaInput id='test' className='extra-class' />);
    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveClass('extra-class');
  });

  it('forwards the ref to the textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<TextAreaInput id='test' ref={ref} />);
    expect(ref.current).toBe(screen.getByRole('textbox'));
  });

  it('fires the onChange event handler when the textarea value is changed', () => {
    const handleChange = vi.fn();
    render(<TextAreaInput id='test' onChange={handleChange} />);
    const textareaElement = screen.getByRole('textbox');
    fireEvent.change(textareaElement, { target: { value: 'Test Value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders the error message correctly', () => {
    render(<TextAreaInput id='test' message='Test Error' />);
    const messageElement = screen.getByText('Test Error');
    expect(messageElement).toBeInTheDocument();
  });
});