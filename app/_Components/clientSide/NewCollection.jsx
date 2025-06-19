import styles from "../../page.module.css";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export default function NewCollection() {
  return (
    <section className={styles.newCollectionSection} aria-labelledby="nouvelle-collection">
      <div className={styles.sectionHeader}>
        <h2 id="nouvelle-collection" className={styles.sectionTitle}>
          Nouvelle Collection
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

      <div className={styles.productsContainerNewCollection}>
        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />
        <ProductCard title="Product 2" price="19.99" imageUrl="/nouvelle-collection.webp" status="new" />
        <ProductCard
          title="Product 3"
          price="39.99"
          imageUrl="/5b888fe3fe83065167bf0400d2001703393847545.webp"
          status="limited"
        />
      </div>
    </section>
  );
}
