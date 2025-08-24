"use client";
import styles from "./addProduct.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddProduct({ onClose }) {
  const categories = ["Homme", "Femme", "Informatique", "TvSon", "Téléphonie"];

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [productData, setProductData] = useState({
    title: "",
    category: "",
    regularPrice: "",
    isOnSale: false,
    salePrice: "",
    isTopSeller: false,
    isNewCollection: true,
    isLimitedEdition: false,
    stock: true,
    description: {
      desc1: "",
      desc2: "",
      desc3: "",
    },
  });

  const [colors, setColors] = useState([
    {
      color: "",
      sizes: [{ size: "", quantity: 0 }],
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDescriptionChange = (e, field) => {
    setProductData((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        [field]: e.target.value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.slice(0, 3));
  };

  const addColor = () => {
    setColors((prev) => [
      ...prev,
      {
        color: "",
        sizes: [{ size: "", quantity: 0 }],
      },
    ]);
  };

  const removeColor = (index) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const updateColor = (index, value) => {
    setColors((prev) => prev.map((color, i) => (i === index ? { ...color, color: value } : color)));
  };

  const addSize = (colorIndex) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === colorIndex ? { ...color, sizes: [...color.sizes, { size: "", quantity: 0 }] } : color
      )
    );
  };

  const removeSize = (colorIndex, sizeIndex) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === colorIndex ? { ...color, sizes: color.sizes.filter((_, j) => j !== sizeIndex) } : color
      )
    );
  };

  const updateSize = (colorIndex, sizeIndex, field, value) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === colorIndex
          ? {
              ...color,
              sizes: color.sizes.map((size, j) =>
                j === sizeIndex ? { ...size, [field]: field === "quantity" ? parseInt(value) || 0 : value } : size
              ),
            }
          : color
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!productData.title.trim()) return toast.error("Le nom du produit est requis");
      if (!productData.category) return toast.error("La catégorie est requise");
      if (!productData.regularPrice || Number(productData.regularPrice) <= 0) {
        return toast.error("Le prix de vente est requis et doit être supérieur à 0");
      }
      if (!productData.description.desc1.trim()) {
        return toast.error("La description 1 est requise");
      }
      if (images.length === 0) return toast.error("Au moins une image est requise");

      // Validate colors and sizes
      const validColors = colors.filter((color) => color.color.trim() && color.sizes.length > 0);
      if (validColors.length === 0) return toast.error("Au moins une couleur et une taille sont requises");

      for (const color of validColors) {
        for (const size of color.sizes) {
          if (!size.size.trim()) return toast.error("Toutes les tailles doivent avoir un nom");
          if (size.quantity < 0) return toast.error("Les quantités ne peuvent pas être négatives");
        }
      }

      const formData = new FormData();

      Object.keys(productData).forEach((key) => {
        if (key === "description") {
          formData.append("description", JSON.stringify(productData.description));
        } else {
          formData.append(key, productData[key]);
        }
      });

      formData.append("colors", JSON.stringify(validColors));

      images.forEach((image, index) => {
        formData.append(`image${index + 1}`, image);
      });

      const response = await fetch("/api/admin/products/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Produit ajouté avec succès");
        setProductData({
          title: "",
          category: "",
          regularPrice: "",
          isOnSale: false,
          salePrice: "",
          isTopSeller: false,
          isNewCollection: true,
          isLimitedEdition: false,
          stock: true,
          description: {
            desc1: "",
            desc2: "",
            desc3: "",
          },
          colors: [{ color: "", sizes: [{ size: "", quantity: 0 }] }],
        });
        setImages([]);
        setColors([{ color: "", sizes: [{ size: "", quantity: 0 }] }]);
        onClose();
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.addProductContainer}>
      <h2 className={styles.addProductTitle}>Ajouter un Nouveau Produit</h2>

      {error && <div className={styles.errorMessage}>⚠️ {error}</div>}

      <form onSubmit={handleSubmit} className={styles.productForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Nom du produit *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={productData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Catégorie *</label>
            <select id="category" name="category" value={productData.category} onChange={handleInputChange} required>
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="regularPrice">Prix régulier (€) *</label>
            <input
              type="number"
              id="regularPrice"
              name="regularPrice"
              value={productData.regularPrice}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="isOnSale"
                name="isOnSale"
                checked={productData.isOnSale}
                onChange={handleInputChange}
              />
              <label htmlFor="isOnSale">En promotion</label>
            </div>

            {productData.isOnSale && (
              <>
                <label htmlFor="salePrice">Prix promotionnel (€)</label>
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={productData.salePrice}
                  onChange={handleInputChange}
                  required
                  min="1"
                  step="0.01"
                />
              </>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="isTopSeller"
              name="isTopSeller"
              checked={productData.isTopSeller}
              onChange={handleInputChange}
            />
            <label htmlFor="isTopSeller">Top vente</label>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="isNewCollection"
              name="isNewCollection"
              checked={productData.isNewCollection}
              onChange={handleInputChange}
            />
            <label htmlFor="isNewCollection">Nouvelle collection</label>
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="isLimitedEdition"
              name="isLimitedEdition"
              checked={productData.isLimitedEdition}
              onChange={handleInputChange}
            />
            <label htmlFor="isLimitedEdition">Édition limitée</label>
          </div>

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="stock" name="stock" checked={productData.stock} onChange={handleInputChange} />
            <label htmlFor="stock">En stock</label>
          </div>
        </div>

        <fieldset className={styles.colorsSection}>
          <legend>Couleurs et Tailles *</legend>
          {colors.map((color, colorIndex) => (
            <div key={colorIndex} className={styles.colorItem}>
              <div className={styles.colorHeader}>
                <label htmlFor={`color-${colorIndex}`} className={styles.srOnly}>
                  Nom de la couleur *
                </label>
                <input
                  type="text"
                  id={`color-${colorIndex}`}
                  placeholder="Nom de la couleur *"
                  value={color.color}
                  onChange={(e) => updateColor(colorIndex, e.target.value)}
                  className={styles.colorInput}
                />
                {colors.length > 1 && (
                  <button type="button" onClick={() => removeColor(colorIndex)} className={styles.removeColorButton}>
                    Supprimer
                  </button>
                )}
              </div>

              <div className={styles.sizesContainer}>
                {color.sizes.map((size, sizeIndex) => (
                  <div key={sizeIndex} className={styles.sizeRow}>
                    <label htmlFor={`size-${colorIndex}-${sizeIndex}`} className={styles.srOnly}>
                      Taille
                    </label>
                    <input
                      type="text"
                      id={`size-${colorIndex}-${sizeIndex}`}
                      placeholder="Taille (ex: S, M, L, 38, 39...) *"
                      value={size.size}
                      onChange={(e) => updateSize(colorIndex, sizeIndex, "size", e.target.value)}
                      className={styles.sizeInput}
                    />
                    <label htmlFor={`quantity-${colorIndex}-${sizeIndex}`} className={styles.srOnly}>
                      Quantité
                    </label>
                    <input
                      type="number"
                      id={`quantity-${colorIndex}-${sizeIndex}`}
                      placeholder="Quantité"
                      value={size.quantity}
                      onChange={(e) => updateSize(colorIndex, sizeIndex, "quantity", e.target.value)}
                      min="1"
                      className={styles.quantityInput}
                    />
                    {color.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSize(colorIndex, sizeIndex)}
                        className={styles.removeSizeButton}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addSize(colorIndex)} className={styles.addButton}>
                  + Ajouter une taille
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addColor} className={styles.addButton}>
            + Ajouter une couleur
          </button>
        </fieldset>

        <fieldset className={styles.imagesSection}>
          <legend>Images du produit * (max 3)</legend>
          <div className={styles.imageUpload}>
            <label className={styles.uploadLabel}>
              📸 Sélectionner des images
              <input type="file" multiple accept="image/*" onChange={handleImageChange} />
            </label>
            {images.length > 0 && <p className={styles.selectedImages}>{images.length} image(s) sélectionnée(s)</p>}
          </div>
        </fieldset>

        <fieldset className={styles.imagesSection}>
          <legend>Description du produit</legend>
          <div className={styles.descriptionFields}>
            <div className={styles.descriptionField}>
              <label htmlFor="desc1">Description 1 *</label>
              <textarea
                id="desc1"
                value={productData.description.desc1}
                onChange={(e) => handleDescriptionChange(e, "desc1")}
                required
                placeholder="Première partie de la description..."
              />
            </div>

            <div className={styles.descriptionField}>
              <label htmlFor="desc2">Description 2 *</label>
              <textarea
                id="desc2"
                value={productData.description.desc2}
                onChange={(e) => handleDescriptionChange(e, "desc2")}
                required
                placeholder="Deuxième partie de la description..."
              />
            </div>

            <div className={styles.descriptionField}>
              <label htmlFor="desc3">Description 3 *</label>
              <textarea
                id="desc3"
                value={productData.description.desc3}
                onChange={(e) => handleDescriptionChange(e, "desc3")}
                required
                placeholder="Troisième partie de la description..."
              />
            </div>
          </div>
        </fieldset>

        <div className={styles.formActions}>
          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? "En cours..." : "Ajouter le produit"}
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
