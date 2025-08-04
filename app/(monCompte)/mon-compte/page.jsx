"use client";
import styles from "../myAccount.module.css";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import UpdateProfile from "../_components/UpdateProfile";
import ProfileSkeleton from "../_components/ProfileSkeleton";
export default function MonCompte() {
  const { dataProfile, loadingProfile, errorProfile } = useUser();
  const [isOpen, setIsOpen] = useState(false);

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

          <button type="submit" aria-label="Modifier mes informations" onClick={() => setIsOpen(true)}>
            Modifier mes informations
          </button>
        </section>
      )}
    </>
  );
}
