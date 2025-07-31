"use client";
import Image from "next/image";
import styles from "../page.module.css";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
export default function Panier() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  //get items from sessionStorage
  useEffect(() => {
    const storedCartItems = sessionStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  //get products from api
  useEffect(() => {
    if (cartItems.length > 0) {
      const fetchUpdatedItems = async () => {
        const updatedItems = await Promise.all(
          cartItems.map(async (item) => {
            try {
              const res = await fetch(`/api/products/${item.id}`);
              const data = await res.json();
              return data;
            } catch (error) {
              console.error("Erreur lors de la mise à jour de l'article :", error);
              return null;
            }
          })
        );
        setProducts(updatedItems.filter(Boolean));
      };

      fetchUpdatedItems();
    }
  }, [cartItems]);

  //create a map of products to get product by id
  const productMap = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      map.set(p._id, p);
    });
    return map;
  }, [products]);

  //calculate total
  const totalPanier = cartItems.reduce((total, item) => {
    const product = productMap.get(item.id);
    if (!product) return total;
    const price = product.isOnSale ? product.salePrice : product.regularPrice;
    return total + price * item.quantity;
  }, 0);

  const handleDeleteItem = (targetItem) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === targetItem.id && item.color === targetItem.color && item.size === targetItem.size)
    );

    updateCart(updatedCart);
  };

  const updateCart = (newCart) => {
    setCartItems(newCart);
    sessionStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  return (
    <section className={styles.panier} aria-labelledby="panier">
      <h2 id="panier">Panier</h2>
      <h3>
        {cartItems?.length} article{cartItems?.length > 1 && "s"}
      </h3>
      <div className={styles.panierContainer}>
        <div className={styles.panierContent}>
          {cartItems.map((cartItem, index) => {
            const dbProduct = productMap.get(cartItem.id);
            if (!dbProduct) return null;

            const unitPrice = dbProduct?.isOnSale ? dbProduct?.salePrice : dbProduct?.regularPrice;
            const totalPrice = unitPrice * cartItem.quantity;

            return (
              <article className={styles.panierItem} key={index}>
                <div className={styles.panierItemContent}>
                  <div className={styles.panierItemImage} onClick={() => router.push(`/produits/${dbProduct._id}`)}>
                    <Image
                      src={`/${dbProduct?.pictures?.pic1}`}
                      alt={dbProduct?.title}
                      width={400}
                      height={400}
                      priority
                    />
                  </div>

                  <div className={styles.panierItemDescription}>
                    <h4>{dbProduct?.title}</h4>
                    <p>{unitPrice} €</p>
                    <p>Couleur: {cartItem?.color}</p>
                    <p>Taille: {cartItem?.size}</p>
                    <p>Quantité : {cartItem?.quantity}</p>
                    <p>Total : {totalPrice} €</p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Supprimer l'article"
                  className={styles.panierDeleteItem}
                  onClick={() => handleDeleteItem(cartItem)}
                >
                  Supprimer
                </button>
              </article>
            );
          })}
        </div>

        <section className={styles.panierSummary} aria-labelledby="recap">
          <h3 id="recap">Récapitulatif du paiement</h3>
          <p>Expédition gratuite</p>
          <p>Total : {totalPanier} €</p>
          <button type="button" aria-label="Passer au paiement">
            Paiement
          </button>
        </section>
      </div>
    </section>
  );
}
