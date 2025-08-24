"use client";
import Image from "next/image";
import styles from "../../page.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, refreshProductsInFavorites } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [counterAddToFavorites, setCounterAddToFavorites] = useState(0);
  const [counterDeleteFromFavorites, setCounterDeleteFromFavorites] = useState(0);
  const [deleteIcon, setDeleteIcon] = useState(false);

  useEffect(() => {
    if (pathname === "/favoris") {
      setDeleteIcon(true);
    }
  }, [pathname]);
  const getPriorityStatus = (product) => {
    if (product?.isOnSale) return "sale";
    if (product?.isNewCollection) return "new";
    if (product?.isLimitedEdition) return "limited";
    return null;
  };
  const status = getPriorityStatus(product);

  const addToFavorite = async () => {
    if (!isAuthenticated) return toast.error("Veuillez vous connecter pour ajouter ce produit aux favoris");

    if (counterAddToFavorites < 3) {
      setCounterAddToFavorites((prev) => prev + 1);
      try {
        const response = await fetch("/api/products/addProductToFavorites", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product._id }),
        });
        const data = await response.json();
        if (!response.ok) {
          toast.error(data?.message || "Une erreur est survenue lors de l'ajout au favoris");
        } else {
          toast.success(data?.message || "Produit ajouté aux favoris");
        }
      } catch (error) {
        toast.error(error?.message || "Une erreur est survenue lors de l'ajout au favoris");
      }
    } else {
      toast.error("Vous avez atteint la limite d'ajout de favoris");
    }
  };
  const removeFromFavorites = async () => {
    if (!isAuthenticated) return toast.error("Veuillez vous connecter pour supprimer ce produit aux favoris");

    if (counterDeleteFromFavorites < 3) {
      setCounterDeleteFromFavorites((prev) => prev + 1);
      try {
        const response = await fetch("/api/products/removeProductFromFavorites", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product._id }),
        });
        const data = await response.json();
        if (!response.ok) {
          toast.error(data?.message || "Une erreur est survenue lors de la suppression du favoris");
        } else {
          toast.success(data?.message || "Produit supprimé du favoris");

          refreshProductsInFavorites();
        }
      } catch (error) {
        toast.error(error?.message || "Une erreur est survenue lors de la suppression du favoris");
      }
    } else {
      toast.error("Vous avez atteint la limite de suppression de favoris");
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
  const price = product?.isOnSale ? product?.salePrice : product?.regularPrice;

  return (
    <article
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
    >
      {deleteIcon && <MdDeleteForever className={styles.deleteIcon} onClick={removeFromFavorites} aria-hidden="true" />}

      {status && <span className={`${styles.statusBadge} ${getStatusStyle(status)}`}>{status.toUpperCase()}</span>}

      <div className={styles.imageContainer}>
        <Image
          src={`${product?.pictures?.pic1}`}
          width={400}
          height={400}
          alt={product?.title || "Image produit"}
          className={styles.productImage}
          // priority
        />
      </div>

      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{product?.title}</h2>
        <p className={styles.productPrice}>{price} €</p>
      </div>

      <div className={`${styles.hoverOverlay} ${isHovered ? styles.overlayVisible : styles.overlayHidden}`}>
        <button
          onClick={addToFavorite}
          className={styles.favoriteButton}
          aria-label={`Ajouter ${product?.title} aux favoris`}
          tabIndex={0}
        >
          <FaHeart className={styles.heartIcon} aria-hidden="true" />
        </button>

        <button
          className={styles.cartButton}
          aria-label={`Acheter ${product?.title} pour ${price} €`}
          tabIndex={0}
          onClick={() => router.push(`/produits/${product._id}`)}
        >
          <FaShoppingCart className={styles.cartIcon} aria-hidden="true" />
          Acheter
        </button>
      </div>
    </article>
  );
}
