"use client";
import styles from "../../../admin.module.css";
import productsStyles from "../../../_components/ProductsComponent/productsComponent.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useModal } from "../../../../context/ModalContext";
import BackBtn from "../../../_components/reusable/backBtn";
import toast from "react-hot-toast";

const categories = ["Homme", "Femme", "Informatique", "TvSon", "Téléphonie"];

export default function SingleProduct() {
  const { openModal } = useModal();
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState({});
  const [error, setError] = useState(null);
  const { productId } = useParams();

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFieldToUpdate((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    console.log({ ...fieldToUpdate, [name]: fieldValue });
  };

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();

      if (res.ok) {
        setProduct(data);
      } else {
        setError(data?.message || "Une erreur est survenue");
        console.error(data?.message || "Une erreur est survenue");
      }
    } catch (err) {
      setError(err?.message || "Une erreur est survenue");
      console.error("Erreur serveur :", err);
    } finally {
      setIsLoading(false);
    }
  };
  const updateProduct = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/products/update/${productId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldToUpdate),
      });
      const data = await res.json();

      if (res.ok) {
        setProduct(data);
      } else {
        setError(data?.message || "Une erreur est survenue");
        console.error(data?.message || "Une erreur est survenue");
      }
    } catch (err) {
      setError(err?.message || "Une erreur est survenue");
      console.error("Erreur serveur :", err);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteProduct = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/products/delete/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data?.message || "Produit supprimé");
        router.replace("/admin/products");
      } else {
        setError(data?.message || "Une erreur est survenue");
        console.error(data?.message || "Une erreur est survenue");
      }
    } catch (err) {
      setError(err?.message || "Une erreur est survenue");
      console.error("Erreur serveur :", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = () => {
    openModal({
      content: (
        <p>
          Êtes-vous sûr de vouloir <strong>supprimer ce produit</strong> ? Cette action est irréversible.
        </p>
      ),
      onYes: deleteProduct,
    });
  };
  useEffect(() => {
    fetchProduct();
  }, [productId]);
  if (isLoading) {
    return (
      <section aria-labelledby="section-singleProducts" className={styles.adminContent}>
        <p>chargement du produit</p>
      </section>
    );
  }
  return (
    <>
      {error ? (
        <section aria-labelledby="section-singleProducts" className={styles.adminContent}>
          <p style={{ color: "red" }}>{error}</p>{" "}
          <button
            onClick={() => {
              error === "Produit introuvable" ? router.replace("/admin/products") : setError(null);
            }}
            aria-label="Retour vers la page precedente"
          >
            retour
          </button>
        </section>
      ) : (
        <section aria-labelledby="section-singleProducts" className={styles.adminContent}>
          <BackBtn />

          <h3 id="section-singleProducts">Mise à jour d'un produit</h3>

          <form className={productsStyles.formUpdate}>
            <label>
              Titre :
              <input type="text" name="title" defaultValue={product?.title} onChange={handleChange} />
            </label>

            <label>
              Prix :
              <input type="number" name="regularPrice" defaultValue={product?.regularPrice} onChange={handleChange} />
            </label>

            <label>
              Prix promo :
              <input type="number" name="salePrice" defaultValue={product?.salePrice} onChange={handleChange} />
            </label>

            <label>
              Catégorie :
              <select name="category" defaultValue={product?.category} onChange={handleChange}>
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
                <input type="checkbox" name="isOnSale" defaultChecked={product?.isOnSale} onChange={handleChange} />
                En promotion
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isTopSeller"
                  defaultChecked={product?.isTopSeller}
                  onChange={handleChange}
                />
                Top ventes
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isNewCollection"
                  defaultChecked={product?.isNewCollection}
                  onChange={handleChange}
                />
                Nouvelle collection
              </label>
              <label>
                <input
                  type="checkbox"
                  name="isLimitedEdition"
                  defaultChecked={product?.isLimitedEdition}
                  onChange={handleChange}
                />
                Édition limitée
              </label>
              <label>
                <input type="checkbox" name="stock" defaultChecked={product?.stock} onChange={handleChange} />
                En stock
              </label>
            </fieldset>

            <fieldset className={productsStyles.descriptionFieldset}>
              <legend>Descriptions</legend>
              {product?.description &&
                Object.entries(product.description).map(([key, value]) => (
                  <label key={key}>
                    {key} :
                    <textarea
                      rows="3"
                      cols="50"
                      name={`description.${key}`}
                      defaultValue={value}
                      onChange={handleChange}
                    />
                  </label>
                ))}
            </fieldset>
            <fieldset className={productsStyles.imageFieldset}>
              <legend>Images actuelles</legend>
              <div className={productsStyles.imagePreviewGrid}>
                {Object.entries(product?.pictures || {})?.map(([key, filename]) => (
                  <div key={key} className={productsStyles.imageItem}>
                    <Image
                      src={`${filename}`}
                      alt={`Image ${key}`}
                      sizes="(max-width: 768px) 100vw, 120px"
                      fill
                      // priority
                    />
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

              {product?.colors &&
                product?.colors?.map((colorObj, colorIndex) => (
                  <div key={colorObj._id} className={productsStyles.colorBlock}>
                    <label htmlFor={`color-${colorIndex}`}>Couleur {colorIndex + 1}</label>
                    <input type="text" id={`color-${colorIndex}`} defaultValue={colorObj.color} disabled />
                    {colorObj.sizes.map((sizeObj, sizeIndex) => (
                      <div key={sizeObj._id} className={productsStyles.sizeRow}>
                        <label htmlFor={`size-${colorIndex}-${sizeIndex}`}>Taille</label>
                        <input
                          type="text"
                          id={`size-${colorIndex}-${sizeIndex}`}
                          defaultValue={sizeObj.size}
                          disabled
                        />

                        <label htmlFor={`qty-${colorIndex}-${sizeIndex}`}>Quantité</label>
                        <input
                          type="number"
                          id={`qty-${colorIndex}-${sizeIndex}`}
                          name={`colors.${colorIndex}.sizes.${sizeIndex}.quantity`}
                          defaultValue={sizeObj.quantity}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </div>
                ))}
            </fieldset>

            <div className={productsStyles.formActions}>
              <button type="button" aria-label="Valider les modifications" onClick={updateProduct}>
                Valider
              </button>
              <button type="button" onClick={() => router.back()} aria-label="Annuler et revenir à la page précédente">
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
                aria-label="Supprimer le produit"
                className={productsStyles.deleteBtn}
              >
                Supprimer
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
