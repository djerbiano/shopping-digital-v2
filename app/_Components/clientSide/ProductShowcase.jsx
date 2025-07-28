"use client";
import { useEffect, useState } from "react";
import styles from "../../page.module.css";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductSkeleton from "./loader/ProductSkeleton";

export default function ProductShowcase({ ariaLabelledby, titleSection, products, isLoading }) {
  const [itemsToShow, setItemsToShow] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width <= 425) setItemsToShow(1);
      else if (width <= 767.98) setItemsToShow(2);
      else setItemsToShow(3);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //réinitialise la page si le nombre d’items à afficher change pour éviter overflow
  useEffect(() => {
    setCurrentPage(0);
  }, [itemsToShow]);

  const totalPages = Math.ceil(products.length / itemsToShow);

  const startIndex = currentPage * itemsToShow;
  const productsToShow = products?.slice(startIndex, startIndex + itemsToShow);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  if (isLoading || !products.length) return <ProductSkeleton />;

  return (
    <section className={styles.productShowcase} aria-labelledby={ariaLabelledby}>
      <div className={styles.sectionHeader}>
        <h2 id={ariaLabelledby} className={styles.sectionTitle}>
          {titleSection}
        </h2>
        <div className={styles.navigationControls}>
          <button aria-label="Voir les produits précédents" className={styles.navButton} onClick={handlePrev}>
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button aria-label="Voir les produits suivants" className={styles.navButton} onClick={handleNext}>
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.productShowcaseContent}>
        {productsToShow.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
