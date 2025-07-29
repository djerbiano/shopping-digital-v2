import styles from "./SkeletonProductIdPage.module.css";

export default function ProductSkeleton() {
  return (
    <section className={styles.oneProduct} aria-labelledby="product-title">
      <div className={styles.productImage}>
        <div className={styles.imageSkeleton}></div>

        <div className={styles.thumbnails}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.thumbnailSkeleton}></div>
          ))}
        </div>
      </div>

      <div className={styles.productDetails}>
        <div className={styles.contentSkeleton}></div>
      </div>
    </section>
  );
}
