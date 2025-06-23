import styles from "./page.module.css";
import HeroSection from "./_Components/clientSide/HeroSection";
import NewAndBestsellers from "./_Components/clientSide/NewAndBestsellers";
import PromotionalBanner from "./_Components/clientSide/PromotionalBanner";
import LimitedEdition from "./_Components/clientSide/LimitedEdition";
import Sale from "./_Components/clientSide/Sale";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <NewAndBestsellers />
        <PromotionalBanner
          title="Vêtements pour ELLE"
          subtitle=""
          imageName="pourElle.webp"
          imageAlt="Femme habillée avec la nouvelle collection"
        />
        <LimitedEdition />
        <PromotionalBanner
          title="Soldes d'été -50% !"
          subtitle=""
          imageName="soldePicture.webp"
          imageAlt="Un couple avec des sacs d’achats devant une vitrine"
        />
        <Sale />
      </main>
    </div>
  );
}
