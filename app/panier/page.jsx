import Image from "next/image";
import styles from "../page.module.css";
export default function Panier() {
  const products = [
    {
      description: {
        desc1: "Composition: 100% polyester",
        desc2: "Col: Col doublé",
        desc3: "Motif / Couleur: Couleur unie",
      },
      pictures: {
        pic1: "/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp",
      },
      _id: "6587b783f47cf256dd5b7017",
      title: "Doudoune HIGH PILE NUPTSE",
      regularPrice: 350,
      isOnSale: false,
      salePrice: 279,
      isTopSeller: true,
      isNewCollection: true,
      isLimitedEdition: true,
      category: "Homme",
      stock: true,
      colors: [
        {
          color: "Bleu sarcelle",
          sizes: [
            {
              size: "L",
              quantity: 997,
              _id: "6587b783f47cf256dd5b701b",
            },
          ],
          _id: "6587b783f47cf256dd5b701a",
        },
      ],
      createdAt: "2023-12-24T04:45:55.800Z",
      updatedAt: "2024-12-05T04:44:51.259Z",
      __v: 0,
    },
    {
      description: {
        desc1: "Composition: 100% polyester",
        desc2: "Col: Col doublé",
        desc3: "Motif / Couleur: Couleur unie",
      },
      pictures: {
        pic1: "/5b888fe3fe83065167bf0400d2001703393847545.webp",
      },
      _id: "6587b783f47cf256dd5b7019",
      title: "Doudoune2",
      regularPrice: 350,
      isOnSale: true,
      salePrice: 200,
      isTopSeller: true,
      isNewCollection: true,
      isLimitedEdition: true,
      category: "Homme",
      stock: true,
      colors: [
        {
          color: "Bleu",
          sizes: [
            {
              size: "M",
              quantity: 997,
              _id: "6587b783f47cf256dd5b701b",
            },
          ],
          _id: "6587b783f47cf256dd5b701a",
        },
      ],
    },
  ];
  const totalPanier = products.reduce(
    (total, product) => total + (product.isOnSale ? product.salePrice : product.regularPrice),
    0
  );
  return (
    <section className={styles.panier} aria-labelledby="panier">
      <h2 id="panier">Panier</h2>
      <h3>
        {products.length} article{products.length > 1 && "s"}
      </h3>
      <div className={styles.panierContainer}>
        <div className={styles.panierContent}>
          {products.map((product) => (
            <article className={styles.panierItem} key={product._id}>
              <div className={styles.panierItemContent}>
                <div className={styles.panierItemImage}>
                  <Image src={product.pictures.pic1} alt={product.title} width={400} height={400} priority />
                </div>

                <div className={styles.panierItemDescription}>
                  <h4>{product.title}</h4>
                  <p>{product.isOnSale ? product.salePrice : product.regularPrice} €</p>
                  <p>Couleur: {product.colors[0].color}</p>
                  <p>Taille: {product.colors[0].sizes[0].size}</p>
                  <p>Quantité : 1</p>
                  <p>Total : {(product.isOnSale ? product.salePrice : product.regularPrice) * 1} €</p>
                </div>
              </div>
              <button type="button" aria-label="Supprimer l'article" className={styles.panierDeleteItem}>
                Supprimer
              </button>
            </article>
          ))}
        </div>
        <section className={styles.panierSummary} aria-labelledby="recap">
          <h3 id="recap">Récapitulatif du paiement</h3>
          <p>Expédition gratuite</p>
          <p>Total : {totalPanier} €</p>
          <button type="button" aria-label="Passer au paiement">
            Paiement
          </button>
        </section>
      </div>
    </section>
  );
}
