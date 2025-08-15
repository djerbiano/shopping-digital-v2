"use client";
import styles from "../page.module.css";
import ProductCard from "../_Components/clientSide/ProductCard";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Loading from "../loading";
export default function Favoris() {
  const { isAuthenticated, loading, refreshProductsInFavorites, productsInFavorites } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refreshProductsInFavorites();
    }
  }, [isAuthenticated]);

  if (loading) return <Loading />;
  return (
    <>
      {!isAuthenticated ? (
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            padding: "20px",
          }}
        >
          <p>Veuillez vous connecter pour voir vos produits favoris</p>
        </div>
      ) : (
        <>
          <section className={styles.favorisContainer} aria-labelledby="favoris">
            <h2 id="favoris">Vos produits favoris</h2>
            {productsInFavorites.length <= 0 ? (
              <p>Aucun produit dans vos favoris</p>
            ) : (
              <div className={styles.favorisContent}>
                {productsInFavorites?.map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}
