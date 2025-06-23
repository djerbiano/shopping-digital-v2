"use client";
import styles from "../../page.module.css";
import { GiClothes } from "react-icons/gi";
import { FaComputer } from "react-icons/fa6";
import { MdOutlinePersonalVideo } from "react-icons/md";
import { GiVibratingSmartphone } from "react-icons/gi";
import { useContext } from "react";
import { MenuHamburgerContext } from "../../context/menuHamburgerContext";
export default function AsideBar({ asideRef }) {
  const { isDesktop } = useContext(MenuHamburgerContext);

  return (
    <aside className={styles.asideBar} aria-label="Catégories de produits" ref={asideRef}>
      <button type="button" aria-hidden={!isDesktop}>
        <GiClothes aria-hidden="true" focusable="false" /> Femme
      </button>
      <button type="button" aria-hidden={!isDesktop}>
        <GiClothes aria-hidden="true" focusable="false" /> Homme
      </button>
      <button type="button" aria-hidden={!isDesktop}>
        <FaComputer aria-hidden="true" focusable="false" /> Informatique
      </button>
      <button type="button" aria-hidden={!isDesktop}>
        <MdOutlinePersonalVideo aria-hidden="true" focusable="false" /> TV - Audio - Video
      </button>
      <button type="button" aria-hidden={!isDesktop}>
        <GiVibratingSmartphone aria-hidden="true" focusable="false" /> Smartphones
      </button>
    </aside>
  );
}
