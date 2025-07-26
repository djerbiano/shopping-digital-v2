"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../../../admin.module.css";
import productsStyles from "../../../_components/ProductsComponent/productsComponent.module.css";
import BackBtn from "../../../_components/reusable/backBtn";

const fakeProduct = {
  description: {
    desc1: "description 1",
    desc2: "description 2",
    desc3: "description 3",
  },
  pictures: {
    pic1: "/pourElle.webp",
    pic2: "/pourElle.webp",
    pic3: "/pourElle.webp",
  },
  _id: "65839d29e1ba5c02dc66379d",
  title: "lg tv",
  regularPrice: 10,
  isOnSale: true,
  salePrice: 1000,
  isTopSeller: true,
  isNewCollection: false,
  isLimitedEdition: true,
  category: "TvSon",
  stock: true,
  colors: [
    {
      color: "black",
      sizes: [
        {
          size: "50",
          quantity: 3,
          _id: "65839d29e1ba5c02dc66379f",
        },
      ],
      _id: "65839d29e1ba5c02dc66379e",
    },
    {
      color: "red",
      sizes: [
        {
          size: "10",
          quantity: 3,
          _id: "45839d29e1ba5c02dc66379f",
        },
      ],
      _id: "45839d29e1ba5c02dc66379e",
    },
  ],
  createdAt: "2023-12-21T02:04:25.608Z",
  updatedAt: "2024-10-20T20:14:18.877Z",
  __v: 0,
};

const categories = ["TvSon", "Informatique", "Téléphonie", "Femme", "Homme", "ObjetsConnectés"];

export default function SingleProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: fakeProduct.title,
    regularPrice: fakeProduct.regularPrice,
    salePrice: fakeProduct.salePrice,
    isOnSale: fakeProduct.isOnSale,
    isTopSeller: fakeProduct.isTopSeller,
    isNewCollection: fakeProduct.isNewCollection,
    isLimitedEdition: fakeProduct.isLimitedEdition,
    category: fakeProduct.category,
    stock: fakeProduct.stock,
    desc1: fakeProduct.description.desc1,
    desc2: fakeProduct.description.desc2,
    desc3: fakeProduct.description.desc3,
    pictures: fakeProduct.pictures,
    colors: fakeProduct.colors,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleColorSizeChange = (colorIndex, sizeIndex, field, value) => {
    const updatedColors = [...formData.colors];
    updatedColors[colorIndex].sizes[sizeIndex][field] = value;
    setFormData({ ...formData, colors: updatedColors });
  };

  const handleColorChange = (colorIndex, value) => {
    const updatedColors = [...formData.colors];
    updatedColors[colorIndex].color = value;
    setFormData({ ...formData, colors: updatedColors });
  };

  return (
    <section aria-labelledby="section-singleProducts" className={styles.adminContent}>
      <BackBtn />
      <h3 id="section-singleProducts">Mise à jour d'un produit</h3>

      <form className={productsStyles.formUpdate}>
        <label>
          Titre :
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>

        <label>
          Prix :
          <input type="number" name="regularPrice" value={formData.regularPrice} onChange={handleChange} />
        </label>

        <label>
          Prix promo :
          <input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} />
        </label>

        <label>
          Catégorie :
          <select name="category" value={formData.category} onChange={handleChange}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend>Filtres</legend>
          <label>
            <input type="checkbox" name="isOnSale" checked={formData.isOnSale} onChange={handleChange} />
            En promotion
          </label>
          <label>
            <input type="checkbox" name="isTopSeller" checked={formData.isTopSeller} onChange={handleChange} />
            Top ventes
          </label>
          <label>
            <input type="checkbox" name="isNewCollection" checked={formData.isNewCollection} onChange={handleChange} />
            Nouvelle collection
          </label>
          <label>
            <input
              type="checkbox"
              name="isLimitedEdition"
              checked={formData.isLimitedEdition}
              onChange={handleChange}
            />
            Édition limitée
          </label>
          <label>
            <input type="checkbox" name="stock" checked={formData.stock} onChange={handleChange} />
            En stock
          </label>
        </fieldset>

        <fieldset>
          <legend>Descriptions</legend>
          <label>
            Ligne 1 :
            <input type="text" name="desc1" value={formData.desc1} onChange={handleChange} />
          </label>
          <label>
            Ligne 2 :
            <input type="text" name="desc2" value={formData.desc2} onChange={handleChange} />
          </label>
          <label>
            Ligne 3 :
            <input type="text" name="desc3" value={formData.desc3} onChange={handleChange} />
          </label>
        </fieldset>

        <fieldset className={productsStyles.imageFieldset}>
          <legend>Images actuelles</legend>
          <div className={productsStyles.imagePreviewGrid}>
            {Object.entries(formData.pictures).map(([key, filename]) => (
              <div key={key} className={productsStyles.imageItem}>
                <Image src={filename} alt={`Image ${key}`} sizes="(max-width: 768px) 100vw, 120px" fill priority />
              </div>
            ))}
          </div>

          <label className={productsStyles.uploadLabel}>
            Changer les images
            <input type="file" multiple />
          </label>
        </fieldset>

        <fieldset className={productsStyles.variantFieldset}>
          <legend>Couleurs et tailles</legend>

          {formData.colors.map((colorObj, colorIndex) => (
            <div key={colorObj._id} className={productsStyles.colorBlock}>
              <label htmlFor={`color-${colorIndex}`}>Couleur {colorIndex + 1}</label>
              <input
                type="text"
                id={`color-${colorIndex}`}
                value={colorObj.color}
                onChange={(e) => handleColorChange(colorIndex, e.target.value)}
              />
              {colorObj.sizes.map((sizeObj, sizeIndex) => (
                <div key={sizeObj._id} className={productsStyles.sizeRow}>
                  <label htmlFor={`size-${colorIndex}-${sizeIndex}`}>Taille</label>
                  <select
                    id={`size-${colorIndex}-${sizeIndex}`}
                    value={sizeObj.size}
                    onChange={(e) => handleColorSizeChange(colorIndex, sizeIndex, "size", e.target.value)}
                  >
                    <option value="">Sélectionner</option>
                    {["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  <label htmlFor={`qty-${colorIndex}-${sizeIndex}`}>Quantité</label>
                  <input
                    type="number"
                    id={`qty-${colorIndex}-${sizeIndex}`}
                    value={sizeObj.quantity}
                    onChange={(e) => handleColorSizeChange(colorIndex, sizeIndex, "quantity", Number(e.target.value))}
                  />
                </div>
              ))}
            </div>
          ))}
        </fieldset>

        <div className={productsStyles.formActions}>
          <button type="submit" aria-label="Valider les modifications">
            Valider
          </button>
          <button type="button" onClick={() => router.back()} aria-label="Annuler et revenir à la page précédente">
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
}
