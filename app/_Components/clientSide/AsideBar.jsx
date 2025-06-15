"use client";
import styles from "../../page.module.css";
import { GiClothes } from "react-icons/gi";
import { FaComputer } from "react-icons/fa6";
import { MdOutlinePersonalVideo } from "react-icons/md";
import { GiVibratingSmartphone } from "react-icons/gi";
import { useContext } from "react";
import { MenuHamburgerContext } from "../../context/menuHamburgerContext";
export default function AsideBar({asideRef}) {
  const { isDesktop } = useContext(MenuHamburgerContext);

  return (
    <aside className={styles.asideBar} ref={asideRef}>
      <button type="button" aria-label="Femme" aria-hidden={!isDesktop}>
        <GiClothes /> Femme
      </button>
      <button type="button" aria-label="Homme" aria-hidden={!isDesktop}>
        <GiClothes /> Homme
      </button>
      <button type="button" aria-label="Informatique" aria-hidden={!isDesktop}>
        <FaComputer /> Informatique
      </button>
      <button type="button" aria-label="TV - Audio - Video" aria-hidden={!isDesktop}>
        <MdOutlinePersonalVideo /> TV - Audio - Video
      </button>
      <button type="button" aria-label="Smartphones" aria-hidden={!isDesktop}>
        <GiVibratingSmartphone /> Smartphones
      </button>
    </aside>
  );
}
