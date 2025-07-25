"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../admin.module.css";
import trackingsStyles from "./trackings.module.css";
import { CiSettings } from "react-icons/ci";
import UpdateBtn from "../../_components/reusable/updateBtn";
import InputSearchByEmail from "../../_components/reusable/inputSearchByEmail";
export default function Trackings() {
  const router = useRouter();
  const [emailSearch, setEmailSearch] = useState("");
  const commandes = [
    {
      _id: "670ad03962c4e9da42d41aa4",
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
      email: "patrick@hotmail.fr",
      status: "expédiée",
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
    },
    {
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
    },
  ];
  const filteredTrackings = commandes.filter((tracking) =>
    tracking.email.toLowerCase().includes(emailSearch.toLowerCase())
  );
  const handleTrackingClick = (id) => {
    router.push(`/admin/trackings/${id}`);
  };

  return (
    <section aria-labelledby="section-trackings" className={styles.adminContent}>
      <h3 id="section-trackings">Suivis</h3>
      <InputSearchByEmail emailSearch={emailSearch} setEmailSearch={setEmailSearch} />
      <table className={trackingsStyles.trackingsTable}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Date de commande</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrackings.map((tracking) => (
            <tr key={tracking._id}>
              <td>{tracking.email}</td>
              <td>{tracking.status}</td>
              <td>{tracking.createdAt.split("T")[0]}</td>
              <td>
                <UpdateBtn action={() => handleTrackingClick(tracking._id)} text="Voir le suivi" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
