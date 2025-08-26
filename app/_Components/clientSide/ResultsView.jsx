"use client";
import styles from "../../page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function ResultsView({ search, setInputValue, inputRef ,setIsMenuOpen}) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const minSearchLength = 2;
  const fetchProducts = async () => {
    if (search.length < minSearchLength) return;
    setErrorMessage("");
    setIsLoading(true);

    try {
      const params = new URLSearchParams();

      // filter by search
      if (search) params.append("search", search);

      // filter by page
      params.append("page", page);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      } else {
        setErrorMessage(data.message || "Erreur inconnue");
      }
    } catch (err) {
      setErrorMessage("Erreur serveur");
      console.error("Erreur serveur :", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (search.length < minSearchLength) {
      setProducts([]);
      return;
    }

    const timeoutId = setTimeout(fetchProducts, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, page]);

  const handlNextPage = (e) => {
    e.preventDefault();
    setPage((prevPage) => prevPage + 1);
    setIsMenuOpen(false);
  };

  const handlProductClick = (productId) => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
    router.push(`/produits/${productId}`);
    setIsMenuOpen(false);
    setInputValue("");
  };

  return (
    <div className={styles.searchContent}>
      <div className={styles.items}>
        {isLoading ? (
          <div className={styles.loading}>Chargement...</div>
        ) : errorMessage ? (
          <p style={{ textAlign: "center", fontSize: "14px", marginBottom: "10px", marginTop: "20px" }}>
            {errorMessage}
          </p>
        ) : products?.products?.length >= 1 ? (
          <>
            {products?.products?.map((product) => (
              <button
                key={product._id}
                className={styles.item}
                title={product.title}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handlProductClick(product._id);
                }}
              >
                {product.title}
              </button>
            ))}

            {products?.pagination?.totalPages > 1 && (
              <button className={styles.moreResultsButton} onMouseDown={(e) => handlNextPage(e)}>
                Plus de produits
              </button>
            )}
          </>
        ) : search.length >= minSearchLength ? (
          <p style={{ textAlign: "center", fontSize: "14px", marginBottom: "10px", marginTop: "20px" }}>
            Aucun produit trouvé
          </p>
        ) : (
          <p style={{ textAlign: "center", fontSize: "14px", marginBottom: "10px", marginTop: "20px" }}>
            {minSearchLength} caractères minimum
          </p>
        )}
      </div>
    </div>
  );
}
