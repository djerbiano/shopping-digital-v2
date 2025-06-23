import styles from "../page.module.css";

export default function PolitiqueConfidentialite() {
  return (
    <div className={styles.mentions}>
      <h1>🔐 Politique de Confidentialité</h1>

      <section>
        <h2>Collecte des données</h2>
        <p>
          Le site Shopping Digital collecte uniquement les données strictement nécessaires à l’inscription et à la
          gestion des commandes gratuites (par exemple : adresse e-mail, nom d’utilisateur).
        </p>
      </section>

      <section>
        <h2>Utilisation des données</h2>
        <p>Les données sont utilisées uniquement dans le cadre du fonctionnement du site, notamment pour :</p>
        <ul>
          <li>L’accès au compte utilisateur</li>
          <li>L’envoi d’un e-mail de confirmation lors d’une commande</li>
        </ul>
      </section>

      <section>
        <h2>Stockage et sécurité</h2>
        <p>
          Les données sont stockées sur les serveurs de Vercel ou sur des bases de données utilisées par le projet (le
          cas échéant). Aucune donnée n’est partagée avec des tiers.
        </p>
      </section>

      <section>
        <h2>Droits des utilisateurs</h2>
        <p>
          Conformément au RGPD, vous avez le droit de demander l’accès, la modification ou la suppression de vos données
          personnelles. Pour exercer ces droits, contactez le responsable du site à l’adresse suivante :
          saberghoudi2222@hotmail.fr
        </p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        <p>
          Les données collectées sont conservées uniquement pendant la durée de vie du projet pédagogique ou jusqu’à
          suppression manuelle par l’utilisateur.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Le site n’utilise pas de cookies à des fins publicitaires. Seules des solutions de mesure d’audience anonymes
          comme Vercel Analytics sont utilisées, sans traçage personnel.
        </p>
      </section>
    </div>
  );
}
