// FILEPATH: /Users/mangtri/Web/gx-lead/src/components/General/Tabs.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Tabs from '../../../components/General/Tabs';

describe('Tabs', () => {
  const items = [
    { value: '1', label: 'Tab 1' },
    { value: '2', label: 'Tab 2' },
    { value: '3', label: 'Tab 3' },
  ];
  const handleChangeTab = vi.fn();

  it('renders correctly', () => {
    render(<Tabs items={items} value='1' onChangeTab={handleChangeTab} />);
    items.forEach(item => {
      const tabElement = screen.getByText(item.label);
      expect(tabElement).toBeInTheDocument();
    });
  });

  it('applies the active class to the selected tab', () => {
    render(<Tabs items={items} value='2' onChangeTab={handleChangeTab} />);
    const activeTab = screen.getByText('Tab 2');
    expect(activeTab.parentElement).toHaveClass('active');
  });

  it('does not apply the active class to unselected tabs', () => {
    render(<Tabs items={items} value='2' onChangeTab={handleChangeTab} />);
    const inactiveTab = screen.getByText('Tab 1');
    expect(inactiveTab.parentElement).not.toHaveClass('active');
  });

  it('fires the onChangeTab event handler when a tab is clicked', () => {
    render(<Tabs items={items} value='1' onChangeTab={handleChangeTab} />);
    const tabElement = screen.getByText('Tab 3');
    fireEvent.click(tabElement);
    expect(handleChangeTab).toHaveBeenCalledWith('3');
  });
});