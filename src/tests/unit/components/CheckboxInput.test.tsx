// FILEPATH: /Users/mangtri/Web/gx-lead/src/components/Input/CheckboxInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CheckboxInput from '../../../components/Input/CheckboxInput';

describe('CheckboxInput', () => {
  it('renders correctly', () => {
    render(<CheckboxInput label='test' id="test" value="test" />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
  });

  it('displays the correct label', () => {
    render(<CheckboxInput id="test" value="test" label="Test Checkbox" />);
    const labelElement = screen.getByText(/Test Checkbox/i);
    expect(labelElement).toBeInTheDocument();
  });

  it('is checked when clicked', () => {
    render(<CheckboxInput label='test' id="test" value="test" />);
    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);
    expect(checkboxElement).toBeChecked();
  });
});