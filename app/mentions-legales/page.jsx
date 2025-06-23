import styles from "../page.module.css";

export default function MentionsLegales() {
  return (
    <div className={styles.mentions}>
      <h1>📜 Mentions Légales</h1>

      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>Shopping Digital</strong> est un projet pédagogique réalisé dans le cadre d’une formation au
          développement web. Il permet aux utilisateurs de s’inscrire et de passer des commandes fictives.
        </p>
        <p>
          Responsable de la publication : <strong>GHOUDI Saber</strong>
          <br />
          Contact : saberghoudi2222@hotmail.fr
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Hébergeur : <strong>Vercel Inc.</strong>
          <br />
          Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
          <br />
          Site : <strong><a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></strong>
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Les utilisateurs peuvent créer un compte et passer des commandes gratuites. À cette occasion, certaines
          données personnelles peuvent être collectées (comme l’adresse e-mail). Ces données ne sont utilisées que pour
          les besoins du fonctionnement du site, notamment pour l’envoi d’e-mails de confirmation.
        </p>
        <p>Aucune donnée n’est utilisée à des fins publicitaires ou partagée avec des tiers.</p>
      </section>

      <section>
        <h2>Cookies & analytique</h2>
        <p>
          Ce site utilise <strong>Vercel Analytics</strong> à des fins de mesure d’audience uniquement. Aucune
          technologie de traçage publicitaire n’est utilisée. Aucun cookie n’est déposé sur le terminal de l’utilisateur
          à des fins de suivi.
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Ce site, ainsi que tous ses éléments (textes, images, code source), est un projet pédagogique. Toute
          reproduction à des fins commerciales est interdite.
        </p>
      </section>

      <section>
        <h2>Projet de formation</h2>
        <p>
          Ce site a été conçu par GHOUDI Saber dans le cadre d'une formation de développeur web Fullstack MERN. Il ne
          constitue pas un service réel ou une boutique en ligne opérationnelle.
        </p>
      </section>
    </div>
  );
}
