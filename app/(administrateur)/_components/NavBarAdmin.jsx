"use client";
import styles from "../admin.module.css";
import { usePathname, useRouter } from "next/navigation";
export default function NavBarAdmin() {
  const router = useRouter();
  const pathname = usePathname();
  const buttons = [
    { text: "Dashboard", path: "/admin" },
    { text: "Utilisateurs", path: "/admin/users" },
    { text: "Produits", path: "/admin/products" },
    { text: "Suivis", path: "/admin/trackings" },
    { text: "Commandes", path: "/admin/orders" },
    { text: "Réclamations", path: "/admin/claims" },
  ];
  return (
    <aside aria-label="Navigation de l'administrateur" className={styles.navBarAdmin}>
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
