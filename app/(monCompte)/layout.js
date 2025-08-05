"use client";
import styles from "./myAccount.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import ClientOnly from "./_components/ClientOnly";
import NavBarMyAccount from "./_components/NavBarMyAccount";
import NavBarMyAccountSkeleton from "./_components/NavBarMyAccountSkeleton";
import Loading from "../loading";

export default function RootLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return null;
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
