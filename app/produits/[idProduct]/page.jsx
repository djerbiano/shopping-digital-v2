"use client";
import styles from "../../page.module.css";
import Image from "next/image";
import Collapse from "@/app/_Components/clientSide/Collapse";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SkeletonProductIdPage from "../../_Components/clientSide/SkeletonElements/SkeletonProductIdPage/SkeletonProductIdPage";
import NotFound from "../../_Components/clientSide/404NotFound";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function DisplaySelectedProduct() {
  const [animationAdded, setAnimationAdded] = useState(false);
  const [showPicture, setShowPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataContent, setDataContent] = useState(null);
  const [error, setError] = useState(false);
  const { idProduct } = useParams();
  const [commande, setCommande] = useState({
    id: idProduct,
    quantity: 1,
    color: "",
    size: "",
  });

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${idProduct}`);
      const data = await res.json();

      if (res.ok) {
        setDataContent(data);
      } else {
        setError(true);
        setDataContent(data);
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
  const handleChoiseColor = (color) => {
    setCommande((prevCommande) => ({
      ...prevCommande,
      color,
      size: "",
      quantity: 1,
    }));
  };

  const handleChoiseSize = (size) => {
    setCommande((prevCommande) => ({
      ...prevCommande,
      size,
    }));
  };

  const handleQuantityChange = (event) => {
    setCommande((prevCommande) => ({
      ...prevCommande,
      quantity: event.target.value <= 0 ? 1 : event.target.value,
    }));
  };
  const handleAccessibleClick = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  const quantityProduct = dataContent?.colors
    ?.find((color) => color.color === commande.color)
    ?.sizes?.find((size) => size.size === commande.size)?.quantity;

  const handleAddToCart = () => {
    if (!commande.size || !commande.color) return;

    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === dataContent._id && item.color === commande.color && item.size === commande.size
    );

    const quantityToAdd = Number(commande.quantity);
    const maxQuantity = quantityProduct;

    if (existingItemIndex !== -1) {
      const newQuantity = cartItems[existingItemIndex].quantity + quantityToAdd;
      cartItems[existingItemIndex].quantity = newQuantity > maxQuantity ? maxQuantity : newQuantity;
      setAnimationAdded(true);
    } else {
      cartItems.push({
        id: dataContent._id,
        color: commande.color,
        size: commande.size,
        quantity: quantityToAdd > maxQuantity ? maxQuantity : quantityToAdd,
      });
      setAnimationAdded(true);
    }

    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
    if (animationAdded) {
      const timer = setTimeout(() => {
        setAnimationAdded(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [animationAdded]);

  if (isLoading) {
    return <SkeletonProductIdPage />;
  }

  if (error) {
    return <NotFound message={dataContent.message} />;
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
        <select id="color-select" onChange={(e) => handleChoiseColor(e.target.value)}>
          <option value="">Sélectionner une couleur</option>
          {dataContent?.colors?.map((color) => (
            <option key={color._id} value={color.color}>
              {color.color}
            </option>
          ))}
        </select>

        {commande.color && (
          <>
            <label htmlFor="taille-select">Sélectionner la taille :</label>
            <select id="taille-select" onChange={(e) => handleChoiseSize(e.target.value)}>
              <option value="">Sélectionner une taille</option>
              {dataContent?.colors
                ?.find((color) => color.color === commande.color)
                ?.sizes?.map((size) => (
                  <option key={size._id} value={size.size}>
                    {size.size}
                  </option>
                ))}
            </select>
          </>
        )}

        {commande.size && commande.color && (
          <>
            <label htmlFor="quantity-select">Sélectionner la quantité :</label>
            <input
              type="number"
              id="quantity-select"
              min="1"
              defaultValue="1"
              max={quantityProduct}
              onChange={handleQuantityChange}
            />
            <p>Quantité disponible : {quantityProduct}</p>
          </>
        )}
        {animationAdded ? (
          <div className={styles.lottieContainer}>
            <DotLottieReact src="/animationFiles/Success.lottie" autoplay loop={false} />
          </div>
        ) : (
          <>
            <button
              type="button"
              aria-label="Ajouter au panier"
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </button>
            <Collapse title="Description" data={dataContent?.description} />
          </>
        )}
      </div>
    </section>
  );
}
