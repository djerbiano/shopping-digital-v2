import Image from "next/image";
import userStyles from "./usersComponent.module.css";

export default function UserDetailsModal({ user, onClose }) {
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
          </div>
        </div>
      </div>
    </div>
  );
}
