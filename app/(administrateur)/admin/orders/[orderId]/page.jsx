"use client";
import BackBtn from "../../../_components/reusable/backBtn";
import styles from "../../../admin.module.css";
import ordersStyles from "../orders.module.css";

export default function OneOrder() {
  const oneOrder = {
    _id: "670ad03962c4e9da42d41aa5",
    products: [
      {
        product: {
          description: {
            desc1: "Aluminium avec dos en verre Sonnerie/Silencieux",
            desc2: "Puce A15 Bionic avec GPU 5 cœurs",
            desc3: "Double appareil photo  Objectif principal 12 Mpx | Ultra grand‑angle",
          },
          pictures: {
            pic1: "iphone-14-finish-select-202209-6-1inch-blue1703392452589.jpg",
            pic2: "iphone-14-finish-select-202209-6-1inch-blue_AV1_GEO_EMEA1703392452590.jpg",
            pic3: "iphone-14-finish-select-202209-6-1inch-blue_AV21703392452591.jpg",
          },
          _id: "6587b4c4f47cf256dd5b6fef",
          title: "Apple iPhone 14128 Go",
          regularPrice: 699,
          isOnSale: false,
          salePrice: null,
          isTopSeller: false,
          isNewCollection: false,
          isLimitedEdition: true,
          category: "Téléphonie",
          stock: true,
          colors: [
            {
              color: "Bleu",
              sizes: [
                {
                  size: '7"',
                  quantity: 978,
                  _id: "6587b4c4f47cf256dd5b6ff1",
                },
              ],
              _id: "6587b4c4f47cf256dd5b6ff0",
            },
          ],
          createdAt: "2023-12-24T04:34:12.648Z",
          updatedAt: "2024-12-05T04:44:51.069Z",
          __v: 0,
        },
        color: "Bleu",
        size: '7"',
        quantity: 1,
        price: 699,
        _id: "670ad03962c4e9da42d41aa6",
      },
      {
        product: {
          description: {
            desc1: "Aluminium avec dos en verre Sonnerie/Silencieux",
            desc2: "Puce A15 Bionic avec GPU 5 cœurs",
            desc3: "Double appareil photo  Objectif principal 12 Mpx | Ultra grand‑angle",
          },
          pictures: {
            pic1: "iphone-14-finish-select-202209-6-1inch-blue1703392452589.jpg",
            pic2: "iphone-14-finish-select-202209-6-1inch-blue_AV1_GEO_EMEA1703392452590.jpg",
            pic3: "iphone-14-finish-select-202209-6-1inch-blue_AV21703392452591.jpg",
          },
          _id: "6587b4c4f47cf256dd5b6ded",
          title: "Apple iPhone 14128 Go",
          regularPrice: 699,
          isOnSale: false,
          salePrice: null,
          isTopSeller: false,
          isNewCollection: false,
          isLimitedEdition: true,
          category: "Téléphonie",
          stock: true,
          colors: [
            {
              color: "Bleu",
              sizes: [
                {
                  size: '7"',
                  quantity: 978,
                  _id: "6587b4c4f47cf256dd5b6ff1",
                },
              ],
              _id: "6587b4c4f47cf256dd5b6ff0",
            },
          ],
          createdAt: "2023-12-24T04:34:12.648Z",
          updatedAt: "2024-12-05T04:44:51.069Z",
          __v: 0,
        },
        color: "Bleu",
        size: '7"',
        quantity: 1,
        price: 699,
        _id: "670ad03962c4e9da42d41ad5",
      },
    ],
    user: "659f87d69822ba170095ea38",
    email: "jean2@hotmail.fr",
    status: "payée",
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
    <section aria-labelledby="section-one-order" className={styles.adminContent}>
      <BackBtn path="/admin/orders" text="Retour aux commandes" />
      <h3 id="section-one-order">Commande de {oneOrder.email}</h3>
      <h4 className={ordersStyles.ordersTableTitle}>Articles commandés :</h4>
      <table className={ordersStyles.ordersTable}>
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
          {oneOrder.products.map((product) => (
            <tr key={product._id}>
              <td>{product.product.title}</td>
              <td>{product.color}</td>
              <td>{product.size}</td>
              <td>{product.quantity}</td>
              <td>{product.price} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className={ordersStyles.ordersTableTitle}>Informations de livraison :</h4>
      <div className={ordersStyles.addressInfo}>
        <div className={ordersStyles.infoRow}>
          <strong>Adresse de livraison</strong>
          <span>{oneOrder.shippingAddress}</span>
        </div>
        <div className={ordersStyles.infoRow}>
          <strong>Adresse de facturation</strong>
          <span>{oneOrder.billingAddress}</span>
        </div>
        <div className={ordersStyles.infoRow}>
          <strong>Numéro de suivi</strong>
          <span>{oneOrder.trackingNumber}</span>
        </div>
      </div>
      <h4 className={ordersStyles.ordersTableTitle}>Historique de statut :</h4>
      <table className={ordersStyles.ordersTable}>
        <thead>
          <tr>
            <th scope="col">Statut</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {oneOrder.statusHistory.map((status) => (
            <tr key={status._id}>
              <td>{status.status}</td>
              <td>{status.startDate.replace("T", " ").slice(0, 16)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className={ordersStyles.ordersTableTitle}>Modifier le statut de la commande :</h4>
      <div className={ordersStyles.statusForm}>
        <label htmlFor="status">Statut de la commande</label>
        <select name="status" id="status" defaultValue={oneOrder.status}>
          <option value="payée">payée</option>
          <option value="expédiée">expédiée</option>
          <option value="reçue">reçue</option>
          <option value="annulée">annulée</option>
        </select>
        <button className={ordersStyles.statusFormBtn} aria-label="Modifier la commande">
          Modifier
        </button>
        <button className={ordersStyles.statusFormBtn} aria-label="Supprimer la commande">
          Supprimer
        </button>
      </div>
    </section>
  );
}
