"use client";
import styles from "../../page.module.css";
import Image from "next/image";
import Collapse from "@/app/_Components/clientSide/Collapse";
import { useEffect, useState } from "react";

export default function DisplaySelectedProduct() {
  const [showPicture, setShowPicture] = useState(null);
  const dataContent = {
    description: {
      desc1: "Composition : 100% polyester",
      desc2: "Col : Col doublé",
      desc3: "Motif / Couleur: Couleur unie",
    },
    pictures: {
      pic1: "/femmes-mode-luxe-manteau-en-fausse-fourrure-a-capu1703393484692.webp",
      pic2: "/5b888fe3fe83065167bf0400d2001703393847545.webp",
      pic3: "/nouvelle-collection.webp",
    },
    _id: "6587b783f47cf256dd5b7019",
    title: "Doudoune HIGH PILE NUPTSE",
    regularPrice: 350,
    isOnSale: true,
    salePrice: 279,
    isTopSeller: true,
    isNewCollection: true,
    isLimitedEdition: true,
    category: "Homme",
    stock: true,
    colors: [
      {
        color: "Bleu sarcelle",
        sizes: [
          {
            size: "L",
            quantity: 997,
            _id: "6587b783f47cf256dd5b701b",
          },
        ],
        _id: "6587b783f47cf256dd5b701a",
      },
    ],
    createdAt: "2023-12-24T04:45:55.800Z",
    updatedAt: "2024-12-05T04:44:51.259Z",
    __v: 0,
  };
  useEffect(() => {
    setShowPicture(dataContent.pictures.pic1);
  }, []);

  const handleThumbnailClick = (originalSrc) => {
    setShowPicture(originalSrc);
  };

  const handleAccessibleClick = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };
  return (
    <section className={styles.oneProduct} aria-labelledby="product-title">
      <div className={styles.productImage}>
        {showPicture && (
          <>
            <Image
              src={showPicture}
              alt={`Image du produit ${dataContent.title}`}
              width={300}
              height={300}
              priority
              className={styles.bannerImage}
            />
            <div className={styles.thumbnails}>
              <div
                tabIndex={0}
                onKeyDown={handleAccessibleClick}
                role="button"
                aria-label="Voir miniature 1"
                onClick={() => handleThumbnailClick(dataContent.pictures.pic1)}
              >
                <Image
                  src={dataContent.pictures.pic1}
                  alt={`Miniature 1 du produit ${dataContent.title}`}
                  width={200}
                  height={200}
                  priority
                />
              </div>
              <div
                tabIndex={0}
                onKeyDown={handleAccessibleClick}
                role="button"
                aria-label="Voir miniature 2"
                onClick={() => handleThumbnailClick(dataContent.pictures.pic2)}
              >
                <Image
                  src={dataContent.pictures.pic2}
                  alt={`Miniature 2 du produit ${dataContent.title}`}
                  width={200}
                  height={200}
                  priority
                />
              </div>
              <div
                tabIndex={0}
                onKeyDown={handleAccessibleClick}
                role="button"
                aria-label="Voir miniature 3"
                onClick={() => handleThumbnailClick(dataContent.pictures.pic3)}
              >
                <Image
                  src={dataContent.pictures.pic3}
                  alt={`Miniature 3 du produit ${dataContent.title}`}
                  width={200}
                  height={200}
                  priority
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.productDetails}>
        <h2 id="product-title">{dataContent.title}</h2>
        <div className={styles.priceContainer}>
          {dataContent.isOnSale ? (
            <div className={styles.price}>
              <p>Prix soldé : {dataContent.salePrice} € </p>
              <p className={styles.regularPrice}>Prix : {dataContent.regularPrice} €</p>
            </div>
          ) : (
            <p>Prix : {dataContent.regularPrice} €</p>
          )}
        </div>
        <label htmlFor="color-select">Couleur :</label>
        <select id="color-select">
          {dataContent.colors.map((color) => (
            <option key={color._id}>{color.color}</option>
          ))}
        </select>
        <label htmlFor="taille-select">Sélectionner la taille :</label>
        <select id="taille-select">
          <option value={dataContent.colors[0].sizes[0].size}>{dataContent.colors[0].sizes[0].size}</option>
        </select>
        <label htmlFor="quantity-select">Sélectionner la quantité :</label>
        <input
          type="number"
          id="quantity-select"
          min="1"
          max={dataContent.colors[0].sizes[0].quantity}
          defaultValue="1"
        />
        <button type="button" aria-label="Ajouter au panier" className={styles.addToCartButton}>
          Ajouter au panier
        </button>

        <Collapse title="Description" data={dataContent.description} />
      </div>
    </section>
  );
}
