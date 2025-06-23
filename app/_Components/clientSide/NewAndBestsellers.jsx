import styles from "../../page.module.css";
import BestSellers from "./BestSellers";
import ProductShowcase from "./ProductShowcase";

export default function NewAndBestsellers() {
  return (
    <article className={styles.newAndBestsellersSection} aria-labelledby="top-ventes-et-nouvelle-collection">
      <h2 id="top-ventes-et-nouvelle-collection" className={styles.srOnly}>
        Nouveautés et Best-Sellers
      </h2>
      <BestSellers />
      <ProductShowcase ariaLabelledby="nouvelle-collection-section" titleSection="Nouvelle Collection" />
    </article>
  );
}
