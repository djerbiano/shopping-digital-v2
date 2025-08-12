import styles from "../myAccount.module.css";
export default function SingleOrder({ commande }) {
  return (
    <table className={styles.myAccountTable}>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Total</th>
          <th scope="col">Statut</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{new Date(commande?.createdAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</td>
          <td>{commande?.total} €</td>
          <td className={commande?.status === "reçue" ? styles.statusValidated : ""}>{commande?.status}</td>
        </tr>

        <tr>
          <td colSpan="3">
            {commande?.products.map((product) => (
              <p key={product?._id}>
                {product?.quantity} x {product?.product?.title}
              </p>
            ))}
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colSpan="3">{commande?.status !== "reçue" && <button>Confirmer la réception</button>}</td>
        </tr>
      </tfoot>
    </table>
  );
}
