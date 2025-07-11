import styles from "../../admin.module.css";
export default function Banner({ logo1, title, revenue, logo2, percentage, negative = false }) {
  return (
    <article aria-labelledby={`banner-${title}`} className={styles.banner}>
      <div className={styles.bannerLogo1} aria-hidden>
        {logo1}
      </div>
      <div className={styles.bannerContent}>
        <h4 id={`banner-${title}`}>{title}</h4>
        <p className={styles.revenue}>{revenue}</p>

        <p>
          <span className={`${styles.bannerLogo2} ${negative ? styles.negativePercentage : ""}`} aria-hidden>{logo2}</span>
          {percentage}
        </p>
      </div>
    </article>
  );
}
