import SingleOrder from "../../_components/SingleOrder";
import styles from "../../myAccount.module.css";
export default function MesCommandes() {
  const commandes = [
    {
      _id: "670be3b5d0c79fb2f549fc92",
      products: [
        {
          product: {
            pictures: {
              pic1: "MSI_Raider_GE68HX1703392218893.jpg",
              pic2: "MSI_Raider_GE68HX21703392218897.jpg",
              pic3: "MSI_Raider_GE68HX31703392218909.jpg",
            },
            _id: "6587b3daf47cf256dd5b6fb9",
            title: "Ordinateur Portable Gaming MSI Raider GE68HX ",
          },
          color: "black",
          size: '15"',
          quantity: 1,
          price: 3299,
          _id: "670be3b5d0c79fb2f549fc93",
        },
        {
          product: {
            pictures: {
              pic1: "iphone-14-finish-select-202209-6-1inch-blue1703392452589.jpg",
              pic2: "iphone-14-finish-select-202209-6-1inch-blue_AV1_GEO_EMEA1703392452590.jpg",
              pic3: "iphone-14-finish-select-202209-6-1inch-blue_AV21703392452591.jpg",
            },
            _id: "6587b4c4f47cf256dd5b6fef",
            title: "Apple iPhone 14 128 Go",
          },
          color: "Bleu",
          size: '7"',
          quantity: 1,
          price: 699,
          _id: "670be3b5d0c79fb2f549fc94",
        },
      ],
      user: "659f87d69822ba170095ea38",
      email: "saberghoudi2222@hotmail.fr",
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
      _id: "670ad03962c4e9da42d41aa5",
      products: [
        {
          product: {
            pictures: {
              pic1: "iphone-14-finish-select-202209-6-1inch-blue1703392452589.jpg",
              pic2: "iphone-14-finish-select-202209-6-1inch-blue_AV1_GEO_EMEA1703392452590.jpg",
              pic3: "iphone-14-finish-select-202209-6-1inch-blue_AV21703392452591.jpg",
            },
            _id: "6587b4c4f47cf256dd5b6fef",
            title: "Apple iPhone 14 128 Go",
          },
          color: "Bleu",
          size: '7"',
          quantity: 1,
          price: 699,
          _id: "670ad03962c4e9da42d41aa6",
        },
      ],
      user: "659f87d69822ba170095ea38",
      email: "saberghoudi2222@hotmail.fr",
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
  return (
    <section aria-labelledby="section-orders" className={styles.myAccountContent}>
      <h3 id="section-orders">Liste de vos commandes</h3>
      {commandes.map((commande) => (
        <SingleOrder key={commande._id} commande={commande} />
      ))}
    </section>
  );
}
