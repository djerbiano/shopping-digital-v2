import styles from "./admin.module.css";
import NavBarAdmin from "./_components/NavBarAdmin";

export default function RootLayout({ children }) {
  return (
    <section className={styles.adminContainer} aria-labelledby="page-admin">
      <h2 id="page-admin" className={styles.srOnly}>
        Administrateur
      </h2>
      <NavBarAdmin />
      {children}
    </section>
  );
}
