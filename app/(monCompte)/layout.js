import styles from "./myAccount.module.css";
import ClientOnly from "./_components/ClientOnly";
import NavBarMyAccount from "./_components/NavBarMyAccount";
import NavBarMyAccountSkeleton from "./_components/NavBarMyAccountSkeleton";

export default function RootLayout({ children }) {
  return (
    <section className={styles.myAccountContainer} aria-labelledby="page-myAccount">
      <h2 id="page-myAccount" className={styles.srOnly}>
        Mon Compte
      </h2>

      <ClientOnly fallback={<NavBarMyAccountSkeleton />}>
        <NavBarMyAccount />
      </ClientOnly>
      {children}
    </section>
  );
}
