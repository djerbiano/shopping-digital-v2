"use client";
import styles from "../../page.module.css";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./loader/ProductSkeleton";
export default function Sale({ products }) {
  return (
    <div className={styles.saleContainer}>
      {!products.length ? (
        <ProductSkeleton />
      ) : (
        products.map((product) => <ProductCard key={product._id} product={product} />)
      )}
    </div>
  );
}
