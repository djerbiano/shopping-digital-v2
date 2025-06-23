import styles from "../page.module.css";

export default function ConditionsUtilisation() {
  return (
    <div className={styles.mentions}>
      <h1>📘 Conditions Générales d’Utilisation (CGU)</h1>

      <section>
        <h2>Objet</h2>
        <p>
          Les présentes Conditions Générales d’Utilisation (CGU) encadrent l’accès et l’utilisation du site{" "}
          <strong>Shopping Digital</strong>, développé dans un cadre pédagogique.
        </p>
      </section>

      <section>
        <h2>Fonctionnement du site</h2>
        <p>
          Le site permet aux utilisateurs de s’inscrire et de passer des commandes fictives de produits (vêtements,
          high-tech). Aucune transaction financière n’est effectuée. Les fonctionnalités sont mises à disposition à des
          fins d’expérimentation et d’apprentissage.
        </p>
      </section>

      <section>
        <h2>Inscription</h2>
        <p>
          L’utilisateur peut créer un compte gratuitement. Il s’engage à fournir des informations exactes lors de son
          inscription. Aucune validation d’identité réelle n’est effectuée.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>
        <p>
          Ce site étant un projet de formation, aucun engagement de disponibilité, de sécurité ou de fonctionnement
          ininterrompu n’est garanti. Le développeur décline toute responsabilité en cas de perte de données ou
          d'erreurs techniques.
        </p>
      </section>

      <section>
        <h2>Propriété</h2>
        <p>
          Les contenus présents sur le site sont utilisés à des fins pédagogiques. Toute reproduction ou exploitation
          commerciale est interdite.
        </p>
      </section>

      <section>
        <h2>Modification des CGU</h2>
        <p>
          Ces CGU peuvent être mises à jour à tout moment sans préavis dans le cadre de l’évolution du projet
          pédagogique.
        </p>
      </section>
    </div>
  );
}
