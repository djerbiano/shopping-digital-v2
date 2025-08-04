"use client";
import styles from "../myAccount.module.css";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "../../context/AuthContext";
export default function NavBarMyAccount() {
  const { setIsAuthenticated, setLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
      setIsAuthenticated(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const buttons = [
    { text: "Mon compte", path: "/mon-compte" },
    { text: "Mes commandes", path: "/mon-compte/commandes" },
    { text: "Réclamations", path: "/mon-compte/reclamations" },
    { text: "Se déconnecter", action: handleLogout },
  ];
  return (
    <aside aria-label="Navigation de mon compte" className={styles.navBarMyAccount}>
      {buttons.map((button) => (
        <button
          key={button.path || "logout"}
          onClick={() => (button.action ? button.action() : router.push(button.path))}
          className={pathname === button.path ? styles.active : ""}
          aria-current={pathname === button.path ? "page" : undefined}
        >
          {button.text}
        </button>
      ))}
    </aside>
  );
}
