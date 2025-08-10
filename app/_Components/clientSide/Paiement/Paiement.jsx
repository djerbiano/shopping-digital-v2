import Image from "next/image";
import styles from "./paiement.module.css";
import { useState } from "react";

export default function Paiement({ totalPanier, cartItems, setShowPayment }) {
  const [cardPayment, setCardPayment] = useState(false);
  const [payPal, setPayPal] = useState(false);

  const handlePayPal = () => {
    setPayPal(!payPal);
    setCardPayment(false);
  };

  const handleCardPayment = () => {
    setCardPayment(!cardPayment);
    setPayPal(false);
  };

  const handlePaiement = () => {
    console.log("paiement");
  };
  return (
    <section className={styles.paiementContainer} aria-labelledby="paiement">
      <h2 id="paiement" className={styles.srOnly}>
        Paiement
      </h2>
      <div className={`${styles.content} ${styles.contentLeft}`}>
        <h3>Destinataire</h3>
        <p>Shopping Digital</p>
        <h3>Référence du paiement:</h3>
        <p>123456789</p>
        <h3>Date de paiement:</h3>
        <p>{new Date().toLocaleDateString()}</p>
        <h3>Nombre de produits:</h3>
        <p>{cartItems?.length}</p>
        <h3>Total:</h3>
        <p>{totalPanier} €</p>
      </div>
      <div className={` ${styles.content} ${styles.contentRight}`}>
        <button type="button" className={styles.backButton} onClick={() => setShowPayment(false)}>
          Retour
        </button>
        <div className={styles.paymentLogo}>
          <h3>Mode de paiement:</h3>
          <Image src="/paiement.png" alt="logo paiement" width={100} height={100} />
        </div>
        <button type="button" onClick={() => handleCardPayment()}>
          Carte bancaire
        </button>
        <div className={`${cardPayment ? styles.cardPaymentActive : styles.cardPayment}`}>
          <label htmlFor="cardNumber" className={styles.srOnly}>
            Numéro de carte
          </label>
          <input id="cardNumber" type="text" placeholder="1234 1234 1234 1234" />
          <p>Date d'expiration</p>
          <label htmlFor="expiration" className={styles.srOnly}>
            Date d'expiration
          </label>
          <input id="expiration" type="text" placeholder="MM/AA" maxLength={5} />
          <p>CVV</p>
          <label htmlFor="cvv" className={styles.srOnly}>
            CVV
          </label>
          <input id="cvv" type="text" placeholder="1234" maxLength={4} />
          <button type="button" className={styles.payBtn} onClick={() => handlePaiement()}>
            Payer
          </button>
        </div>
        <button type="button" onClick={() => handlePayPal()}>
          PayPal
        </button>
        <div className={`${payPal ? styles.payPalActive : styles.payPal}`}>
          <label htmlFor="paypal" className={styles.srOnly} aria-label="PayPal">
            paypal
          </label>
          <input id="paypal" type="text" placeholder="PayPal email" />
          <button type="button" className={styles.payBtn} onClick={() => handlePaiement()}>
            Payer
          </button>
        </div>
      </div>
    </section>
  );
}
