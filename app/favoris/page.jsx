import ProductCard from "../_Components/clientSide/ProductCard";
import styles from "../page.module.css";
export default function Favoris() {
  return (
    <section className={styles.favorisContainer} aria-labelledby="favoris">
      <h2 id="favoris">Vos produits favoris</h2>
      <div className={styles.favorisContent}>
        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />
        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />
        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />
        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />

        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />
        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />
      </div>
    </section>
  );
}
