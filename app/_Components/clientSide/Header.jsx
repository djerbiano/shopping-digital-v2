"use client";
import styles from "../../page.module.css";
import { MenuHamburgerContext } from "../../context/menuHamburgerContext";
import { useContext, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavBar from "./NavBar";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(SplitText);

export default function Header() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuHamburgerContext);
  const [animStarted, setAnimStarted] = useState(false);
  const container = useRef();
  const router = useRouter();
  useGSAP(() => {
    if (container.current) {
      gsap.set(container.current, { opacity: 0 });

      const textElements = container.current.querySelectorAll("h1");

      let split = new SplitText(textElements, {
        type: "chars, words",
      });

      const tl = gsap.timeline({
        onStart: () => setAnimStarted(true),
      });

      tl.fromTo(container.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 });

      tl.fromTo(
        split.chars,
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: { amount: 0.5, from: "random" }, duration: 1 },
        "-=0.8"
      );
    }
  });
  return (
    <header
      className={`${styles.header} ${!animStarted ? styles.textHiddenBeforeAnim : ""}`}
      aria-label="En-tête principal du site"
      ref={container}
    >
      <div className={styles.iconHeader}>
        <button
          className={styles.burgerButton}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <GiHamburgerMenu aria-hidden="true" />
        </button>
        <h1
          className={!animStarted ? styles.textHiddenBeforeAnim : ""}
          onClick={() => router.push("/")}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              router.push("/");
            }
          }}
          role="button"
          aria-label="Retour à la page d'accueil"
        >
          Shopping <span>Digital</span>
        </h1>
      </div>
      <NavBar />
    </header>
  );
}
