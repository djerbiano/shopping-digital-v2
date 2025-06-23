"use client";
import styles from "../../page.module.css";
import AsideBar from "./AsideBar";
import Banner from "./Banner";
import { useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(SplitText);
export default function HeroSection() {
  const [animStarted, setAnimStarted] = useState(false);
  const container = useRef();
  const asideRef = useRef();
  const bannerRef = useRef();
  useGSAP(() => {
    document.fonts.ready.then(() => {
      if (container.current) {
        gsap.set(container.current, { opacity: 0 });

        const textElements = container.current.querySelectorAll(" button, h2, h3");
        const icons = container.current.querySelectorAll("svg");
        const split = new SplitText(textElements, { type: "words" });

        const tl = gsap.timeline({
          onStart: () => setAnimStarted(true),
        });

        tl.fromTo(container.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });

        if (asideRef.current) {
          tl.fromTo(
            asideRef.current,
            { x: -150, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
            "+=0.2"
          );
        }

        if (bannerRef.current) {
          tl.fromTo(
            bannerRef.current,
            { x: 200, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 1.2, ease: "power2.out" },
            "-=0.8"
          );
        }

        tl.fromTo(
          split.words,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: { amount: 0.6, from: "center" }, duration: 0.8 },
          "-=0.5"
        );

        tl.fromTo(
          icons,
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, stagger: 0.1, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.5"
        );
      }
    });
  });

  return (
    <article
      className={`${styles.heroSection} ${!animStarted ? styles.textHiddenBeforeAnim : ""}`}
      aria-labelledby="nouvelle-collection"
      ref={container}
    >
      <h2 className={styles.srOnly} id="nouvelle-collection">
        La nouvelle collection
      </h2>
      <AsideBar asideRef={asideRef} />
      <Banner
        bannerRef={bannerRef}
        title="Explorer la derrnière tendance"
        subtitle="Découvrez notre toute nouvelle collection"
        buttonLabel="Achetez dès maintenant"
        imageName="nouvelle-collection.webp"
        imageAlt="Homme habilé avec la nouvelle collection"
        onClick={() => console.log("Bannière cliquée")}
      />
    </article>
  );
}
