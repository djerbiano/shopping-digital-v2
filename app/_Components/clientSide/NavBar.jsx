import styles from "../../page.module.css";
import InputSearchBar from "./InputSearchBar";
import LinkIconHeader from "./LinkIconHeader";
import { useContext } from "react";
import { MenuHamburgerContext } from "../../context/menuHamburgerContext";
export default function NavBar() {
    const { isMenuOpen, setIsMenuOpen } = useContext(MenuHamburgerContext);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      role="navigation"
      aria-label="Navigation principale"
      className={`${styles.navHeader} ${styles.navMobile} ${isMenuOpen ? styles.open : ""} `}
    >
      <InputSearchBar />
      {isMenuOpen && (
        <div className={styles.navLinksMobile}>
          <button type="button" aria-label="Accueil" onClick={handleMenuClick}>
            Accueil
          </button>
          <button type="button" aria-label="Produits" onClick={handleMenuClick}>
            Produits
          </button>
          <button type="button" aria-label="Femme" onClick={handleMenuClick}>
            Femme
          </button>
          <button type="button" aria-label="Homme" onClick={handleMenuClick}>
            Homme
          </button>
          <button type="button" aria-label="Informatique" onClick={handleMenuClick}>
            Informatique
          </button>
          <button type="button" aria-label="TV - Audio - Video" onClick={handleMenuClick}>
            TV - Audio - Video
          </button>
          <button type="button" aria-label="Smartphones" onClick={handleMenuClick}>
            Smartphones
          </button>
        </div>
      )}
      <LinkIconHeader />
    </nav>
  );
}
