"use client";
import styles from "../../page.module.css";
import Image from "next/image";
import Collapse from "@/app/_Components/clientSide/Collapse";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SkeletonProductIdPage from "../../_Components/clientSide/SkeletonElements/SkeletonProductIdPage/SkeletonProductIdPage";
export default function DisplaySelectedProduct() {
  const [showPicture, setShowPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataContent, setDataContent] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { idProduct } = useParams();

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${idProduct}`);
      const data = await res.json();

      if (res.ok) {
        setDataContent(data);
      } else {
        setError(true);
        console.error("Erreur de chargement :", data.error);
      }
    } catch (err) {
      console.error("Erreur serveur :", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [idProduct]);

  useEffect(() => {
    if (dataContent?.pictures?.pic1) {
      setShowPicture(`/${dataContent.pictures.pic1}`);
    } else {
      setShowPicture(null);
    }
  }, [dataContent]);

  const handleThumbnailClick = (originalSrc) => {
    if (originalSrc && originalSrc !== "/") {
      setShowPicture(originalSrc);
    }
  };

  const handleAccessibleClick = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  if (isLoading) {
    return <SkeletonProductIdPage />;
  }
  if (error) {
    return router.replace("/404");
  }
  return (
    <section className={styles.oneProduct} aria-labelledby="product-title">
      <div className={styles.productImage}>
        {showPicture ? (
          <Image
            src={showPicture}
            alt={`Image du produit ${dataContent?.title}`}
            width={300}
            height={300}
            priority
            className={styles.bannerImage}
          />
        ) : null}

        <div className={styles.thumbnails}>
          {dataContent?.pictures?.pic1 && (
            <div
              tabIndex={0}
              onKeyDown={handleAccessibleClick}
              role="button"
              aria-label="Voir miniature 1"
              onClick={() => handleThumbnailClick(`/${dataContent.pictures.pic1}`)}
            >
              <Image
                src={`/${dataContent.pictures.pic1}`}
                alt={`Miniature 1 du produit ${dataContent?.title}`}
                width={200}
                height={200}
                priority
              />
            </div>
          )}
          {dataContent?.pictures?.pic2 && (
            <div
              tabIndex={0}
              onKeyDown={handleAccessibleClick}
              role="button"
              aria-label="Voir miniature 2"
              onClick={() => handleThumbnailClick(`/${dataContent.pictures.pic2}`)}
            >
              <Image
                src={`/${dataContent.pictures.pic2}`}
                alt={`Miniature 2 du produit ${dataContent?.title}`}
                width={200}
                height={200}
                priority
              />
            </div>
          )}
          {dataContent?.pictures?.pic3 && (
            <div
              tabIndex={0}
              onKeyDown={handleAccessibleClick}
              role="button"
              aria-label="Voir miniature 3"
              onClick={() => handleThumbnailClick(`/${dataContent.pictures.pic3}`)}
            >
              <Image
                src={`/${dataContent.pictures.pic3}`}
                alt={`Miniature 3 du produit ${dataContent?.title}`}
                width={200}
                height={200}
                priority
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.productDetails}>
        <h2 id="product-title">{dataContent?.title}</h2>
        <div className={styles.priceContainer}>
          {dataContent?.isOnSale ? (
            <div className={styles.price}>
              <p>Prix soldé : {dataContent?.salePrice} € </p>
              <p className={styles.regularPrice}>Prix : {dataContent?.regularPrice} €</p>
            </div>
          ) : (
            <p>Prix : {dataContent?.regularPrice} €</p>
          )}
        </div>
        <label htmlFor="color-select">Couleur :</label>
        <select id="color-select">
          {dataContent?.colors?.map((color) => (
            <option key={color._id}>{color.color}</option>
          ))}
        </select>
        <label htmlFor="taille-select">Sélectionner la taille :</label>
        <select id="taille-select">
          <option value={dataContent?.colors[0]?.sizes[0]?.size}>{dataContent?.colors[0]?.sizes[0]?.size}</option>
        </select>
        <label htmlFor="quantity-select">Sélectionner la quantité :</label>
        <input
          type="number"
          id="quantity-select"
          min="1"
          max={dataContent?.colors[0]?.sizes[0]?.quantity}
          defaultValue="1"
        />
        <button type="button" aria-label="Ajouter au panier" className={styles.addToCartButton}>
          Ajouter au panier
        </button>

        <Collapse title="Description" data={dataContent?.description} />
      </div>
    </section>
  );
}
