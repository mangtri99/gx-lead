// FILEPATH: /Users/mangtri/Web/gx-lead/src/tests/unit/components/Input/DateGroupInput.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import DateGroupInput from '../../../components/Input/DateGroupInput';

describe('DateGroupInput', () => {
  test('renders correctly', () => {
    const props = {
      label: 'Test Label',
      id: 'test',
      placeholderDateStart: 'Start Date',
      placeholderDateEnd: 'End Date',
      onChangeDateStart: () => {},
      onChangeDateEnd: () => {},
      separator: 'to',
      dateValueStart: new Date(),
      dateValueEnd: new Date(),
    };
    render(<DateGroupInput {...props} />);
    const labelElement = screen.getByText(/Test Label/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders SingleDatePickerInput for start date with correct props', () => {
    const props = {
      label: 'Test Label',
      id: 'test',
      placeholderDateStart: 'Start Date',
      placeholderDateEnd: 'End Date',
      onChangeDateStart: () => {},
      onChangeDateEnd: () => {},
      separator: 'to',
      dateValueStart: new Date(),
      dateValueEnd: new Date(),
    };
    render(<DateGroupInput {...props} />);
    const startDatePicker = screen.getByPlaceholderText(/Start Date/i);
    expect(startDatePicker).toBeInTheDocument();
  });

  test('renders SingleDatePickerInput for end date with correct props', () => {
    const props = {
      label: 'Test Label',
      id: 'test',
      placeholderDateStart: 'Start Date',
      placeholderDateEnd: 'End Date',
      onChangeDateStart: () => {},
      onChangeDateEnd: () => {},
      separator: 'to',
      dateValueStart: new Date(),
      dateValueEnd: new Date(),
    };
    render(<DateGroupInput {...props} />);
    const endDatePicker = screen.getByPlaceholderText(/End Date/i);
    expect(endDatePicker).toBeInTheDocument();
  });
});