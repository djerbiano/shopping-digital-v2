"use client";

import { useState } from "react";
import UpdateProfile from "../_components/UpdateProfile";
import styles from "../myAccount.module.css";
export default function MonCompte() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen ? (
        <UpdateProfile setIsOpen={setIsOpen} />
      ) : (
        <section aria-labelledby="section-myAccount" className={styles.myAccountContent}>
          <h3 id="section-myAccount">Informations personnelles</h3>
          <p>Nom: EICH</p>
          <p>Prénom: Brendan</p>
          <p>Email: Brendand@example.com</p>
          <p>Téléphone: 06 00 00 00 00</p>
          <p>Adresse: 1 rue de la paix 75000 Paris</p>

          <button type="submit" aria-label="Modifier mes informations" onClick={() => setIsOpen(true)}>
            Modifier mes informations
          </button>
        </section>
      )}
    </>
  );
}
