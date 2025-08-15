"use client";
import styles from "../page.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Contact() {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.message) {
      return toast.error("Veuillez remplir tous les champs");
    }
    try {
      setLoading(true);
      const response = await fetch("/api/claims/contact", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await response.json();
      if (!response.ok) {
        toast.error(dataApi?.message || "Une erreur est survenue");
      } else {
        toast.success(dataApi?.message || "Nous vous remercions de votre message");
        setData({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error(error?.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className={styles.contact} aria-labelledby="contact">
      <h2 id="contact">Nous contacter</h2>

      <div className={styles.contactFormContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom:</label>
          <input type="text" id="name" required onChange={handleChange} value={data.name} />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required onChange={handleChange} value={data.email} />

          <label htmlFor="message">Message:</label>
          <textarea id="message" rows="5" cols="30" required onChange={handleChange} value={data.message}></textarea>

          <button type="submit" aria-label="Envoyer le message" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>
    </section>
  );
}
