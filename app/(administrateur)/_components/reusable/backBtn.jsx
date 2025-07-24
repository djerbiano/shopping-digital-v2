"use client";
import styles from "../../admin.module.css";
import { useRouter } from "next/navigation";

export default function BackBtn({ path, text }) {
  const router = useRouter();
  return (
    <button className={styles.backButton} onClick={() => router.push(path)} aria-label={text}>
      ← {text}
    </button>
  );
}
