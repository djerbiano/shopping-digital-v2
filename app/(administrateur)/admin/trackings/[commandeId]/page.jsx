
import styles from "../../../admin.module.css";
import trackingsStyles from "../trackings.module.css";
import BackBtn from "../../../_components/reusable/backBtn";
export default function CommandeTrackings() {
  const commande = {
    _id: "670ad03962c4e9da42d41aa5",
    products: [
      {
        product: "Tablette Apple iPad 9th Gen 64 Go Gris",
        color: "Bleu",
        size: '12"',
        quantity: 1,
        price: 699,
        _id: "670ad03962c4e9da42d41aa6",
      },
      {
        product: "Tablette Apple iPad 9th Gen 64 Go Gris",
        color: "Bleu",
        size: '12"',
        quantity: 1,
        price: 699,
        _id: "670ad03962c4e9da42d41255",
      },
    ],
    user: "659f87d69822ba170095ea38",
    email: "jean@hotmail.fr",
    status: "reçue",
    statusHistory: [
      {
        status: "payée",
        startDate: "2024-10-12T19:38:33.305Z",
        _id: "670ad03962c4e9da42d41aa7",
      },
      {
        status: "expédiée",
        startDate: "2024-10-13T01:49:03.718Z",
        _id: "670b2a0c8f7415d01f7c553c",
      },
      {
        status: "reçue",
        startDate: "2024-10-13T01:49:03.718Z",
        _id: "670b2a138f7415d01f7c5558",
      },
      {
        status: "expédiée",
        startDate: "2024-10-13T01:49:03.718Z",
        _id: "670b2a688f7415d01f7c55c3",
      },
      {
        status: "expédiée",
        startDate: "2024-10-13T01:49:03.718Z",
        _id: "670b2aaa8f7415d01f7c5660",
      },
      {
        status: "reçue",
        startDate: "2024-10-20T19:56:08.893Z",
        _id: "6715605850de4a3e5a6794e7",
      },
    ],
    total: 699,
    billingAddress: "v",
    shippingAddress: "v",
    trackingNumber: "670ad03962c4e9da42d41aa8",
    createdAt: "2024-10-12T19:38:33.311Z",
    updatedAt: "2024-10-20T19:56:08.907Z",
    __v: 5,
  };

  return (
    <section aria-labelledby="section-trackings-Commande" className={styles.adminContent}>
      <BackBtn path="/admin/trackings" text="Retour au suivis des commandes" />

      <h3 id="section-trackings-Commande" className={trackingsStyles.trackingsTableTitle}>
        Suivi de la commande de {commande.email}
      </h3>
      <p>User Id: {commande.user}</p>
      <p>Commande Id: {commande._id}</p>
      <p>Numéro de suivi: {commande.trackingNumber}</p>
      <p>Status: {commande.status}</p>
      <p>Total: {commande.total} €</p>
      <p>Adresse de livraison: {commande.shippingAddress}</p>
      <p>Adresse de facturation: {commande.billingAddress}</p>
      <p>Date de commande: {commande.createdAt.replace("T", " ").slice(0, 16)}</p>
      <p>Dernière mise à jour: {commande.updatedAt.replace("T", " ").slice(0, 16)}</p>
      <h4 className={trackingsStyles.trackingsTableTitle}>Articles commandés :</h4>
      <table className={trackingsStyles.trackingsTable}>
        <thead>
          <tr>
            <th scope="col">Produit</th>
            <th scope="col">Couleur</th>
            <th scope="col">Taille</th>
            <th scope="col">Quantité</th>
            <th scope="col">Prix</th>
          </tr>
        </thead>
        <tbody>
          {commande.products.map((product) => (
            <tr key={product._id}>
              <td data-label="Produit">{product.product}</td>
              <td data-label="Couleur">{product.color}</td>
              <td data-label="Taille">{product.size}</td>
              <td data-label="Quantité">{product.quantity}</td>
              <td data-label="Prix">{product.price} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className={trackingsStyles.trackingsTableTitle}>Historique de statut :</h4>
      <table className={trackingsStyles.trackingsTable}>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {commande.statusHistory.map((status) => (
            <tr key={status._id}>
              <td data-label="Status">{status.status}</td>
              <td data-label="Date">{status.startDate.replace("T", " ").slice(0, 16)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
