import styles from "../../page.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <Link href="/mentions-legales" className={styles.btnMentionsLegales}>
          Mentions Légales
        </Link>
        <Link href="/politique-de-confidentialite" className={styles.btnPolitiqueConfidentialite}>
          Politique de Confidentialité
        </Link>
        <Link href="/conditions-generales-dutilisation" className={styles.btnCGU}>
          Conditions Générales d’utilisation
        </Link>
      </div>
      <p>
        &copy; Shopping <span>Digital</span> - {new Date().getFullYear()}
      </p>
    </footer>
  );
}
