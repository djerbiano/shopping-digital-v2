import styles from "./productSkeleton.module.css";

export default function ProductSkeleton() {
  return (
    <article className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />

      <div className={styles.skeletonTitle}></div>

      <div className={styles.skeletonButton}></div>
    </article>
  );
}
