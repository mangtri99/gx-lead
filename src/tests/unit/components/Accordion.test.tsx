// FILEPATH: /Users/mangtri/Web/gx-lead/src/components/General/Accordion.test.tsx
import { render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Accordion from '../../../components/General/Accordion';


describe('Accordion component', () => {
  test('should add class show on parent when true', () => {
    const handleOpen = vi.fn();
    const title = 'Test Title';
    const children = <div>Test Content</div>;
    const { getByRole } = render(
      <Accordion value={true} handleOpen={handleOpen} title={title}>
        {children}
      </Accordion>
    );

    expect(getByRole('button').parentElement).toHaveClass('show');
  });

  test('should render custom icon if provided', () => {
    const handleOpen = vi.fn();
    const title = 'Test Title';
    const customIcon = <div>Custom Icon</div>;
    const children = <div>Test Content</div>;
    const { getByText, queryByTestId } = render(
      <Accordion
        value={false}
        handleOpen={handleOpen}
        title={title}
        icon={customIcon}
      >
        {children}
      </Accordion>
    );

    expect(queryByTestId('chevron-icon')).toBeNull();
    expect(getByText('Custom Icon')).toBeInTheDocument();
  });

  test('should render default icon if no custom icon provided', () => {
    const handleOpen = vi.fn();
    const title = 'Test Title';
    const children = <div>Test Content</div>;
    const { getByTestId } = render(
      <Accordion value={false} handleOpen={handleOpen} title={title}>
        {children}
      </Accordion>
    );

    expect(getByTestId('chevron-icon')).toBeInTheDocument();
  });
});
