import styles from "../../page.module.css";
export default function Login() {
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
        <p>Vous n'avez pas encore de compte ?</p>
        <button type="submit" aria-label="S'inscrire">
          S'inscrire
        </button>
      </div>
    </section>
  );
}
