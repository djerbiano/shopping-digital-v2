import styles from "../../page.module.css";
import ProductCard from "./ProductCard";
export default function DisplayAllProducts() {
  return (
    <div className={styles.displayAllProducts}>
      <div className={styles.allProducts}>
        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />
        <ProductCard title="Product 2" price="19.99" imageUrl="/nouvelle-collection.webp" status="new" />
        <ProductCard
          title="Product 3"
          price="39.99"
          imageUrl="/5b888fe3fe83065167bf0400d2001703393847545.webp"
          status="limited"
        />
        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />
        <ProductCard title="Product 2" price="19.99" imageUrl="/nouvelle-collection.webp" status="new" />
        <ProductCard
          title="Product 3"
          price="39.99"
          imageUrl="/5b888fe3fe83065167bf0400d2001703393847545.webp"
          status="limited"
        />
        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />
        <ProductCard title="Product 2" price="19.99" imageUrl="/nouvelle-collection.webp" status="new" />
        <ProductCard
          title="Product 3"
          price="39.99"
          imageUrl="/5b888fe3fe83065167bf0400d2001703393847545.webp"
          status="limited"
        />
        <ProductCard
          title="Product 1"
          price="29.99"
          imageUrl="/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp"
          status="sale"
        />
        <ProductCard title="Product 2" price="19.99" imageUrl="/nouvelle-collection.webp" status="new" />
        <ProductCard
          title="Product 3"
          price="39.99"
          imageUrl="/5b888fe3fe83065167bf0400d2001703393847545.webp"
          status="limited"
        />
        <ProductCard
          title="Product 3"
          price="39.99"
          imageUrl="/5b888fe3fe83065167bf0400d2001703393847545.webp"
          status="limited"
        />
      </div>
    </div>
  );
}
