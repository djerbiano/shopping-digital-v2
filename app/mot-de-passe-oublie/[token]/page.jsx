"use client";
import { useState } from "react";
import styles from "../../page.module.css";
export default function ModificationMotDePasse() {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async () => {
    if (!password || !newPassword) return setMessage("Veuillez fournir les deux mots de passe");
    if (password !== newPassword) return setMessage("Les deux mots de passe doivent être identiques.");

    console.log(password, newPassword);
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="newPassword">Confirmation du mot de passe :</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          type="button"
          aria-label="Envoyer la demande de reinitialisation du mot de passe"
          onClick={handleSubmit}
        >
          Envoyer
        </button>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </section>
  );
}
