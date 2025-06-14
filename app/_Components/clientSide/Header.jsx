"use client";
import styles from "../../page.module.css";
import { MenuHamburgerContext } from "../../context/menuHamburgerContext";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavBar from "./NavBar";
export default function Header() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuHamburgerContext);
  return (
    <header role="banner" aria-label="En-tête principal du site" className={styles.header}>
      <div className={styles.iconHeader}>
        <button
          className={styles.burgerButton}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <GiHamburgerMenu aria-hidden="true" />
        </button>
        <h1>
          Shopping <span>Digital</span>
        </h1>
      </div>
      <NavBar />
    </header>
  );
}
