
"use client";
import styles from "../../page.module.css";
import { MdHeadsetMic } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useContext, useRef } from "react";
import { MenuHamburgerContext } from "../../context/menuHamburgerContext";

export default function LinkIconHeader({ icons }) {
  const { isMenuOpen, setIsMenuOpen, isDesktop } = useContext(MenuHamburgerContext);

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };
  if (!isDesktop && !isMenuOpen) return null;
  return (
    <div className={styles.linkIconHeader} ref={icons}>
      <button type="button" aria-label="Contactez-nous" onClick={handleMenuClick}>
        <MdHeadsetMic aria-hidden="true" />
      </button>

      <button type="button" aria-label="Panier" onClick={handleMenuClick}>
        <BsFillCartCheckFill aria-hidden="true" />
      </button>
      <button type="button" aria-label="Favoris" onClick={handleMenuClick}>
        <MdFavorite aria-hidden="true" />
      </button>
      <button type="button" aria-label="Mon compte" onClick={handleMenuClick}>
        <FaUserAlt aria-hidden="true" />
      </button>
    </div>
  );
}

