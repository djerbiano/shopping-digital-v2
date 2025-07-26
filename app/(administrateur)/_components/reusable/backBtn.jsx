"use client";
import styles from "../../admin.module.css";
import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();
  return (
    <button className={styles.backButton} onClick={() => router.back()} aria-label="Retour vers la page precedente">
      ← Retour
    </button>
  );
}
