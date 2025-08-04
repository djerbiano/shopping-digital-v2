"use client";
import ProductShowcase from "./ProductShowcase";

import styles from "../../page.module.css";

export default function LimitedEdition({ products }) {
  return (
    <div className={styles.limitedEditionContainer}>
      <ProductShowcase ariaLabelledby="limited-edition-section" titleSection="Edition Limitée" products={products} />
    </div>
  );
}
