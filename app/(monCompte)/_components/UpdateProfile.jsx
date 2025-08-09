"use client";
import { set } from "mongoose";
import styles from "../myAccount.module.css";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function UpdateProfile({ setIsOpen, dataProfile }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    lastName: "",
    phone: "",
    address: "",
    password: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/users/updateOneUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const Data = await res.json();

      if (res.ok) {
        toast.success(Data?.message);
        setFormData({
          email: "",
          name: "",
          lastName: "",
          phone: "",
          address: "",
          password: "",
          newPassword: "",
        });
      } else {
        toast.error(Data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading)
    return (
      <DotLottieReact
        src="/animationFiles/LoadingDotsBlue.lottie"
        autoplay
        loop={true}
        style={{ width: "200px", height: "200px", margin: "auto" }}
      />
    );
  return (
    <section className={styles.updateProfile} aria-labelledby="updateProfile">
      <h3 id="updateProfile">Modifier mes informations</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <p className={styles.information}>** {dataProfile?.email}</p>

        <label htmlFor="name">Nom:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        <p className={styles.information}>** {dataProfile?.name}</p>

        <label htmlFor="lastName">Prénom:</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
        <p className={styles.information}>** {dataProfile?.lastName}</p>

        <label htmlFor="phone">Num&eacute;ro de t&eacute;l&eacute;phone:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        <p className={styles.information}>** {dataProfile?.phone}</p>

        <label htmlFor="address">Adresse:</label>
        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        <p className={styles.information}>** {dataProfile?.address}</p>

        <label htmlFor="password">Mot de passe actuel:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />

        <label htmlFor="newPassword">Nouveau mot de passe:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <p>** Information actuelle</p>
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
