"use client";

import styles from "../../page.module.css";
import HeroSection from "./HeroSection";
import NewAndBestsellers from "./NewAndBestsellers";
import PromotionalBanner from "./PromotionalBanner";
import LimitedEdition from "./LimitedEdition";
import Sale from "./Sale";

export default function HomeClient({ products }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <NewAndBestsellers products={products} />
        <PromotionalBanner
          title="Vêtements pour ELLE"
          subtitle=""
          imageName="pourElle.webp"
          imageAlt="Femme habillée avec la nouvelle collection"
        />
        <LimitedEdition products={products} />
        <PromotionalBanner
          title="Soldes d'été -50% !"
          subtitle=""
          imageName="soldePicture.webp"
          imageAlt="Un couple avec des sacs d’achats devant une vitrine"
        />
        <Sale products={products} />
      </main>
    </div>
  );
}
