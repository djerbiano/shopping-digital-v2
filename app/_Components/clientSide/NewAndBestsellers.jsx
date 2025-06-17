import styles from "../../page.module.css";
import BestSellers from "./BestSellers";
import NewCollection from "./NewCollection";

export default function NewAndBestsellers() {
  return (
    <article className={styles.newAndBestsellersSection} aria-labelledby="top-ventes-et-nouvelle collection">
      <h2 id="top-ventes-et-nouvelle collection" className={styles.srOnly}>
        Nouveautés et Best-Sellers
      </h2>
      <BestSellers />
      <NewCollection />
    </article>
  );
}
