"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../admin.module.css";
import trackingsStyles from "./trackings.module.css";
import { CiSettings } from "react-icons/ci";
export default function Trackings() {
  const router = useRouter();
  const [emailSearch, setEmailSearch] = useState("");
  const commande = {
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
    billingAddress: "v",
    shippingAddress: "v",
    trackingNumber: "670ad03962c4e9da42d41aa8",
    createdAt: "2024-10-12T19:38:33.311Z",
    updatedAt: "2024-10-20T19:56:08.907Z",
    __v: 5,
  };

  const handleTrackingClick = (id) => {
    router.push(`/admin/trackings/${id}`);
  };

  return (
    <section aria-labelledby="section-trackings" className={styles.adminContent}>
      <h3 id="section-trackings">Suivis</h3>
      <div className={trackingsStyles.searchBar}>
        <label htmlFor="emailSearch" className={styles.srOnly}>
          Rechercher par email:
        </label>
        <input
          type="search"
          id="emailSearch"
          placeholder="Rechercher par email..."
          value={emailSearch}
          onChange={(e) => setEmailSearch(e.target.value)}
        />
      </div>
      <table className={trackingsStyles.trackingsTable}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Date de commande</th>
            <th>Modifier</th>
          </tr>
        </thead>
        <tbody>
          <tr key={commande._id}>
            <td data-label="Email">{commande.email}</td>
            <td data-label="Status">{commande.status}</td>
            <td data-label="Date de commande">{commande.createdAt.split("T")[0].replace(/-/g, " ")}</td>
            <td data-label="Modifier">
              <button
                type="button"
                className={trackingsStyles.viewButton}
                title="Modifier le produit"
                onClick={() => handleTrackingClick(commande._id)}
              >
                <CiSettings />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
