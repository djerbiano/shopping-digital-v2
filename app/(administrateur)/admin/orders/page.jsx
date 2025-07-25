"use client";
import styles from "../../admin.module.css";
import ordersStyles from "./orders.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ViewBtn from "../../_components/reusable/viewBtn";

export default function Orders() {
  const router = useRouter();
  const [orderCategory, setOrderCategory] = useState("all");
  const [emailSearch, setEmailSearch] = useState("");
  const orders = [
    {
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
    },
    {
      _id: "670be3b5d0c79fb2f549fc92",
      products: [
        {
          product: {
            description: {
              desc1:
                "Ne vous imposez plus aucune limite ! S'inspirant de la découverte de l'imposant trou noir baptisé Sagittarius A, le Raider GE78 HX 13V est là pour rendre possible tout ce que vous pensiez impossible",
              desc2: "Intel Core i7 13700HX de 13th generation",
              desc3: "Nvidia RTX4070 8GB",
            },
            pictures: {
              pic1: "MSI_Raider_GE68HX1703392218893.jpg",
              pic2: "MSI_Raider_GE68HX21703392218897.jpg",
              pic3: "MSI_Raider_GE68HX31703392218909.jpg",
            },
            _id: "6587b3daf47cf256dd5b6fb9",
            title: "Ordinateur Portable Gaming MSI Raider GE68HX ",
            regularPrice: 3299,
            isOnSale: true,
            salePrice: 200,
            isTopSeller: true,
            isNewCollection: false,
            isLimitedEdition: false,
            category: "Informatique",
            stock: true,
            colors: [
              {
                color: "black",
                sizes: [
                  {
                    size: '15"',
                    quantity: 78,
                    _id: "6587b3daf47cf256dd5b6fbb",
                  },
                ],
                _id: "6587b3daf47cf256dd5b6fba",
              },
            ],
            createdAt: "2023-12-24T04:30:18.946Z",
            updatedAt: "2024-12-05T04:44:50.878Z",
            __v: 0,
          },
          color: "black",
          size: '15"',
          quantity: 1,
          price: 3299,
          _id: "670be3b5d0c79fb2f549fc93",
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
          _id: "670be3b5d0c79fb2f549fc94",
        },
      ],
      user: "659f87d69822ba170095ea38",
      email: "phil2@hotmail.fr",
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
      billingAddress: " iuytfyu",
      shippingAddress: " iuytfyu",
      trackingNumber: "670be3b5d0c79fb2f549fc96",
      createdAt: "2024-10-13T15:13:57.207Z",
      updatedAt: "2024-10-13T15:15:11.378Z",
      __v: 2,
    },
    {
      _id: "670b03ff205b963c296ad14e",
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
          quantity: 5,
          price: 699,
          _id: "670b03ff205b963c296ad14f",
        },
      ],
      user: "659f87d69822ba170095ea38",
      email: "manon2@hotmail.fr",
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
      billingAddress: "a",
      shippingAddress: "a",
      trackingNumber: "670b03ff205b963c296ad151",
      createdAt: "2024-10-12T23:19:27.582Z",
      updatedAt: "2024-10-13T02:09:42.099Z",
      __v: 4,
    },
    {
      _id: "671562c150de4a3e5a6798ee",
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
          quantity: 2,
          price: 699,
          _id: "671562c150de4a3e5a6798ef",
        },
        {
          product: {
            description: {
              desc1:
                "Notre puce la plus puissante jamais embarquée sur Apple Watch. Une nouvelle façon d’interagir avec votre Apple Watch comme par magie, sans toucher l’écran",
              desc2:
                "La puce Apple sur mesure de l’Apple Watch Series 9 lui donne des ailes en termes de performances, d’intuitivité et de rapidité",
              desc3:
                "Les gestes facilitent l’utilisation de l’Apple Watch, en particulier lorsque vous avez les mains prises",
            },
            pictures: {
              pic1: "Apple-Watch-Series-9-GPS31703392765383.jpg",
              pic2: "Apple-Watch-Series-9-GPS21703392765383.jpg",
              pic3: "Apple-Watch-Series-9-GPS1703392765383.jpg",
            },
            _id: "6587b5fdf47cf256dd5b7002",
            title: "Montre connectée Apple watch Serie 9",
            regularPrice: 599,
            isOnSale: true,
            salePrice: 450,
            isTopSeller: true,
            isNewCollection: true,
            isLimitedEdition: true,
            category: "ObjetsConnectés",
            stock: true,
            colors: [
              {
                color: "Black",
                sizes: [
                  {
                    size: '3"',
                    quantity: 874,
                    _id: "6587b5fdf47cf256dd5b7004",
                  },
                ],
                _id: "6587b5fdf47cf256dd5b7003",
              },
            ],
            createdAt: "2023-12-24T04:39:25.397Z",
            updatedAt: "2025-04-28T14:31:09.891Z",
            __v: 0,
          },
          color: "Black",
          size: '3"',
          quantity: 1,
          price: 450,
          _id: "671562c150de4a3e5a6798f0",
        },
      ],
      user: "6715623150de4a3e5a67989e",
      email: "mji04@gmail.com",
      status: "expédiée",
      statusHistory: [
        {
          status: "payée",
          startDate: "2024-10-20T20:06:25.145Z",
          _id: "671562c150de4a3e5a6798f1",
        },
        {
          status: "expédiée",
          startDate: "2024-10-20T19:24:49.486Z",
          _id: "6715638f50de4a3e5a679ac1",
        },
      ],
      total: 1848,
      billingAddress: "gggg",
      shippingAddress: "gggg",
      trackingNumber: "671562c150de4a3e5a6798f2",
      createdAt: "2024-10-20T20:06:25.149Z",
      updatedAt: "2024-10-20T20:09:51.939Z",
      __v: 1,
    },
  ];
  const filtredOrders = orders.filter(
    (order) =>
      (orderCategory === "all" ? true : order.status === orderCategory) &&
      order.email.toLowerCase().includes(emailSearch.toLowerCase())
  );
  return (
    <section aria-labelledby="section-orders" className={styles.adminContent}>
      <h3 id="section-orders">Commandes</h3>
      <div className={ordersStyles.searchBar}>
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
      <label htmlFor="orders" className={styles.srOnly}>
        Filtrer par statut:
      </label>
      <select
        name="orders"
        id="orders"
        className={ordersStyles.ordersSelect}
        onChange={(e) => setOrderCategory(e.target.value)}
      >
        <option value="all">Toutes les commandes</option>
        <option value="payée">Payées</option>
        <option value="expédiée">Expédiées</option>
        <option value="reçue">Reçues</option>
      </select>

      <table className={ordersStyles.ordersTable}>
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
          {filtredOrders.map((order) => (
            <tr key={order._id}>
              <td data-label="Email">{order.email}</td>
              <td data-label="Statut">{order.status}</td>
              <td data-label="Total">{order.total}</td>
              <td data-label="Date">{order.createdAt.slice(0, 10)}</td>
              <td data-label="Actions">
                <ViewBtn action={() => router.push(`/admin/orders/${order._id}`)} text="Voir la commande" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
