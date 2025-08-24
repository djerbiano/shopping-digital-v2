"use client";
import styles from "../../../admin.module.css";
import claimsStyles from "../claims.module.css";
import { useModal } from "../../../../context/ModalContext";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BackBtn from "@/app/(administrateur)/_components/reusable/backBtn";

export default function Claims() {
  const router = useRouter();
  const [claimStatus, setClaimStatus] = useState("");
  const [oneClaim, setOneClaim] = useState({});
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState(null);
  const { claimId } = useParams();
  const { openModal } = useModal();
  const validStatuses = ["En attente", "Traitement", "Cloturer"];
  const handleStatusChange = (e) => {
    setClaimStatus(e.target.value);
  };

  const updateClaimStatus = async () => {
    console.log(claimStatus);
  };
  const deleteclaimFunction = async () => {
    console.log(`Réclamation n°${claimId} supprimée`);
  };
  const handleDeleteClaim = () => {
    openModal({
      content: (
        <p>
          Êtes-vous sûr de vouloir <strong>supprimer cette réclamation</strong> ? Cette action est irréversible.
        </p>
      ),
      onYes: deleteclaimFunction,
    });
  };
  const fetchOneClaim = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/claims/${claimId}`, {
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
        setOneClaim(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOneClaim();
  }, [claimId]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <section aria-labelledby="section-claims" className={styles.adminContent}>
      <BackBtn />

      {erreur ? (
        <p>{erreur}</p>
      ) : (
        <>
          <h3 id="section-claims">Réclamation de {oneClaim?.order?.email}</h3>

          <div className={claimsStyles.claimContainer}>
            <div className={claimsStyles.claimStatus}>
              <h4>Statut de la réclamation</h4>
              <p>{oneClaim?.status}</p>
            </div>

            <div className={claimsStyles.claimOrder}>
              <h4>Commande ID</h4>
              <p>{oneClaim?.order?._id}</p>
              <button
                className={claimsStyles.claimOrderBtn}
                type="button"
                aria-label="Consulter la commande"
                title="Consulter la commande"
                onClick={() => router.push(`/admin/orders/${oneClaim?.order?._id}`)}
              >
                Voir la commande
              </button>
            </div>

            <div className={claimsStyles.claimMessage}>
              <h4>Message de {oneClaim?.order?.email}</h4>
              {oneClaim?.messages?.map((m) => (
                <p key={m._id}>
                  {new Date(m?.startDate).toLocaleString()} ➤ {m?.message}
                </p>
              ))}
            </div>
          </div>

          <h4 className={claimsStyles.claimsTableTitle}>Modifier le statut de la réclamation :</h4>
          <div className={claimsStyles.statusForm}>
            <label htmlFor="status">Statut de la réclamation</label>
            <select name="status" id="status" value={claimStatus} onChange={handleStatusChange}>
              <option value="" disabled>
                -- Choisir un statut --
              </option>
              {validStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button type="button" aria-label="Modifier la réclamation" onClick={updateClaimStatus}>
              Modifier
            </button>
            <button type="button" aria-label="Supprimer la réclamation" onClick={handleDeleteClaim}>
              Supprimer
            </button>
          </div>
        </>
      )}
    </section>
  );
}
