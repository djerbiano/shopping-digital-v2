"use client";
import { useEffect, useState } from "react";
import styles from "../../page.module.css";
import BestSellers from "./BestSellers";
import ProductShowcase from "./ProductShowcase";
import ProductSkeleton from "./loader/ProductSkeleton";

export default function NewAndBestsellers({ products }) {
  // const topSellers = products?.filter((product) => product?.isTopSeller === true);
  // const newCollection = products.filter((product) => product.isNewCollection === true);

  return (
    <article className={styles.newAndBestsellersSection} aria-labelledby="top-ventes-et-nouvelle-collection">
      <h2 id="top-ventes-et-nouvelle-collection" className={styles.srOnly}>
        Nouveautés et Best-Sellers
      </h2>
      <BestSellers products={products} />
      <ProductShowcase
        products={products}
        ariaLabelledby="nouvelle-collection-section"
        titleSection="Nouvelle Collection"
      />
    </article>
  );
}
