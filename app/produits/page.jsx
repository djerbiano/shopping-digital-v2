"use client";
import styles from "../page.module.css";
import { useContext, useEffect, useState } from "react";
import { FilterProductsContext } from "../context/filterProductsContext";
import DisplayAllProducts from "../_Components/clientSide/DisplayAllProducts";
import { useRouter } from "next/navigation";
import NotFound from "../_Components/clientSide/404NotFound";

export default function Produits() {
  const { categories, setCategories } = useContext(FilterProductsContext);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleCategoryChange = (category) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [category]: !prevCategories[category],
    }));
  };
  const categoryList = [
    { key: "Femme", label: "Femme" },
    { key: "Homme", label: "Homme" },
    { key: "Informatique", label: "Informatique" },
    { key: "TvSon", label: "TV - Audio - Video" },
    { key: "Téléphonie", label: "Smartphones" },
  ];
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      // catégories sélectionnées
      Object.entries(categories).forEach(([key, isChecked]) => {
        if (isChecked) params.append("category", key);
      });

      // filtres prix
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setProducts(data.products);
      } else {
        setError(true);
        console.error("Erreur de chargement :", data.error);
      }
    } catch (err) {
      setError(true);
      console.error("Erreur serveur :", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categories, minPrice, maxPrice]);

  if (error) return <NotFound />;
  return (
    <section className={styles.productsFilterContainer} aria-labelledby="tous-les-produits">
      <h2 id="tous-les-produits">Tous les produits</h2>
      <div className={styles.productsFilterContent}>
        <aside aria-label="Filtres de produits">
          <fieldset>
            <legend>Catégories :</legend>
            {categoryList.map(({ key, label }) => (
              <label key={key}>
                <input type="checkbox" checked={categories[key] || false} onChange={() => handleCategoryChange(key)} />
                {label}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Prix :</legend>

            <label>
              Min :
              <input
                type="number"
                placeholder="0"
                min={0}
                value={minPrice || ""}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </label>
            <label>
              Max :
              <input
                type="number"
                placeholder="0"
                min={0}
                value={maxPrice || ""}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </label>
          </fieldset>
        </aside>
        <DisplayAllProducts products={products} isLoading={isLoading} />
      </div>
    </section>
  );
}
