"use client";
import styles from "../../page.module.css";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRef } from "react";
import { useMenuHamburger } from "../../context/menuHamburgerContext";
import ResultsView from "./ResultsView";
export default function InputSearchBar() {
  const { isMenuOpen, setIsMenuOpen, isDesktop } = useMenuHamburger();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  if (!isDesktop && !isMenuOpen) return null;

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.inputSearchBarContainer}>
      <label htmlFor="search" className={styles.srOnly}>
        Rechercher un produit
      </label>
      <button onClick={handleIconClick} className={styles.searchIconWrapper} aria-label="Rechercher" type="button">
        <IoIosSearch aria-hidden="true" />
      </button>

      <input
        autoComplete="off"
        type="search"
        name="search"
        id="search"
        placeholder="Rechercher..."
        ref={inputRef}
        value={inputValue}
        aria-label="Rechercher un produit"
        onChange={(e) => setInputValue(e.target.value)}
      />

      {inputValue.length >= 2 && <ResultsView search={inputValue} setInputValue={setInputValue} inputRef={inputRef} />}
    </div>
  );
}
