"use client";
import userStyles from "./usersComponent.module.css";
import { useState } from "react";
import { useModal } from "../../../context/ModalContext";
import toast from "react-hot-toast";
// import Image from "next/image";

export default function UserDetailsModal({ user, onClose, refetchUsers }) {
  const [loading, setLoading] = useState(false);
  const { openModal } = useModal();

  const deleteAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users/deleteOneUser/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || "Une erreur est survenue lors de la suppression du compte");
      } else {
        toast.success(data?.message || "Compte supprimé");
        refetchUsers();
        onClose();
      }
    } catch (error) {
      toast.error(error?.message || "Une erreur est survenue");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = () => {
    openModal({
      content: (
        <p>
          Êtes-vous sûr de vouloir <strong>supprimer ce compte</strong> ? Cette action est irréversible.
        </p>
      ),
      onYes: deleteAccount,
    });
  };
  return (
    <div className={userStyles.modalOverlay} aria-labelledby="modal-title" role="dialog">
      <div className={userStyles.modalContent}>
        <button
          onClick={onClose}
          className={userStyles.modalCloseBtn}
          aria-label="Fermer la modale"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
              onClose();
            }
          }}
        >
          ✕
        </button>
        <h3 id="modal-title">Détails de l'utilisateur</h3>

        <div className={userStyles.userDetailsWrapper}>
          {/* <div className={userStyles.avatarContainer}>
            <Image
              src={`/${user.avatar}`}
              alt={`Avatar de ${user.name}`}
              width={200}
              height={200}
              className={userStyles.avatar}
            />
          </div> */}
          <div className={userStyles.userDetailsInfo}>
            <p>
              <strong>ID:</strong> {user._id}
            </p>
            <p>
              <strong>Nom:</strong> {user.lastName}
            </p>
            <p>
              <strong>Prénom:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Téléphone:</strong> {user.phone}
            </p>
            <p>
              <strong>Adresse:</strong> {user.address}
            </p>
            <p>
              <strong>Email validé:</strong> {user.validateEmail ? "✅" : "❌"}
            </p>
            <p>
              <strong>Admin:</strong> {user.isAdmin ? "Oui" : "Non"}
            </p>
            <p>
              <strong>Profil vérifié:</strong> {user.verifyProfile ? "✅" : "❌"}
            </p>
            <p>
              <strong>Favoris:</strong> {user.favoritesProduct.join(", ") || "Aucun"}
            </p>
            <p>
              <strong>Créé le:</strong>{" "}
              {new Date(user.createdAt).toLocaleString("fr-FR", {
                timeZone: "Europe/Paris",
              })}
            </p>
            <button type="button" className={userStyles.deleteUserBtn} onClick={handleDelete}>
              Supprimer l'utilisateur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
