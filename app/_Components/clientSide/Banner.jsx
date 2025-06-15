import styles from "../../page.module.css";
import Image from "next/image";

export default function Banner({ title, subtitle, buttonLabel, onClick, imageName, imageAlt }) {
  return (
    <section className={styles.banner} role="region" aria-label={`${title} - ${subtitle}`}>
      <div className={styles.imageWrapper}>
        <Image src={`/${imageName}`} alt={imageAlt} fill priority  fetchPriority="high" className={styles.bannerImage} />
      </div>
      <div className={styles.bannerContent}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <button type="button" onClick={onClick} aria-label={buttonLabel}>
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}


