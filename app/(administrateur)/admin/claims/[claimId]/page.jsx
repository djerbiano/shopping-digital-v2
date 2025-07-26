"use client";
import BackBtn from "@/app/(administrateur)/_components/reusable/backBtn";
import styles from "../../../admin.module.css";
import claimsStyles from "../claims.module.css";
import { useRouter } from "next/navigation";
export default function Claims() {
  const router = useRouter();
  const fackeClaim = {
    _id: "670b300dac5a2511063b0cfe",
    status: "En attente",
    order: {
      _id: "670ad03962c4e9da42d41aa5",
      products: [
        {
          product: "6587b4c4f47cf256dd5b6fef",
          color: "Bleu",
          size: '7"',
          quantity: 1,
          price: 699,
          _id: "670ad03962c4e9da42d41aa6",
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
      billingAddress: "1 rue de paris 75000 Paris",
      shippingAddress: "1 rue de paris 75000 Paris",
      trackingNumber: "670ad03962c4e9da42d41aa8",
      createdAt: "2024-10-12T19:38:33.311Z",
      updatedAt: "2024-10-20T19:56:08.907Z",
      __v: 5,
    },
    messages: [
      {
        userId: "659f87d69822ba170095ea38",
        message: "Bonjour, je suis satisfait de votre commande",
        _id: "670b300dac5a2511063b0cff",
        startDate: "2024-10-13T02:27:25.746Z",
      },
    ],
    createdAt: "2024-10-13T02:27:25.749Z",
    updatedAt: "2024-10-13T02:27:25.749Z",
    __v: 0,
  };
  return (
    <section aria-labelledby="section-claims" className={styles.adminContent}>
      <BackBtn />
      <h3 id="section-claims">Réclamation de {fackeClaim.order.email}</h3>

      <div className={claimsStyles.claimContainer}>
        <div className={claimsStyles.claimStatus}>
          <h4>Statut de la réclamation</h4>
          <p>{fackeClaim.status}</p>
        </div>

        <div className={claimsStyles.claimOrder}>
          <h4>Commande ID</h4>
          <p>{fackeClaim.order._id}</p>
          <button
            className={claimsStyles.claimOrderBtn}
            type="button"
            aria-label="Consulter la commande"
            title="Consulter la commande"
            onClick={() => router.push(`/admin/orders/${fackeClaim.order._id}`)}
          >
            Voir la commande
          </button>
        </div>

        <div className={claimsStyles.claimMessage}>
          <h4>Message de {fackeClaim.order.email}</h4>
          {fackeClaim.messages.map((m) => (
            <p key={m._id}>
              {new Date(m.startDate).toLocaleString()} ➤ {m.message}
            </p>
          ))}
        </div>
      </div>

      <h4 className={claimsStyles.claimsTableTitle}>Modifier le statut de la réclamation :</h4>
      <div className={claimsStyles.statusForm}>
        <label htmlFor="status">Statut de la réclamation</label>
        <select name="status" id="status" defaultValue={fackeClaim.status}>
          <option value="En attente">En attente</option>
          <option value="Traitement">Traitement</option>
          <option value="Cloturer">Cloturer</option>
        </select>
        <button aria-label="Modifier la réclamation">Modifier</button>
        <button aria-label="Supprimer la réclamation">Supprimer</button>
      </div>
    </section>
  );
}
