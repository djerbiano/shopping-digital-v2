import styles from "../page.module.css";
export default function MotDePasseOublie() {
  return (
    <section className={styles.resetPassword} aria-labelledby="resetPassword">
      <h2 id="resetPassword">Réinitialiser mon mot de passe</h2>
      <form action="">
        <label htmlFor="email"> Email :</label>
        <input type="email" id="email" required />

        <button type="submit" aria-label="Envoyer le message">
          Envoyer
        </button>
      </form>
    </section>
  );
}
