import styles from "../../page.module.css";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductSkeleton from "./loader/ProductSkeleton";

export default function BestSellers({ products, currentSlide, setCurrentSlide, isLoading }) {
  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % products.length);
  };
  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + products.length) % products.length);
  };

 if (isLoading || !products.length) return <ProductSkeleton />;
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
