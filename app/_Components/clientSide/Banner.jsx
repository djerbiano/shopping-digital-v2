import styles from "../../page.module.css";
import Image from "next/image";

export default function Banner({ title, subtitle, buttonLabel, onClick, imageName, imageAlt, bannerRef }) {
  return (
    <section className={styles.banner} aria-label={`${title} - ${subtitle}`} ref={bannerRef}>
      <div className={styles.imageWrapper}>
        <Image
          src={`/${imageName}`}
          alt={imageAlt}
          fill
          priority
          fetchPriority="high"
          className={styles.bannerImage}
          sizes="(max-width: 767px) 100vw, 70vw"
        />
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
