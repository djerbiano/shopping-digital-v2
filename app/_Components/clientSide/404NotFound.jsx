"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css";
export default function NotFound({ message }) {
  const router = useRouter();
  return (
    <section className={styles.notFoundPage}>
      <h1>Oups !</h1>
      <p>Une erreur s&#39;est produite.</p>
      <p>{message}</p>
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
