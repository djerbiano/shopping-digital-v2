"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Error({ error, reset }) {
  const router = useRouter();
  return (
    <section className={styles.notFoundPage}>
      <h2>Une erreur est survenue</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Réessayer de nouveau</button>
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
