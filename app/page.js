"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import HeroSection from "./_Components/clientSide/HeroSection";
import NewAndBestsellers from "./_Components/clientSide/NewAndBestsellers";
import PromotionalBanner from "./_Components/clientSide/PromotionalBanner";
import LimitedEdition from "./_Components/clientSide/LimitedEdition";
import Sale from "./_Components/clientSide/Sale";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        console.error("Erreur de chargement :", data.error);
      }
    } catch (err) {
      console.error("Erreur serveur :", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <NewAndBestsellers isLoading={isLoading} products={products} />
        <PromotionalBanner
          title="Vêtements pour ELLE"
          subtitle=""
          imageName="pourElle.webp"
          imageAlt="Femme habillée avec la nouvelle collection"
        />
        <LimitedEdition products={products} isLoading={isLoading} />
        <PromotionalBanner
          title="Soldes d'été -50% !"
          subtitle=""
          imageName="soldePicture.webp"
          imageAlt="Un couple avec des sacs d’achats devant une vitrine"
        />
        <Sale products={products} isLoading={isLoading} />
      </main>
    </div>
  );
}
