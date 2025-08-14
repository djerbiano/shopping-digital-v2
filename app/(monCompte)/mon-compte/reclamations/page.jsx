"use client";
import styles from "../../myAccount.module.css";
import { useState } from "react";
import { useOrders } from "../../../context/OrdersContext";
import { useUser } from "../../../context/UserContext";
import toast from "react-hot-toast";
export default function Reclamations() {
  const { dataProfile } = useUser();
  const { ordersUser, loadingOrders } = useOrders();
  const [loader, setLoader] = useState(false);
  const [claim, setClaim] = useState({
    claimInformation: "",
    claimMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClaim((prevClaim) => ({ ...prevClaim, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!claim.claimInformation) return toast.error("Veuillez choisir une commande");
    if (!claim.claimMessage) return toast.error("Veuillez entrer un message");
    try {
      setLoader(true);
      const response = await fetch("/api/claims/addClaim", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claim),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.message || "Une erreur est survenue");
      } else {
        toast.success(data?.message || "Réclamation envoyée");
      }
    } catch (error) {
      toast.error(error?.message || "Une erreur est survenue");
    } finally {
      setLoader(false);
      setClaim({ claimInformation: "", claimMessage: "" });
    }
  };

  return (
    <section aria-labelledby="section-complaints" className={styles.myAccountContent}>
      <h3 id="section-complaints">Réclamation</h3>
      <form className={styles.claimForm} onSubmit={handleSubmit}>
        <label htmlFor="nom">Nom:</label>
        <input type="text" id="nom" disabled defaultValue={dataProfile?.name} />
        <label htmlFor="commande">Numéro de commande:</label>
        <select id="commande" name="claimInformation" value={claim.claimInformation} required="" onChange={handleChange}>
          {loadingOrders ? (
            <option>Chargement...</option>
          ) : (
            <>
              <option value="">
                {ordersUser?.length <= 0 ? "Vous n'avez aucune commande" : "Veuillez choisir une commande"}
              </option>
              {ordersUser?.map((order) => (
                <option key={order?._id} value={order?._id}>
                  commande du {new Date(order?.createdAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
                </option>
              ))}
            </>
          )}
        </select>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" disabled defaultValue={dataProfile?.email} />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          rows="5"
          cols="30"
          required
          placeholder="Votre message"
          name="claimMessage"
          value={claim.claimMessage}
          onChange={handleChange}
        ></textarea>
        <button type="submit"> {loader ? "Chargement..." : "Envoyer"}</button>
      </form>
    </section>
  );
}
