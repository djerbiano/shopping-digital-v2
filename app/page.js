"use client";

import HeroSection from "./_Components/clientSide/HeroSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
      </main>
      <footer></footer>
    </div>
  );
}
