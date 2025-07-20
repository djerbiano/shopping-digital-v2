import styles from "../../admin.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPages = () => {
    if (totalPages <= 4) return Array.from({ length: totalPages }, (_, index) => index + 1);

    const pages = [];

    pages.push(1);

    if (currentPage <= 2) {
      pages.push(2, 3, "…");
    } else if (currentPage >= totalPages - 1) {
      pages.push("…", totalPages - 2, totalPages - 1);
    } else {
      pages.push("…", currentPage, currentPage + 1, "…");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();
  return (
    <div className={styles.pagination} role="group" aria-label="Pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Page précédente">
        Précédent
      </button>

      {pages.map((page, index) =>
        page === "…" ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={`page-${page}`}
            className={page === currentPage ? styles.active : ""}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

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
