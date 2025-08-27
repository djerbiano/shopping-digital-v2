"use client";
import styles from "../myAccount.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useUser } from "../../context/UserContext";

export default function UpdateProfile({ setIsOpen, dataProfile }) {
  const { refetchProfile } = useUser();
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
        toast.success(Data?.message || "Mise à jour effectuée");
        refetchProfile();
        setIsOpen(false);
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
        toast.error(Data?.message || "Une erreur est survenue");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Une erreur est survenue");
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
        <div className={styles.formInput}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formData.email.length >= 1 && (
              <p className={styles.warning}>Attention : vous perdrez toutes vos commandes si vous modifiez votre email</p>
            )}
            <p className={styles.information}>** {dataProfile?.email}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nom:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            <p className={styles.information}>** {dataProfile?.name}</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Prénom:</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
            <p className={styles.information}>** {dataProfile?.lastName}</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Num&eacute;ro de t&eacute;l&eacute;phone:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            <p className={styles.information}>** {dataProfile?.phone}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Adresse:</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
            <p className={styles.information}>** {dataProfile?.address}</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe actuel:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Nouveau mot de passe:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <p>** Information actuelle</p>
          </div>
        </div>

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
