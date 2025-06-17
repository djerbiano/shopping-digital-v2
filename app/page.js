"use client";

import HeroSection from "./_Components/clientSide/HeroSection";
import NewAndBestsellers from "./_Components/clientSide/NewAndBestsellers";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <NewAndBestsellers />
      </main>
      <footer></footer>
    </div>
  );
}
