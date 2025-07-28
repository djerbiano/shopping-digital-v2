"use client";
import { useEffect, useState } from "react";
import styles from "../../page.module.css";
import BestSellers from "./BestSellers";
import ProductShowcase from "./ProductShowcase";
import ProductSkeleton from "./loader/ProductSkeleton";

export default function NewAndBestsellers() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        console.error("Erreur de chargement :", data.error);
      }
    } catch (err) {
      console.error("Erreur serveur :", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const topSellers = products.filter((product) => product.isTopSeller === true);
  // const newCollection = products.filter((product) => product.isNewCollection === true);
  const newCollection = products;

  return (
    <article className={styles.newAndBestsellersSection} aria-labelledby="top-ventes-et-nouvelle-collection">
      <h2 id="top-ventes-et-nouvelle-collection" className={styles.srOnly}>
        Nouveautés et Best-Sellers
      </h2>
      <BestSellers
        products={topSellers}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        isLoading={isLoading}
      />
      <ProductShowcase
        products={newCollection}
        isLoading={isLoading}
        ariaLabelledby="nouvelle-collection-section"
        titleSection="Nouvelle Collection"
      />
    </article>
  );
}
