import styles from "../../admin.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPages = () => {
    const pages = [];

    if (totalPages === 1) {
      pages.push(1);
    } else if (totalPages === 2) {
      pages.push(1, 2);
    } else {
      pages.push(1);

      if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(currentPage);
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className={styles.pagination} role="group" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Page précédente"
      >
        Précédent
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? styles.active : ""}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Aller à la page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Page suivante"
      >
        Suivant
      </button>
    </div>
  );
}
