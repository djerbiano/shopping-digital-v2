import styles from "../../myAccount.module.css";
export default function Reclamations() {
  return (
    <section aria-labelledby="section-complaints" className={styles.myAccountContent}>
      <h3 id="section-complaints">Réclamation</h3>
      <form className={styles.claimForm}>
        <label htmlFor="nom">Nom:</label>
        <input type="text" id="nom" disabled defaultValue="EICH" />
        <label htmlFor="commande">Numéro de commande:</label>
        <select id="commande" required="">
          <option value="670ad03962c4e9da42d41aa8">670ad03962c4e9da42d41aa8</option>
          <option value="670be3b5d0c79fb2f549fc96">670be3b5d0c79fb2f549fc96</option>
          <option value="670b03ff205b963c296ad151">670b03ff205b963c296ad151</option>
          <option value="67159d31756b490f0ac940bd">67159d31756b490f0ac940bd</option>
          <option value="671656f9a8ac88d2e66a256a">671656f9a8ac88d2e66a256a</option>
          <option value="680f912dafb385078741a53d">680f912dafb385078741a53d</option>
          <option value="Autre">Autre</option>
        </select>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" disabled defaultValue="Brendand@example.com" />
        <label htmlFor="message">Message:</label>
        <textarea id="message" rows="5" cols="30" required=""></textarea>
        <button type="submit"> Envoyer</button>
      </form>
    </section>
  );
}
