import ProductCard from "../_Components/clientSide/ProductCard";
import styles from "../page.module.css";
export default function Favoris() {
  const product = {
    description: {
      desc1:
        "Ne vous imposez plus aucune limite ! S'inspirant de la découverte de l'imposant trou noir baptisé Sagittarius A, le Raider GE78 HX 13V est là pour rendre possible tout ce que vous pensiez impossible",
      desc2: "Intel Core i7 13700HX de 13th generation",
      desc3: "Nvidia RTX4070 8GB",
    },
    pictures: {
      pic1: "avatarDefault1.webp",
      pic2: "avatarDefault1.webp",
      pic3: "avatarDefault1.webp",
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
  };
  return (
    <section className={styles.favorisContainer} aria-labelledby="favoris">
      <h2 id="favoris">Vos produits favoris</h2>
      <div className={styles.favorisContent}>
        <ProductCard key={product._id} product={product} />
      </div>
    </section>
  );
}
