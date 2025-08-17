"use client";
import styles from "../myAccount.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SingleOrder({ commande, refreshOrders }) {
  const [loading, setLoading] = useState(false);
  function getStatusClass(status) {
    switch (status) {
      case "reçue":
        return styles.statusValidated;
      case "annulée":
        return styles.statusCancelled;
      default:
        return "";
    }
  }

  const validateOrderShipping = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders/validateOrderShipping", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: commande?._id }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.message || "Une erreur est survenue");
      } else {
        toast.success(data?.message || "cc.");
        refreshOrders();
      }
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };
  return (
    <table className={styles.myAccountTable}>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Total</th>
          <th scope="col">Statut</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>{new Date(commande?.createdAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</td>
          <td>{commande?.total} €</td>
          <td className={getStatusClass(commande?.status)}>{commande?.status}</td>
        </tr>

        <tr>
          <td colSpan="3">
            {commande?.products.map((product) => (
              <p key={product?._id}>
                {product?.quantity} x {product?.product?.title}
              </p>
            ))}
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colSpan="3">
            {commande?.status !== "reçue" && commande?.status !== "annulée" && (
              <button
                onClick={validateOrderShipping}
                disabled={loading || commande?.status === "payée" || commande?.status === "annulée"}
                aria-label="Valider la réception"
              >
                {loading ? "En cours..." : "Valider la réception"}
              </button>
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
