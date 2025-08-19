"use client";
import styles from "../page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function MotDePasseOublie() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const handleEmail = (e) => setEmail(e.target.value);

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const res = await fetch("/api/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data?.message || "Veuillez consulter votre boite mail");
        setEmail("");
      } else {
        setMessage(data?.message || "Une erreur est survenue");
      }
    } catch (error) {
      setMessage(error?.message || "Une erreur est survenue");
    } finally {
      setLoader(false);
    }
  };
  return (
    <section className={styles.resetPassword} aria-labelledby="resetPassword">
      <h2 id="resetPassword">Réinitialiser mon mot de passe</h2>
      <form>
        <button
          type="button"
          onClick={() => router.replace("/connexion")}
          aria-label="Retour à la page de connexion"
          style={{ width: "max-content" }}
        >
          ← Retour
        </button>
        <label htmlFor="email"> Email :</label>
        <input type="email" id="email" required value={email} onChange={handleEmail} />

        <button
          type="button"
          aria-label="Envoyer la demande de reinitialisation du mot de passe"
          disabled={loader}
          onClick={handleSubmit}
        >
          {loader ? "Chargement..." : "Envoyer"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </section>
  );
}
