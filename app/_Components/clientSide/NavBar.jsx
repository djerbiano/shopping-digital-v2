"use client";
import styles from "../../page.module.css";
import InputSearchBar from "./InputSearchBar";
import LinkIconHeader from "./LinkIconHeader";
import { useRef } from "react";
import { useMenuHamburger } from "../../context/menuHamburgerContext";
import { useFilterProducts } from "../../context/filterProductsContext";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export default function NavBar() {
  const router = useRouter();
  const { isMenuOpen, setIsMenuOpen, isDesktop } = useMenuHamburger();
  const { setCategories } = useFilterProducts();
  const container = useRef(null);
  const buttonsRef = useRef([]);
  const icons = useRef(null);
  buttonsRef.current = [];

  const navItems = [
    { label: "Accueil", category: null },
    { label: "Femme", category: { Femme: true } },
    { label: "Homme", category: { Homme: true } },
    { label: "Informatique", category: { Informatique: true } },
    { label: "TV - Audio - Video", category: { TvSon: true } },
    { label: "Smartphones", category: { Téléphonie: true } },
  ];

  const addToRefs = (el) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el);
    }
  };

  /*handle nav click */
  const resetCategories = {
    Homme: false,
    Femme: false,
    Informatique: false,
    TvSon: false,
    Téléphonie: false,
  };
  const handleNavClick = (category) => {
   

    setCategories({
      ...resetCategories,
      ...(category || {}),
    });

    router.push(category ? "/produits" : "/");
  };
  /* GSAP animation */
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
  }, [isMenuOpen]);

  return (
    <nav
      className={`${styles.navHeader} ${styles.navMobile} ${isMenuOpen ? styles.open : ""} `}
      aria-label="Navigation principale"
      ref={container}
      onClick={() => setIsMenuOpen(false)}
    >
      <InputSearchBar />
      {isMenuOpen && (
        <div className={styles.navLinksMobile}>
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              onClick={() => handleNavClick(item.category)}
              ref={addToRefs}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
      <LinkIconHeader icons={icons} />
    </nav>
  );
}
