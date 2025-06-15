"use client";
import AsideBar from "./_Components/clientSide/AsideBar";
import Banner from "./_Components/clientSide/Banner";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <article className={styles.heroSection}>
          <AsideBar />
          <Banner
            title="Explorer la derrnière tendance"
            subtitle="Découvrez notre toute nouvelle collection"
            buttonLabel="Achetez dès maintenant"
            imageName="nouvelle-collection.webp"
            imageAlt="Homme habilé par une nouvelle collection"
            onClick={() => console.log("Bannière cliquée")}
          />
        </article>
      </main>
      <footer></footer>
    </div>
  );
}
