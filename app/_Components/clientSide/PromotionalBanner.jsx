"use client";
import styles from "../../page.module.css";
import Banner from "./Banner";
export default function PromotionalBanner({ title, subtitle, imageName, imageAlt }) {
 
  return (
    <div className={styles.promoBanner}>
      <Banner
        title={title}
        subtitle={subtitle}
        buttonLabel="Achetez dès maintenant"
        imageName={imageName}
        imageAlt={imageAlt}
        onClick={() => console.log("Bannière cliquée")}
      />
    </div>
  );
}
