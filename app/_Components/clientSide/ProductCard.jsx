"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import styles from "../../page.module.css";
import Image from "next/image";

export default function ProductCard({ product }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityStatus = (product) => {
    if (product.isOnSale) return "sale";
    if (product.isNewCollection) return "new";
    if (product.isLimitedEdition) return "limited";
    return null;
  };
  const status = getPriorityStatus(product);
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

  const getStatusStyle = (status) => {
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
  const price = product.isOnSale ? product.salePrice : product.regularPrice;
  return (
    <article
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onClick={() => router.push(`/produits/${product._id}`)}
    >
      {status && <span className={`${styles.statusBadge} ${getStatusStyle(status)}`}>{status.toUpperCase()}</span>}

      <div className={styles.imageContainer}>
        <Image
          src={`/${product.pictures.pic1}`}
          width={400}
          height={400}
          alt={product.title}
          className={styles.productImage}
          priority
        />
      </div>

      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{product.title}</h2>
        <p className={styles.productPrice}>{price} €</p>
      </div>

      <div className={`${styles.hoverOverlay} ${isHovered ? styles.overlayVisible : styles.overlayHidden}`}>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          onKeyDown={handleFavoriteKeyDown}
          className={styles.favoriteButton}
          aria-label={isFavorite ? `Retirer ${product.title} des favoris` : `Ajouter ${product.title} aux favoris`}
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
          aria-label={`Acheter ${product.title} pour ${price} €`}
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
