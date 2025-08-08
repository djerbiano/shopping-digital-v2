"use client";
import styles from "../../page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Loading from "../../loading";

export default function Login() {
  const { isAuthenticated, setIsAuthenticated, loading } = useAuth();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  function validateForm(data) {
    if (!data.email || data.email.length < 5 || !data.email.includes("@")) {
      return "L'email doit être une adresse valide.";
    }
    if (!data.password || data.password.length < 6) {
      return "Le mot de passe doit contenir au moins 6 caractères.";
    }
    return null;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const error = validateForm(login);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Connexion réussie");
        setIsAuthenticated(true);

        router.replace("/mon-compte");
      } else {
        toast.error(data.message || "Connexion echouée");
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setLogin({
        email: "",
        password: "",
      });
    }
  }
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.replace("/mon-compte");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || isAuthenticated) {
    return <Loading />;
  }
  return (
    <section className={styles.login} aria-labelledby="login">
      <div className={styles.loginContent}>
        <h2 id="login">Connexion</h2>
        <fieldset>
          <legend className={styles.srOnly}>Connexion</legend>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            onChange={handleChange}
            aria-label="Email"
            value={login.email}
          />
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
            aria-label="Mot de passe"
            value={login.password}
          />
          <button type="submit" aria-label="Se connecter" onClick={handleSubmit}>
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
      </div>
    </section>
  );
}
