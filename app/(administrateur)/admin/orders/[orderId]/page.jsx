"use client";
import styles from "../../../admin.module.css";
import ordersStyles from "../orders.module.css";
import { useModal } from "../../../../context/ModalContext";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BackBtn from "../../../_components/reusable/backBtn";
import toast from "react-hot-toast";

export default function OneOrder() {
  const router = useRouter();
  const [orderStatus, setOrderStatus] = useState("");
  const [oneOrder, setOneOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const { orderId } = useParams();
  const { openModal } = useModal();

  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const updateOrderStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/orders/update/${orderId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus: orderStatus }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.message || "Une erreur est survenue");
        setErreur(data?.message || "Une erreur est survenue");
      } else {
        setOneOrder(data);
        toast.success(data?.message || "Statut mis à jour");
        setOrderStatus("");
      }
    } catch (error) {
      toast.error(error?.message || "Une erreur est survenue");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteOrderFunction = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/orders/delete/${orderId}`, {
        method: "DELETE",
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
        toast.success(data?.message || "Commande supprimée");
        router.back();
      }
    } catch (error) {
      toast.error(error?.message || "Une erreur est survenue");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteOrder = () => {
    openModal({
      content: (
        <p>
          Êtes-vous sûr de vouloir <strong>supprimer cette commande</strong> ? Cette action est irréversible.
        </p>
      ),
      onYes: deleteOrderFunction,
    });
  };
  const fetOneOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
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
  }, [orderId]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <section aria-labelledby="section-one-order" className={styles.adminContent}>
      <BackBtn />

      {erreur ? (
        <p>{erreur}</p>
      ) : (
        <>
          <h3 id="section-one-order">Commande de {oneOrder?.email}</h3>
          <h4 className={ordersStyles.ordersTableTitle}>
            Articles commandés :{" "}
            {oneOrder?.products?.length <= 1
              ? oneOrder?.products?.length + " article"
              : oneOrder?.products?.length + " articles"}{" "}
            / total de {oneOrder?.total} €
          </h4>
          <table className={ordersStyles.ordersTable}>
            <thead>
              <tr>
                <th scope="col">Produit</th>
                <th scope="col">Couleur</th>
                <th scope="col">Taille</th>
                <th scope="col">Quantité</th>
              </tr>
            </thead>
            <tbody>
              {oneOrder?.products?.map((product) => (
                <tr key={product?._id}>
                  <td data-label="Produit">{product?.product?.title}</td>
                  <td data-label="Couleur">{product?.color}</td>
                  <td data-label="Taille">{product?.size}</td>
                  <td data-label="Quantité">{product?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className={ordersStyles.ordersTableTitle}>Informations de livraison :</h4>
          <div className={ordersStyles.addressInfo}>
            <div className={ordersStyles.infoRow}>
              <strong>Adresse de livraison</strong>
              <span>{oneOrder?.shippingAddress}</span>
            </div>
            <div className={ordersStyles.infoRow}>
              <strong>Adresse de facturation</strong>
              <span>{oneOrder?.billingAddress}</span>
            </div>
            <div className={ordersStyles.infoRow}>
              <strong>Numéro de suivi</strong>
              <span>{oneOrder?.trackingNumber}</span>
            </div>
          </div>
          <h4 className={ordersStyles.ordersTableTitle}>Historique de statut :</h4>
          <table className={ordersStyles.ordersTable}>
            <thead>
              <tr>
                <th scope="col">Statut</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {oneOrder?.statusHistory?.map((status) => (
                <tr key={status._id}>
                  <td>{status.status}</td>
                  <td>{new Date(status.startDate).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className={ordersStyles.ordersTableTitle}>Modifier le statut de la commande :</h4>
          <div className={ordersStyles.statusForm}>
            <label htmlFor="status">Statut de la commande</label>
            <select name="status" id="status" value={orderStatus} onChange={handleStatusChange}>
              <option value="" disabled>
                -- Choisir un statut --
              </option>
              <option value="payée">payée</option>
              <option value="expédiée">expédiée</option>
              <option value="reçue">reçue</option>
              <option value="annulée">annulée</option>
            </select>
            <button type="button" aria-label="Modifier la commande" onClick={updateOrderStatus} disabled={!orderStatus || loading}>
              Modifier
            </button>
            <button type="button" aria-label="Supprimer la commande" onClick={handleDeleteOrder}>
              Supprimer
            </button>
          </div>
        </>
      )}
    </section>
  );
}
