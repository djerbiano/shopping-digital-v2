"use client";
import styles from "../../page.module.css";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function BestSellers({ products }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
  };
  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + products.length) % products.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);



  if (!products.length) return;
  return (
    <section className={styles.bestSellersSection} aria-labelledby="top-ventes">
      <div className={styles.sectionHeader}>
        <h2 id="top-ventes" className={styles.sectionTitle}>
          Top Ventes
        </h2>
        <div className={styles.navigationControls}>
          <button aria-label="Voir les produits précédents" className={styles.navButton} onClick={handlePrevSlide}>
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button aria-label="Voir les produits suivants" className={styles.navButton} onClick={handleNextSlide}>
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.productsContainerBestSellers}>
        <ProductCard product={products[currentSlide]} />
      </div>
    </section>
  );
}
