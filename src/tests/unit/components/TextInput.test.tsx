// FILEPATH: /Users/mangtri/Web/gx-lead/src/tests/unit/components/Input/TextInput.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import TextInput from '../../../components/Input/TextInput';

describe('TextInput', () => {
  test('renders correctly', () => {
    const props = {
      label: 'Test Label',
      type: 'text',
      id: 'test',
      placeholder: 'Test Placeholder',
      message: 'Test Message',
      className: 'test-class',
    };
    render(<TextInput {...props} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('displays the correct label', () => {
    const props = {
      label: 'Test Label',
      type: 'text',
      id: 'test',
      placeholder: 'Test Placeholder',
      message: 'Test Message',
      className: 'test-class',
    };
    render(<TextInput {...props} />);
    const labelElement = screen.getByText(/Test Label/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('has the correct type', () => {
    const props = {
      label: 'Test Label',
      type: 'text',
      id: 'test',
      placeholder: 'Test Placeholder',
      message: 'Test Message',
      className: 'test-class',
    };
    render(<TextInput {...props} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('has the correct placeholder', () => {
    const props = {
      label: 'Test Label',
      type: 'text',
      id: 'test',
      placeholder: 'Test Placeholder',
      message: 'Test Message',
      className: 'test-class',
    };
    render(<TextInput {...props} />);
    const inputElement = screen.getByPlaceholderText(/Test Placeholder/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('displays the correct message', () => {
    const props = {
      label: 'Test Label',
      type: 'text',
      id: 'test',
      placeholder: 'Test Placeholder',
      message: 'Test Message',
      className: 'test-class',
    };
    render(<TextInput {...props} />);
    const messageElement = screen.getByText(/Test Message/i);
    expect(messageElement).toBeInTheDocument();
  });
});