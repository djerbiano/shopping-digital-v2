"use client";
import styles from "../../page.module.css";
import { useRouter } from "next/navigation";
import { MdHeadsetMic } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useMenuHamburger } from "../../context/menuHamburgerContext";

export default function LinkIconHeader({ icons }) {
  const { isMenuOpen, setIsMenuOpen, isDesktop } = useMenuHamburger();
  const router = useRouter();

  if (!isDesktop && !isMenuOpen) return null;
  return (
    <div className={styles.linkIconHeader} ref={icons}>
      <button
        type="button"
        aria-label="Contactez-nous"
        onClick={() => {
          router.push("/contact");
          setIsMenuOpen(false);
        }}
      >
        <MdHeadsetMic aria-hidden="true" focusable="false" />
      </button>

      <button
        type="button"
        aria-label="Panier"
        onClick={() => {
          router.push("/panier");
          setIsMenuOpen(false);
        }}
      >
        <BsFillCartCheckFill aria-hidden="true" focusable="false" />
      </button>
      <button
        type="button"
        aria-label="Favoris"
        onClick={() => {
          router.push("/favoris");
          setIsMenuOpen(false);
        }}
      >
        <MdFavorite aria-hidden="true" focusable="false" />
      </button>
      <button
        type="button"
        aria-label="Mon compte"
        onClick={() => {
          router.push("/connexion");
          setIsMenuOpen(false);
        }}
      >
        <FaUserAlt aria-hidden="true" focusable="false" />
      </button>
    </div>
  );
}
