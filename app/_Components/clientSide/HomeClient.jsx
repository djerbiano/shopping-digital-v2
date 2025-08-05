"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "../../page.module.css";
import HeroSection from "./HeroSection";
import NewAndBestsellers from "./NewAndBestsellers";
import PromotionalBanner from "./PromotionalBanner";
import LimitedEdition from "./LimitedEdition";
import Sale from "./Sale";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function HomeClient({ products }) {
  const { refreshAuth } = useAuth();
  const searchParams = useSearchParams();
  const expired = searchParams.get("expired");

  useEffect(() => {
    if (expired === "true") {
      toast.error("Votre session a expiré, veuillez vous reconnecter.");
       refreshAuth();
    }
  }, [expired]);
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
