"use client";
import { useState } from "react";
import styles from "../../admin.module.css";
import claimsStyles from "./claims.module.css";
import ViewBtn from "../../_components/reusable/viewBtn";
import InputSearchByEmail from "../../_components/reusable/inputSearchByEmail";
import { useRouter } from "next/navigation";
export default function Claims() {
  const router = useRouter();
  const [claimsCategory, setClaimsCategory] = useState("all");
  const [emailSearch, setEmailSearch] = useState("");

  const fackeClaims = [
    {
      _id: "670b300dac5a2511063b0cfe",
      status: "Traitement",
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
          message: "test final",
          _id: "670b300dac5a2511063b0cff",
          startDate: "2024-10-13T02:27:25.746Z",
        },
      ],
      createdAt: "2024-10-13T02:27:25.749Z",
      updatedAt: "2024-10-13T02:27:25.749Z",
      __v: 0,
    },
    {
      _id: "671560a650de4a3e5a6795c4",
      status: "En attente",
      order: {
        _id: "670be3b5d0c79fb2f549fc92",
        products: [
          {
            product: "6587b3daf47cf256dd5b6fb9",
            color: "black",
            size: '15"',
            quantity: 1,
            price: 3299,
            _id: "670be3b5d0c79fb2f549fc93",
          },
          {
            product: "6587b4c4f47cf256dd5b6fef",
            color: "Bleu",
            size: '7"',
            quantity: 1,
            price: 699,
            _id: "670be3b5d0c79fb2f549fc94",
          },
        ],
        user: "659f87d69822ba170095ea38",
        email: "marion@hotmail.fr",
        status: "reçue",
        statusHistory: [
          {
            status: "payée",
            startDate: "2024-10-13T15:13:57.194Z",
            _id: "670be3b5d0c79fb2f549fc95",
          },
          {
            status: "expédiée",
            startDate: "2024-10-13T14:01:08.105Z",
            _id: "670be3ecd0c79fb2f549fd86",
          },
          {
            status: "reçue",
            startDate: "2024-10-13T15:15:11.376Z",
            _id: "670be3ffd0c79fb2f549fdbf",
          },
        ],
        total: 3998,
        billingAddress: "22 rue de paris 75000 Paris",
        shippingAddress: "22 rue de paris 75000 Paris",
        trackingNumber: "670be3b5d0c79fb2f549fc96",
        createdAt: "2024-10-13T15:13:57.207Z",
        updatedAt: "2024-10-13T15:15:11.378Z",
        __v: 2,
      },
      messages: [
        {
          userId: "659f87d69822ba170095ea38",
          message: "jhvn",
          _id: "671560a650de4a3e5a6795c5",
          startDate: "2024-10-20T19:57:26.110Z",
        },
      ],
      createdAt: "2024-10-20T19:57:26.111Z",
      updatedAt: "2024-10-20T19:57:26.111Z",
      __v: 0,
    },
    {
      _id: "670b27b08f7415d01f7c50be",
      status: "Cloturer",
      order: {
        _id: "670b03ff205b963c296ad14e",
        products: [
          {
            product: "6587b4c4f47cf256dd5b6fef",
            color: "Bleu",
            size: '7"',
            quantity: 5,
            price: 699,
            _id: "670b03ff205b963c296ad14f",
          },
        ],
        user: "659f87d69822ba170095ea38",
        email: "paul2@hotmail.fr",
        status: "reçue",
        statusHistory: [
          {
            status: "payée",
            startDate: "2024-10-12T23:19:27.578Z",
            _id: "670b03ff205b963c296ad150",
          },
          {
            status: "expédiée",
            startDate: "2024-10-12T22:26:10.265Z",
            _id: "670b0452205b963c296ad1e2",
          },
          {
            status: "reçue",
            startDate: "2024-10-12T23:21:18.910Z",
            _id: "670b046e205b963c296ad202",
          },
          {
            status: "expédiée",
            startDate: "2024-10-13T01:49:03.718Z",
            _id: "670b2bd88f7415d01f7c5875",
          },
          {
            status: "reçue",
            startDate: "2024-10-13T01:49:03.718Z",
            _id: "670b2be68f7415d01f7c58c7",
          },
        ],
        total: 3495,
        billingAddress: "15 rue de la paix 75000 Paris",
        shippingAddress: "15 rue de la paix 75000 Paris",
        trackingNumber: "670b03ff205b963c296ad151",
        createdAt: "2024-10-12T23:19:27.582Z",
        updatedAt: "2024-10-13T02:09:42.099Z",
        __v: 4,
      },
      messages: [
        {
          userId: "659f87d69822ba170095ea38",
          message: "test final",
          _id: "670b27b08f7415d01f7c50bf",
          startDate: "2024-10-13T01:51:44.813Z",
        },
        {
          userId: "659f87d69822ba170095ea38",
          message: "Traitement",
          _id: "670b29ba8f7415d01f7c541f",
          startDate: "2024-10-13T02:00:26.638Z",
        },
        {
          userId: "659f87d69822ba170095ea38",
          message: "Cloturer",
          _id: "670b29c08f7415d01f7c544f",
          startDate: "2024-10-13T02:00:32.685Z",
        },
      ],
      createdAt: "2024-10-13T01:51:44.813Z",
      updatedAt: "2024-10-13T02:00:32.686Z",
      __v: 2,
    },
    {
      _id: "671875abce319243f0ab9f89",
      status: "En attente",
      order: {
        _id: "6718755ace319243f0ab9e68",
        products: [
          {
            product: "6587b783f47cf256dd5b7019",
            color: "Bleu sarcelle",
            size: "L",
            quantity: 1,
            price: 279,
            _id: "6718755ace319243f0ab9e69",
          },
          {
            product: "6587b3daf47cf256dd5b6fb9",
            color: "black",
            size: '15"',
            quantity: 1,
            price: 200,
            _id: "6718755ace319243f0ab9e6a",
          },
          {
            product: "6587b5fdf47cf256dd5b7002",
            color: "Black",
            size: '3"',
            quantity: 1,
            price: 450,
            _id: "6718755ace319243f0ab9e6b",
          },
        ],
        user: "671874ffce319243f0ab9ce2",
        email: "george@hotmail.fr",
        status: "reçue",
        statusHistory: [
          {
            status: "payée",
            startDate: "2024-10-23T04:02:34.409Z",
            _id: "6718755ace319243f0ab9e6c",
          },
          {
            status: "expédiée",
            startDate: "2024-10-30T01:39:23.397Z",
            _id: "67218e672130c2ca6d26a65b",
          },
          {
            status: "reçue",
            startDate: "2024-12-05T04:45:54.367Z",
            _id: "6751300208ba251d7d5e5242",
          },
        ],
        total: 929,
        billingAddress: "65 rue de la paix 75000 Paris",
        shippingAddress: "65 rue de la paix 75000 Paris",
        trackingNumber: "6718755ace319243f0ab9e6d",
        createdAt: "2024-10-23T04:02:34.432Z",
        updatedAt: "2024-12-05T04:45:54.369Z",
        __v: 2,
      },
      messages: [
        {
          userId: "671874ffce319243f0ab9ce2",
          message: "test",
          _id: "671875abce319243f0ab9f8a",
          startDate: "2024-10-23T04:03:55.752Z",
        },
      ],
      createdAt: "2024-10-23T04:03:55.753Z",
      updatedAt: "2024-10-23T04:03:55.753Z",
      __v: 0,
    },
  ];

  const filtredClaims = fackeClaims.filter((claim) => {
    return (
      (claimsCategory === "all" || claim.status === claimsCategory) &&
      claim.order.email.toLowerCase().includes(emailSearch.toLowerCase())
    );
  });
  return (
    <section aria-labelledby="section-claims" className={styles.adminContent}>
      <h3 id="section-claims">Réclamations</h3>
      <InputSearchByEmail emailSearch={emailSearch} setEmailSearch={setEmailSearch} />
      <label htmlFor="claims" className={styles.srOnly}>
        Filtrer par statut:
      </label>
      <select
        name="claims"
        id="claims"
        className={claimsStyles.claimsSelect}
        value={claimsCategory}
        onChange={(e) => setClaimsCategory(e.target.value)}
      >
        <option value="all">Toutes les réclamations</option>
        <option value="En attente">En attente</option>
        <option value="Traitement">Traitement</option>
        <option value="Cloturer">Cloturer</option>
      </select>

      <table className={claimsStyles.claimsTable}>
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Statut</th>
            <th scope="col">Total</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtredClaims.map((claim) => (
            <tr key={claim._id}>
              <td>{claim.order.email}</td>
              <td>{claim.status}</td>
              <td>{claim.order.total} €</td>
              <td>{claim.createdAt.slice(0, 10)}</td>
              <td>
                <ViewBtn action={() => router.push(`/admin/claims/${claim._id}`)} text="Voir" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </section>
  );
}
