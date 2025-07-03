import Image from "next/image";
import styles from "../page.module.css";
export default function Contact() {
  return (
    <section className={styles.contact} aria-labelledby="contact">
      <h2 id="contact">Nous contacter</h2>

      <div className={styles.contactFormContainer}>
        <form>
          <label htmlFor="nom">Nom:</label>
          <input type="text" id="nom" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" rows="5" cols="30" required></textarea>

          <button type="submit" aria-label="Envoyer le message">
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}
