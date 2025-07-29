"use client";
import styles from "../../page.module.css";
import Banner from "./Banner";
import { useRouter } from "next/navigation";
export default function PromotionalBanner({ title, subtitle, imageName, imageAlt }) {
  const router = useRouter();
 
  return (
    <div className={styles.promoBanner}>
      <Banner
        title={title}
        subtitle={subtitle}
        buttonLabel="Achetez dès maintenant"
        imageName={imageName}
        imageAlt={imageAlt}
        onClick={() => router.push("/produits")}
      />
    </div>
  );
}
