import styles from "../myAccount.module.css";

export default function ProfileSkeleton() {
  return (
    <section aria-labelledby="section-myAccount" className={styles.myAccountContent}>
      <h3 id="section-myAccount" className={styles.skeletonTitle}></h3>

      <div className={styles.skeletonLine} style={{ width: "60%" }}></div>
      <div className={styles.skeletonLine} style={{ width: "50%" }}></div>
      <div className={styles.skeletonLine} style={{ width: "80%" }}></div>
      <div className={styles.skeletonLine} style={{ width: "40%" }}></div>
      <div className={styles.skeletonLine} style={{ width: "70%" }}></div>

      <div className={styles.skeletonButton}></div>
    </section>
  );
}
