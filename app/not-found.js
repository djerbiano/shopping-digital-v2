"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
export default function NotFound() {
  const router = useRouter();
  return (
    <section className={styles.notFoundPage}>
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n&#39;existe pas.</p>
      <Link
        href="/"
        onClick={(e) => {
          e.preventDefault();
          router.replace("/");
        }}
        aria-label="Retournez à la page d'accueil"
      >
        Retournez à la page d&#39;accueil
      </Link>
    </section>
  );
}
