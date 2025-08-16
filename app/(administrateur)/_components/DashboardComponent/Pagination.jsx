import styles from "../../admin.module.css";

export default function Pagination({ pagination, currentPage, onPageChange }) {
  const totalPages = Number(pagination?.totalPages) || 0;
  const apiCurrent = Number(pagination?.currentPage) || 1;

  const activePage = Number.isInteger(currentPage) ? currentPage : apiCurrent;

  const getPages = () => {
    if (!totalPages) return [];
    if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [1];
    if (activePage <= 2) {
      pages.push(2, 3, "…");
    } else if (activePage >= totalPages - 1) {
      pages.push("…", totalPages - 2, totalPages - 1);
    } else {
      pages.push("…", activePage - 1, activePage, activePage + 1, "…");
    }
    pages.push(totalPages);
    return pages;
  };

  const pages = getPages();

  return (
    <div className={styles.pagination} role="group" aria-label="Pagination">
      <button onClick={() => onPageChange(activePage - 1)} disabled={activePage === 1} aria-label="Page précédente">
        Précédent
      </button>

      {pages.map((page, i) =>
        page === "…" ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={`page-${page}`}
            className={page === activePage ? styles.active : ""}
            onClick={() => onPageChange(page)}
            aria-current={page === activePage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(activePage + 1)}
        disabled={activePage === totalPages}
        aria-label="Page suivante"
      >
        Suivant
      </button>
    </div>
  );
}
