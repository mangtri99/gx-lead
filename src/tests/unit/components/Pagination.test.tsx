// FILEPATH: /Users/mangtri/Web/gx-lead/src/components/General/Pagination.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '../../../components/General/Pagination';

describe('Pagination', () => {
  const handleChangePage = vi.fn();

  it('renders correctly', () => {
    render(<Pagination currentPage={1} lastPage={5} handleChangePage={handleChangePage} />);
    const paginationElement = screen.getByRole('navigation');
    expect(paginationElement).toBeInTheDocument();
  });

  it('generates the correct number of pagination links', () => {
    render(<Pagination currentPage={1} lastPage={5} handleChangePage={handleChangePage} />);
    const paginationLinks = screen.getAllByRole('button');
    expect(paginationLinks).toHaveLength(7); // 5 page links + 2 navigation links
  });

  it('applies the active class to the current page link', () => {
    render(<Pagination currentPage={3} lastPage={5} handleChangePage={handleChangePage} />);
    const activeLink = screen.getByText('3');
    expect(activeLink).toHaveClass('active');
  });

  it('disables the previous button when on the first page', () => {
    render(<Pagination currentPage={1} lastPage={5} handleChangePage={handleChangePage} />);
    const prevButton = screen.getByLabelText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables the next button when on the last page', () => {
    render(<Pagination currentPage={5} lastPage={5} handleChangePage={handleChangePage} />);
    const nextButton = screen.getByLabelText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('fires the handleChangePage event handler when a page link is clicked', () => {
    render(<Pagination currentPage={1} lastPage={5} handleChangePage={handleChangePage} />);
    const pageLink = screen.getByText('3');
    fireEvent.click(pageLink);
    expect(handleChangePage).toHaveBeenCalledWith('3');
  });

  it('fires the handleChangePage event handler when the previous button is clicked', () => {
    render(<Pagination currentPage={2} lastPage={5} handleChangePage={handleChangePage} />);
    const prevButton = screen.getByLabelText('Previous');
    fireEvent.click(prevButton);
    expect(handleChangePage).toHaveBeenCalledWith('prev');
  });

  it('fires the handleChangePage event handler when the next button is clicked', () => {
    render(<Pagination currentPage={2} lastPage={5} handleChangePage={handleChangePage} />);
    const nextButton = screen.getByLabelText('Next');
    fireEvent.click(nextButton);
    expect(handleChangePage).toHaveBeenCalledWith('next');
  });
});