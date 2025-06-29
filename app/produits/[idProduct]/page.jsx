import styles from "../../page.module.css";
import Image from "next/image";
import Collapse from "@/app/_Components/clientSide/Collapse";

export default function DisplaySelectedProduct() {
  const dataContent = {
    description: {
      desc1: "Composition : 100% polyester",
      desc2: "Col : Col doublé",
      desc3: "Motif / Couleur: Couleur unie",
    },
    pictures: {
      pic1: "/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp",
      pic2: "/5b888fe3fe83065167bf0400d2001703393847545.webp",
      pic3: "/nouvelle-collection.webp",
    },
    _id: "6587b783f47cf256dd5b7019",
    title: "Doudoune HIGH PILE NUPTSE",
    regularPrice: 350,
    isOnSale: true,
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
  };
  return (
    <section className={styles.oneProduct} aria-labelledby="product-title">
      <div className={styles.productImage}>
        <Image
          src={dataContent.pictures.pic2}
          alt={dataContent.title}
          width={300}
          height={300}
          priority
          className={styles.bannerImage}
        />

        <div className={styles.thumbnails}>
          <div>
            <Image src={dataContent.pictures.pic1} alt={dataContent.title} width={200} height={200} />
          </div>
          <div>
            <Image src={dataContent.pictures.pic2} alt={dataContent.title} width={200} height={200} />
          </div>
          <div>
            <Image src={dataContent.pictures.pic3} alt={dataContent.title} width={200} height={200} />
          </div>
        </div>
      </div>

      <div className={styles.productDetails}>
        <h2 id="product-title">{dataContent.title}</h2>
        <p>Prix : {dataContent.isOnSale ? dataContent.salePrice : dataContent.regularPrice} €</p>
        <label htmlFor="color-select">Couleur :</label>
        <select id="color-select">
          {dataContent.colors.map((color) => (
            <option key={color._id}>{color.color}</option>
          ))}
        </select>
        <label htmlFor="taille-select">Taille :</label>
        <select id="taille-select">
          {dataContent.colors.map((color) => (
            <option key={color._id}>{color.sizes.map((size) => size.size)}</option>
          ))}
        </select>
        <label htmlFor="quantity-select">Sélectionner la quantité</label>
        <input
          type="number"
          id="quantity-select"
          min="1"
          max={dataContent.colors[0].sizes[0].quantity}
          defaultValue="1"
        />
        <button>Ajouter au panier</button>

        <Collapse title="Description" data={dataContent.description} />
      </div>
    </section>
  );
}
