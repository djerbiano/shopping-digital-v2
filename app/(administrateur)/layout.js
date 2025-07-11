import styles from "./admin.module.css";
import NavBarAdmin from "./_components/NavBarAdmin";

export default function RootLayout({ children }) {
  return (
    <section className={styles.myAccountContainer} aria-labelledby="page-myAccount">
      <h2 id="page-myAccount" className={styles.srOnly}>
        Mon Compte
      </h2>
      <NavBarAdmin />
      {children}
    </section>
  );
}
