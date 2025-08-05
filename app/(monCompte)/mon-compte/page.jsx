"use client";
import styles from "../myAccount.module.css";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import UpdateProfile from "../_components/UpdateProfile";
import ProfileSkeleton from "../_components/ProfileSkeleton";
import { useModal } from "../../context/ModalContext";
import toast from "react-hot-toast";
export default function MonCompte() {
  const { dataProfile, loadingProfile, errorProfile } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const { refreshAuth } = useAuth();

  const deleteAccount = async () => {
    try {
      const response = await fetch("/api/users/delete", {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error || "Une erreur est survenue.");
        throw new Error(data?.error || "Erreur lors de la suppression.");
      }

      toast.success(data?.message || "Compte supprimé.");
      refreshAuth();
    } catch (err) {
      toast.error(err.message || "Une erreur est survenue.");
      console.error("Erreur suppression :", err.message);
    }
  };
  const handleClick = () => {
    openModal({
      content: (
        <p>
          Êtes-vous sûr de vouloir <strong>supprimer votre compte</strong> ? Cette action est irréversible.
        </p>
      ),
      onYes: deleteAccount,
    });
  };
  if (loadingProfile) {
    return <ProfileSkeleton />;
  }

  if (errorProfile) {
    return <p>Error: {errorProfile}</p>;
  }
  return (
    <>
      {isOpen ? (
        <UpdateProfile setIsOpen={setIsOpen} dataProfile={dataProfile} />
      ) : (
        <section aria-labelledby="section-myAccount" className={styles.myAccountContent}>
          <h3 id="section-myAccount">Informations personnelles</h3>
          <p>Nom: {dataProfile?.name}</p>
          <p>Prénom: {dataProfile?.lastName}</p>
          <p>Email: {dataProfile?.email}</p>
          <p>Téléphone: {dataProfile?.phone}</p>
          <p>Adresse: {dataProfile?.address}</p>

          <div className={styles.myAccountButtonsContainer}>
            <button type="submit" aria-label="Modifier mes informations" onClick={() => setIsOpen(true)}>
              Modifier mes informations
            </button>

            <button
              className={styles.dangerButton}
              type="button"
              aria-label="supprimer mon compte"
              onClick={handleClick}
            >
              supprimer mon compte
            </button>
          </div>
        </section>
      )}
    </>
  );
}
