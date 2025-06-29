"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import styles from "../../page.module.css";
import Image from "next/image";

export default function ProductCard({ title, price, imageUrl, status }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFavorite(!isFavorite);
    }
  };

  const handleCartKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // pour l'ajouter au panier
    }
  };

  const getStatusStyle = () => {
    switch (status) {
      case "limited":
        return styles.statusLimited;
      case "sale":
        return styles.statusSale;
      case "new":
        return styles.statusNew;
      default:
        return "";
    }
  };

  return (
    <article
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onClick={() => router.push(`/produits/${status}`)}
    >
      {status && <span className={`${styles.statusBadge} ${getStatusStyle()}`}>{status.toUpperCase()}</span>}

      <div className={styles.imageContainer}>
        <Image src={imageUrl} width={400} height={400} alt={title} className={styles.productImage} loading="lazy" />
      </div>

      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{title}</h2>
        <p className={styles.productPrice}>{price} €</p>
      </div>

      <div className={`${styles.hoverOverlay} ${isHovered ? styles.overlayVisible : styles.overlayHidden}`}>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          onKeyDown={handleFavoriteKeyDown}
          className={styles.favoriteButton}
          aria-label={isFavorite ? `Retirer ${title} des favoris` : `Ajouter ${title} aux favoris`}
          tabIndex={0}
        >
          {isFavorite ? (
            <FaHeart className={`${styles.heartIcon} ${styles.heartFilled}`} aria-hidden="true" />
          ) : (
            <FaRegHeart className={styles.heartIcon} aria-hidden="true" />
          )}
        </button>

        <button
          className={styles.cartButton}
          onKeyDown={handleCartKeyDown}
          aria-label={`Acheter ${title} pour ${price} €`}
          tabIndex={0}
          onClick={() => {
            /* Ajout au panier */
          }}
        >
          <FaShoppingCart className={styles.cartIcon} aria-hidden="true" />
          Acheter
        </button>
      </div>
    </article>
  );
}
