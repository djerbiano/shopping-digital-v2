import styles from "../../page.module.css";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function BestSellers() {
  return (
    <section className={styles.bestSellersSection} aria-labelledby="top-ventes">
      <div className={styles.sectionHeader}>
        <h2 id="top-ventes" className={styles.sectionTitle}>
          Top Ventes
        </h2>
        <div className={styles.navigationControls}>
          <button aria-label="Voir les produits précédents" className={styles.navButton}>
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button aria-label="Voir les produits suivants" className={styles.navButton}>
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.productsContainerBestSellers}>
        <ProductCard title="Product 1" price="19.99" imageUrl="/nouvelle-collection.webp" status="limited" />
      </div>
    </section>
  );
}
