"use client";
import styles from "../../page.module.css";
import InputSearchBar from "./InputSearchBar";
import LinkIconHeader from "./LinkIconHeader";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header role="banner" aria-label="En-tête principal du site" className={styles.header}>
      <div className={styles.iconHeader}>
        <button className={styles.burgerButton} aria-label="Menu"  aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <GiHamburgerMenu aria-hidden="true" />
        </button>
        <h1>
          Shopping <span>Digital</span>
        </h1>
      </div>
      <nav role="navigation" aria-label="Navigation principale" className={styles.navHeader}>
        <InputSearchBar />
        <LinkIconHeader />
      </nav>
    </header>
  );
}
