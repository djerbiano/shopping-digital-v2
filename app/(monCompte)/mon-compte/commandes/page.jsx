"use client";
import styles from "../../myAccount.module.css";
import { useState, useEffect } from "react";
import SingleOrder from "../../_components/SingleOrder";
import SingleOrderSkeleton from "./SingleOrderSkeleton";
import toast from "react-hot-toast";
export default function MesCommandes() {
  const [loading, setLoading] = useState(false);
  const [commandes, setCommandes] = useState([]);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/orders/showOrderForUser", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.message || "Une erreur est survenue.");
      } else {
        setCommandes(data);
      }
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) return <SingleOrderSkeleton />;

  return (
    <>
      {commandes.length <= 0 ? (
        <h3>Vous n'avez aucune commande</h3>
      ) : (
        <section aria-labelledby="section-orders" className={styles.myAccountContent}>
          <h3 id="section-orders">Liste de vos commandes</h3>
          {commandes.map((commande) => (
            <SingleOrder key={commande._id} commande={commande} />
          ))}
        </section>
      )}
    </>
  );
}
