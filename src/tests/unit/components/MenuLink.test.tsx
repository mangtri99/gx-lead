// FILEPATH: /Users/mangtri/Web/gx-lead/src/components/General/MenuLink.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MenuLink from '../../../components/General/MenuLink';

describe('MenuLink', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <MenuLink to='/test' icon='🔗' title='Test Link' isShowSidebar={true} />
      </MemoryRouter>
    );
    const linkElement = screen.getByText('Test Link');
    expect(linkElement).toBeInTheDocument();
    expect(screen.getByText('🔗')).toBeInTheDocument();
  });

  it('applies the active class when the current location matches the to prop', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <MenuLink to='/test' icon='🔗' title='Test Link' isShowSidebar={true} />
      </MemoryRouter>
    );
    const linkElement = screen.getByText('Test Link');
    expect(linkElement.parentElement).toHaveClass('active');
  });

  it('does not apply the active class when the current location does not match the to prop', () => {
    render(
      <MemoryRouter initialEntries={['/other']}>
        <MenuLink to='/test' icon='🔗' title='Test Link' isShowSidebar={true} />
      </MemoryRouter>
    );
    const linkElement = screen.getByText('Test Link');
    expect(linkElement.parentElement).not.toHaveClass('active');
  });

  it('renders the title as visible when isShowSidebar is true', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <MenuLink to='/test' icon='🔗' title='Test Link' isShowSidebar={true} />
      </MemoryRouter>
    );
    const titleElement = screen.getByText('Test Link');
    expect(titleElement).toHaveClass('visible');
  });

  it('renders the title as invisible when isShowSidebar is false', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <MenuLink to='/test' icon='🔗' title='Test Link' isShowSidebar={false} />
      </MemoryRouter>
    );
    const titleElement = screen.getByText('Test Link');
    expect(titleElement).toHaveClass('invisible');
  });
});