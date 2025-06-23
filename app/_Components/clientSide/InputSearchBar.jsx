"use client";
import styles from "../../page.module.css";
import { IoIosSearch } from "react-icons/io";
import { useRef, useContext } from "react";
import { MenuHamburgerContext } from "../../context/menuHamburgerContext";
export default function InputSearchBar() {
  const { isMenuOpen, setIsMenuOpen, isDesktop } = useContext(MenuHamburgerContext);

  const inputRef = useRef(null);
  if (!isDesktop && !isMenuOpen) return null;
  const handleIconClick = () => {
    inputRef.current?.focus();
  };
  return (
    <div className={styles.inputSearchBarContainer}>
      <label htmlFor="search" className={styles.srOnly }>Rechercher un produit</label>
      <button onClick={handleIconClick} className={styles.searchIconWrapper} aria-label="Rechercher" type="button">
        <IoIosSearch aria-hidden="true" />
      </button>

      <input
        type="search"
        name="search"
        id="search"
        placeholder="Rechercher..."
        ref={inputRef}
        aria-label="Rechercher un produit"
      />
    </div>
  );
}
