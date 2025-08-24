"use client";
import styles from "../../../admin.module.css";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import trackingsStyles from "../trackings.module.css";
import BackBtn from "../../../_components/reusable/backBtn";
import toast from "react-hot-toast";
export default function CommandeTrackings() {
  const [oneOrder, setOneOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const { commandeId } = useParams();

  const fetOneOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/orders/${commandeId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.message || "Une erreur est survenue");
        setErreur(data?.message || "Une erreur est survenue");
      } else {
        setOneOrder(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetOneOrder();
  }, [commandeId]);

  if (loading) {
    return <p>Chargement...</p>;
  }
  return (
    <section aria-labelledby="section-trackings-Commande" className={styles.adminContent}>
      <BackBtn />
      {erreur ? (
        <p>{erreur}</p>
      ) : (
        <>
          <h3 id="section-trackings-Commande" className={trackingsStyles.trackingsTableTitle}>
            Suivi de la commande de {oneOrder?.email}
          </h3>
          <p>User Id: {oneOrder?.user}</p>
          <p>Commande Id: {oneOrder?._id}</p>
          <p>Numéro de suivi: {oneOrder?.trackingNumber}</p>
          <p>Status: {oneOrder?.status}</p>
          <p>Total: {oneOrder?.total} €</p>
          <p>Adresse de livraison: {oneOrder?.shippingAddress}</p>
          <p>Adresse de facturation: {oneOrder?.billingAddress}</p>
          <p>Date de commande: {new Date(oneOrder?.createdAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
          <p>
            Dernière mise à jour: {new Date(oneOrder?.updatedAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
          </p>
          <h4 className={trackingsStyles.trackingsTableTitle}>Articles commandés :</h4>
          <table className={trackingsStyles.trackingsTable}>
            <thead>
              <tr>
                <th scope="col">Produit</th>
                <th scope="col">Couleur</th>
                <th scope="col">Taille</th>
                <th scope="col">Quantité</th>
                <th scope="col">Prix</th>
              </tr>
            </thead>
            <tbody>
              {oneOrder?.products?.map((product) => (
                <tr key={product._id}>
                  <td data-label="Produit">{product?.product?.title}</td>
                  <td data-label="Couleur">{product?.color}</td>
                  <td data-label="Taille">{product?.size}</td>
                  <td data-label="Quantité">{product?.quantity}</td>
                  <td data-label="Prix">{product?.price} €</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className={trackingsStyles.trackingsTableTitle}>Historique de statut :</h4>
          <table className={trackingsStyles.trackingsTable}>
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {oneOrder?.statusHistory?.map((status) => (
                <tr key={status._id}>
                  <td data-label="Status">{status?.status}</td>
                  <td data-label="Date">
                    {new Date(status?.startDate).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
