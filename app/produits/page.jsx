"use client";
import styles from "../page.module.css";
import { useContext } from "react";
import { FilterProductsContext } from "../context/filterProductsContext";
import DisplayAllProducts from "../_Components/clientSide/DisplayAllProducts";

export default function Produits() {
  const { categories, setCategories } = useContext(FilterProductsContext);
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
  return (
    <section className={styles.productsFilterContainer} aria-labelledby="tous-les-produits">
      <h2 id="tous-les-produits">Tous les produits</h2>
      <div className={styles.productsFilterContent}>
        <aside aria-label="Filtres de produits">
          <fieldset>
            <legend>Catégories :</legend>
            {categoryList.map(({ key, label }) => (
              <label key={key}>
                <input type="checkbox" checked={categories[key]} onChange={() => handleCategoryChange(key)} />
                {label}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Prix :</legend>

            <label>
              Min :<input type="number" placeholder="0" min={0} />
            </label>
            <label>
              Max :<input type="number" placeholder="0" min={0} />
            </label>
          </fieldset>
        </aside>
        <DisplayAllProducts />
      </div>
    </section>
  );
}
