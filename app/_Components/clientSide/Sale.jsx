import styles from "../../page.module.css";
import ProductCard from "./ProductCard";
export default function Sale() {
  const product = {
    description: {
      desc1: "Composition: 100% polyester",
      desc2: "Col: Col doublé",
      desc3: "Motif / Couleur: Couleur unie",
    },
    pictures: {
      pic1: "avatarDefault1.webp",
      pic2: "avatarDefault1.webp",
      pic3: "avatarDefault1.webp",
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
    <div className={styles.saleContainer}>
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}
