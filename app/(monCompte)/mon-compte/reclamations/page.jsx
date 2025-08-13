"use client";
import styles from "../../myAccount.module.css";
import { useOrders } from "../../../context/OrdersContext";
import { useUser } from "../../../context/UserContext";
export default function Reclamations() {
  const { ordersUser, loadingOrders } = useOrders();
  const { dataProfile } = useUser();

  return (
    <section aria-labelledby="section-complaints" className={styles.myAccountContent}>
      <h3 id="section-complaints">Réclamation</h3>
      <form className={styles.claimForm}>
        <label htmlFor="nom">Nom:</label>
        <input type="text" id="nom" disabled defaultValue={dataProfile?.name} />
        <label htmlFor="commande">Numéro de commande:</label>
        <select id="commande" required="">
          {loadingOrders ? (
            <option>Chargement...</option>
          ) : (
            <>
              <option value="">Selectionner une commande</option>
              {ordersUser?.map((order) => (
                <option key={order._id} value={order._id}>
                  commande du {new Date(order.createdAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
                </option>
              ))}
              <option value="Autre">Autre</option>
            </>
          )}
        </select>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" disabled defaultValue={dataProfile?.email} />
        <label htmlFor="message">Message:</label>
        <textarea id="message" rows="5" cols="30" required="" placeholder="Votre message"></textarea>
        <button type="submit"> Envoyer</button>
      </form>
    </section>
  );
}
