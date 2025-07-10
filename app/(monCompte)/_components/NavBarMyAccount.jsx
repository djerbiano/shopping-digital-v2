"use client";
import styles from "../myAccount.module.css";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
export default function NavBarMyAccount() {
  const router = useRouter();
  const pathname = usePathname();
  const buttons = [
    { text: "Mon compte", path: "/mon-compte" },
    { text: "Mes commandes", path: "/mon-compte/commandes" },
    { text: "Réclamations", path: "/mon-compte/reclamations" },
  ];
  return (
    <aside aria-label="Navigation de mon compte" className={styles.navBarMyAccount}>
      {buttons.map((button) => (
        <button
          key={button.path}
          onClick={() => router.push(button.path)}
          className={pathname === button.path ? styles.active : ""}
          aria-current={pathname === button.path ? "page" : undefined}
        >
          {button.text}
        </button>
      ))}
    </aside>
  );
}
