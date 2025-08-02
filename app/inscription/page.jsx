"use client";
import styles from "../page.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function Inscription() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    lastName: "",
    phone: "",
    address: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  function validateForm(data) {
    if (!data.email || data.email.length < 5 || !data.email.includes("@")) {
      return "L'email doit être une adresse valide.";
    }
    if (!data.name || data.name.length < 4) {
      return "Le nom doit contenir au moins 4 caractères.";
    }
    if (!data.lastName || data.lastName.length < 4) {
      return "Le prénom doit contenir au moins 4 caractères.";
    }
    if (!data.phone || data.phone.length < 5) {
      return "Le numéro de téléphone est invalide.";
    }
    if (!data.address || data.address.length < 5) {
      return "L'adresse est invalide.";
    }
    if (!data.password || data.password.length < 6) {
      return "Le mot de passe doit contenir au moins 6 caractères.";
    }

    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm(formData);
    if (error) {
      toast.error(error);
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Inscription réussie");

        setFormData({
          email: "",
          name: "",
          lastName: "",
          phone: "",
          address: "",
          password: "",
        });
      } else {
        toast.error(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.inscription} aria-labelledby="inscription">
      <h2 id="inscription">Inscription</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email * :</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="name">Nom * :</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="lastName">Prénom * :</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label htmlFor="phone">Num&eacute;ro de t&eacute;l&eacute;phone * :</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

        <label htmlFor="address">Adresse * :</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

        <label htmlFor="password">Mot de passe * :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <p>* Champs obligatoires</p>
        {isLoading ? (
          <div className={styles.lottieContainer}>
            <DotLottieReact src="/animationFiles/LoadingDotsBlue.lottie" autoplay loop={true} />
          </div>
        ) : (
          <button type="submit" aria-label="S'inscrire">
            S'inscrire
          </button>
        )}
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
}
