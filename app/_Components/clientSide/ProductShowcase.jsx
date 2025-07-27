import styles from "../../page.module.css";
import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export default function ProductShowcase({ ariaLabelledby, titleSection }) {
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
    <section className={styles.productShowcase} aria-labelledby={ariaLabelledby}>
      <div className={styles.sectionHeader}>
        <h2 id={ariaLabelledby} className={styles.sectionTitle}>
          {titleSection}
        </h2>
        <div className={styles.navigationControls}>
          <button aria-label="Voir les produits précédents" className={styles.navButton}>
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button aria-label="Voir les produits suivants" className={styles.navButton}>
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.productShowcaseContent}>
        {Array.from({ length: 3 }).map((_, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
}
