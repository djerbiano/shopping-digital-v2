"use client";
import styles from "../../page.module.css";
import { useRouter } from "next/navigation";
import { MdHeadsetMic } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useContext, useRef } from "react";
import { MenuHamburgerContext } from "../../context/menuHamburgerContext";

export default function LinkIconHeader({ icons }) {
  const { isMenuOpen, setIsMenuOpen, isDesktop } = useContext(MenuHamburgerContext);
  const router = useRouter();

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = () => {};
  if (!isDesktop && !isMenuOpen) return null;
  return (
    <div className={styles.linkIconHeader} ref={icons}>
      <button
        type="button"
        aria-label="Contactez-nous"
        onClick={() => {
          handleMenuClick;
          router.push("/contact");
        }}
      >
        <MdHeadsetMic aria-hidden="true" focusable="false" />
      </button>

      <button type="button" aria-label="Panier" onClick={handleMenuClick}>
        <BsFillCartCheckFill aria-hidden="true" focusable="false" />
      </button>
      <button type="button" aria-label="Favoris" onClick={handleMenuClick}>
        <MdFavorite aria-hidden="true" focusable="false" />
      </button>
      <button type="button" aria-label="Mon compte" onClick={handleMenuClick}>
        <FaUserAlt aria-hidden="true" focusable="false" />
      </button>
    </div>
  );
}
