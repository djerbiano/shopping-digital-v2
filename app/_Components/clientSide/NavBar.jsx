import styles from "../../page.module.css";
import InputSearchBar from "./InputSearchBar";
import LinkIconHeader from "./LinkIconHeader";
import { useContext, useRef } from "react";
import { MenuHamburgerContext } from "../../context/menuHamburgerContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export default function NavBar() {
  const { isMenuOpen, setIsMenuOpen, isDesktop } = useContext(MenuHamburgerContext);
  const container = useRef(null);
  const buttonsRef = useRef([]);
  const icons = useRef(null);
  buttonsRef.current = [];
  const addToRefs = (el) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el);
    }
  };
  useGSAP(() => {
    const tl = gsap.timeline();
    // nav container animation
    if (container.current && isDesktop) {
      tl.fromTo(container.current, { y: 5, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, "+=0.8");
    }
    // nav buttons burger menu animation
    if (!isDesktop && isMenuOpen && buttonsRef.current.length) {
      tl.fromTo(
        buttonsRef.current,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
    // nav icons animation
    if (icons.current) {
      const iconButtons = icons.current.querySelectorAll("button");
      tl.fromTo(
        iconButtons,
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.3 },
        "-=0.8"
      );
    }
  }, [isDesktop, isMenuOpen]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      role="navigation"
      aria-label="Navigation principale"
      className={`${styles.navHeader} ${styles.navMobile} ${isMenuOpen ? styles.open : ""} `}
      ref={container}
    >
      <InputSearchBar />
      {isMenuOpen && (
        <div className={styles.navLinksMobile}>
          {["Accueil", "Femme", "Homme", "Informatique", "TV - Audio - Video", "Smartphones"].map(
            (label) => (
              <button key={label} type="button" aria-label={label} onClick={handleMenuClick} ref={addToRefs}>
                {label}
              </button>
            )
          )}
        </div>
      )}
      <LinkIconHeader icons={icons} />
    </nav>
  );
}
