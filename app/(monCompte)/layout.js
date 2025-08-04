"use client";
import styles from "./myAccount.module.css";
import { useAuth } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import ClientOnly from "./_components/ClientOnly";
import NavBarMyAccount from "./_components/NavBarMyAccount";
import NavBarMyAccountSkeleton from "./_components/NavBarMyAccountSkeleton";
import Loading from "../loading";

export default function RootLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading || !isAuthenticated) {
    return <Loading />;
  }
  return (
    <UserProvider>
      <section className={styles.myAccountContainer} aria-labelledby="page-myAccount">
        <h2 id="page-myAccount" className={styles.srOnly}>
          Mon Compte
        </h2>

        <ClientOnly fallback={<NavBarMyAccountSkeleton />}>
          <NavBarMyAccount />
        </ClientOnly>
        {children}
      </section>
    </UserProvider>
  );
}
