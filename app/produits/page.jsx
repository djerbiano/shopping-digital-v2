"use client";
import styles from "../page.module.css";
import { useFilterProducts } from "../context/filterProductsContext";
import { useEffect, useState } from "react";
import DisplayAllProducts from "../_Components/clientSide/DisplayAllProducts";
import { useRouter } from "next/navigation";
import NotFound from "../_Components/clientSide/404NotFound";

export default function Produits() {
  const { categories, setCategories } = useFilterProducts();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    setError(false);
    setErrorMessage("");
    setIsLoading(true);

    // vérif prix négatifs ou non numériques
    if (
      (minPrice && (isNaN(minPrice) || Number(minPrice) < 0)) ||
      (maxPrice && (isNaN(maxPrice) || Number(maxPrice) < 0))
    ) {
      setError(true);
      setErrorMessage("Les prix doivent être des nombres positifs.");
      setIsLoading(false);
      return;
    }
    // vérif max < min
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setError(true);
      setErrorMessage("Le prix maximum ne peut pas être inférieur au prix minimum");
      setIsLoading(false);
      return;
    }
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
        setErrorMessage(data.message || "Erreur inconnue");
      }
    } catch (err) {
      setError(true);
      setErrorMessage("Erreur serveur");
      console.error("Erreur serveur :", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeout);
  }, [categories, minPrice, maxPrice]);

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

        {error ? (
          <p className={styles.error} style={{ marginBottom: "50vh" }}>
            {errorMessage}
          </p>
        ) : (
          <DisplayAllProducts products={products} isLoading={isLoading} />
        )}
      </div>
    </section>
  );
}
