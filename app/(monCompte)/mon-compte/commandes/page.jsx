import styles from "../../myAccount.module.css";
export default function MesCommandes() {
  return (
    <section aria-labelledby="section-orders" className={styles.myAccountContent}>
      <h3 id="section-orders">Mes Commandes</h3>
      <p>Liste de vos commandes</p>
    </section>
  );
}
