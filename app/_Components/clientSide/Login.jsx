"use client";
import { useState } from "react";
import styles from "../../page.module.css";
import { useRouter } from "next/navigation";
export default function Login() {
  const [error, setError] = useState(true);
  const router = useRouter();
  return (
    <section className={styles.login} aria-labelledby="login">
      <div className={styles.loginContent}>
        <h2 id="login">Connexion</h2>
        <fieldset>
          <legend className={styles.srOnly}>Connexion</legend>
          <label htmlFor="username">Email:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit" aria-label="Se connecter">
            Se connecter
          </button>
        </fieldset>
        <p
          className={styles.forgotPassword}
          aria-label="Mot de passe oubliez ?"
          tabIndex="0"
          onClick={() => {
            router.push("/mot-de-passe-oublie");
          }}
        >
          Mot de passe oubliez ?
        </p>
        <p>Vous n'avez pas encore de compte ?</p>
        <button type="submit" aria-label="S'inscrire" onClick={() => router.push("/inscription")}>
          S'inscrire
        </button>

        {error && <p className={styles.error}>Erreur : Nom d'utilisateur ou mot de passe incorrect</p>}
      </div>
    </section>
  );
}
