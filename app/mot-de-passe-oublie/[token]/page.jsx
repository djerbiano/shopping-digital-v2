"use client";
import styles from "../../page.module.css";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ModificationMotDePasse() {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const router = useRouter();
  const { token } = useParams();

  const handleSubmit = async () => {
    if (!password || !newPassword) return setMessage("Veuillez fournir les deux mots de passe");
    if (password !== newPassword) return setMessage("Les deux mots de passe doivent être identiques");
    if (password.length < 6) return setMessage("Le mot de passe doit contenir au moins 6 caractères");

    try {
      setLoader(true);
      setMessage("");

      const res = await fetch("/api/resetPassword/confirmResetPassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data?.message || "Mot de passe modifié");
        setPassword("");
        setNewPassword("");
        router.push("/connexion");
      } else {
        setMessage(data?.message || "Une erreur est survenue, veuillez réessayer");
      }
    } catch (error) {
      setMessage(error?.message || "Une erreur est survenue, veuillez réessayer");
    } finally {
      setLoader(false);
    }
  };
  return (
    <section className={styles.resetPassword} aria-labelledby="resetPassword">
      <h2 id="resetPassword">Modification du mot de passe</h2>
      <form>
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setMessage("");
          }}
        />
        <label htmlFor="newPassword">Confirmation du mot de passe :</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          required
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setMessage("");
          }}
        />

        <button
          type="button"
          aria-label="Envoyer la demande de reinitialisation du mot de passe"
          disabled={loader}
          onClick={handleSubmit}
        >
          {loader ? "Modification en cours..." : "Modifier"}
        </button>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </section>
  );
}
