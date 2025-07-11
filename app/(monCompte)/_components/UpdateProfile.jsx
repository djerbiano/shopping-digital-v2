"use client";
import styles from "../myAccount.module.css";
import { useState } from "react";
export default function UpdateProfile({ setIsOpen }) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    lastName: "",
    phone: "",
    address: "",
    password: "",
    confirmationPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    setFormData({
      email: "",
      name: "",
      lastName: "",
      phone: "",
      address: "",
      password: "",
      confirmationPassword: "",
    });
  };
  return (
    <section className={styles.updateProfile} aria-labelledby="updateProfile">
      <h3 id="updateProfile">Modifier mes informations</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="name">Nom:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="lastName">Prénom:</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label htmlFor="phone">Num&eacute;ro de t&eacute;l&eacute;phone:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

        <label htmlFor="address">Adresse:</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

        <label htmlFor="password">Mot de passe actuel:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmationPassword">Nouveau mot de passe:</label>
        <input
          type="password"
          id="confirmationPassword"
          name="confirmationPassword"
          value={formData.confirmationPassword}
          onChange={handleChange}
          required
        />

        <p className={styles.error}>Erreur: Le mot de passe actuel est incorrect</p>
        <div className={styles.buttonContainer}>
          <button type="submit" aria-label="Enregistrer">
            Enregistrer
          </button>
          <button type="reset" aria-label="Annuler" className={styles.cancel} onClick={() => setIsOpen(false)}>
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
}
