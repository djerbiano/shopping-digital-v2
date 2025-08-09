"use client";
import styles from "./admin.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Loading from "../loading";
import NavBarAdmin from "./_components/NavBarAdmin";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  if (loading) return <Loading />;

  if (!isAuthenticated || !isAdmin) return null;
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
