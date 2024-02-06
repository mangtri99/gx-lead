import './Pagination.style.scss';

interface Props {
  currentPage: number;
  lastPage: number;
  handleChangePage: (page: string) => void;
}

export default function Pagination(props: Props) {
  const { currentPage, lastPage, handleChangePage } = props;

  const getPaginationLinks = () => {
    const maxLinks = 5;
    const links = [];

    // Calculate the starting point for the links
    const start = Math.max(1, Math.min(currentPage - Math.floor(maxLinks / 2), lastPage - maxLinks + 1));

    // Generate the links
    for (let i = 0; i < maxLinks && start + i <= lastPage; i++) {
      links.push(start + i);
    }

    return links;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="pagination-item">
          <button
            disabled={currentPage === 1}
            className="pagination-link"
            aria-label="Previous"
            onClick={() => handleChangePage("prev")}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {getPaginationLinks().map((page) => (
          <li
            key={page}
            className='pagination-item'
          >
            <button
              className={`pagination-link ${currentPage === page ? "active" : ""}`}
              onClick={() => handleChangePage(String(page))}
            >
              {page}
            </button>
          </li>
        ))}

        <li className="pagination-item">
          <button
            disabled={currentPage === lastPage}
            className="pagination-link"
            aria-label="Next"
            onClick={() => handleChangePage("next")}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
