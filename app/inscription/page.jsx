"use client";
import styles from "../page.module.css";
import { useState } from "react";
export default function Inscription() {
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
    <section className={styles.inscription} aria-labelledby="inscription">
      <h2 id="inscription">Inscription</h2>

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

        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmationPassword">Confirmation du mot de passe:</label>
        <input
          type="password"
          id="confirmationPassword"
          name="confirmationPassword"
          value={formData.confirmationPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" aria-label="S'inscrire">
          S'inscrire
        </button>
      </form>
    </section>
  );
}
