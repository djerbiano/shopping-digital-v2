import styles from "./page.module.css";

export default function Loading() {
  
  return (
    <div className={styles.loadingBackground}>
      <div className={styles.spinner} role="status" aria-label="Loading"></div>
    </div>
  );
}
