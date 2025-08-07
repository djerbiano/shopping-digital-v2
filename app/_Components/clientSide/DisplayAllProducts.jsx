import styles from "../../page.module.css";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./loader/ProductSkeleton";
export default function DisplayAllProducts({ products, isLoading }) {
  if (isLoading) return <ProductSkeleton />;

  if (!products.length) {
    return <p style={{ marginBottom: "50vh" }}>Aucun produit trouvé</p>;
  }
  return (
    <div className={styles.displayAllProducts}>
      <div className={styles.allProducts}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
