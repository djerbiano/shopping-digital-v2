"use client";
import styles from "../../page.module.css";
import { useMenuHamburger } from "../../context/menuHamburgerContext";
import { useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import { BsFillCartCheckFill } from "react-icons/bs";
import NavBar from "./NavBar";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(SplitText);

export default function Header() {
  const { isMenuOpen, setIsMenuOpen } = useMenuHamburger();
  const [animStarted, setAnimStarted] = useState(false);
  const container = useRef();
  const router = useRouter();
  useGSAP(() => {
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
          {isMenuOpen ? (
            <RiCloseLargeLine aria-hidden="true" focusable="false" />
          ) : (
            <GiHamburgerMenu aria-hidden="true" focusable="false" />
          )}
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
        >
          Shopping <span>Digital</span>
        </h1>
        <button
          type="button"
          aria-label="Panier"
          className={styles.secondCartButton}
          onClick={() => {
            router.push("/panier");
          }}
        >
          <BsFillCartCheckFill aria-hidden="true" focusable="false" />
        </button>
      </div>
      <NavBar />
    </header>
  );
}
