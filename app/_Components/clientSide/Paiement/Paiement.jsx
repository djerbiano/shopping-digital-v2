import Image from "next/image";
import styles from "./paiement.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Paiement({ totalPanier, cartItems, setShowPayment }) {
  const [loading, setLoading] = useState(false);
  const [cardPayment, setCardPayment] = useState(false);
  const [payPal, setPayPal] = useState(false);
  const [billingAddressCheckbox, setBillingAddressCheckbox] = useState(false);
  const [billingAddress, setBillingAddress] = useState("");

  const router = useRouter();

  const handlePayPal = () => {
    setPayPal(!payPal);
    setCardPayment(false);
  };

  const handleCardPayment = () => {
    setCardPayment(!cardPayment);
    setPayPal(false);
  };

  const handlePaiement = async () => {
    setLoading(true);
    if (billingAddressCheckbox && !billingAddress)
      return toast.error("Veuillez renseigner votre adresse de livraison.");
    const cartItemsAndTotal = {
      cart: cartItems,
      totalPanier,
      billingAddress: billingAddressCheckbox ? billingAddress : null,
    };
    try {
      const response = await fetch("/api/orders/addOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItemsAndTotal),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || "Une erreur est survenue.");
      } else {
        toast.success("Commande effectuée.");
        setBillingAddressCheckbox(false);
        setBillingAddress("");
        setCardPayment(false);
        setPayPal(false);
        sessionStorage.removeItem("cartItems");
        router.replace("/mon-compte/commandes");
      }
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
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

        <fieldset className={styles.billingAddress}>
          <input
            type="checkbox"
            name="billingAddressCheckbox"
            id="billingAddressCheckbox"
            checked={billingAddressCheckbox}
            onChange={(e) => setBillingAddressCheckbox(e.target.checked)}
          />
          <label htmlFor="billingAddressCheckbox">Adresse de facturation différente</label>
        </fieldset>

        {billingAddressCheckbox && (
          <>
            <label htmlFor="billingAddress" className={styles.srOnly}>
              Adresse de facturation
            </label>
            <input
              type="text"
              id="billingAddress"
              placeholder="Adresse de facturation"
              onChange={(e) => setBillingAddress(e.target.value)}
              value={billingAddress}
              className={styles.billingAddressInput}
            />
          </>
        )}
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
          <button
            type="button"
            className={styles.payBtn}
            onClick={() => handlePaiement()}
            disabled={loading}
            aria-label="Payer"
          >
            {loading ? "Paiement en cours..." : "Payer"}
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
          <button
            type="button"
            className={styles.payBtn}
            onClick={() => handlePaiement()}
            disabled={loading}
            aria-label="Payer"
          >
            {loading ? "Paiement en cours..." : "Payer"}
          </button>
        </div>
      </div>
    </section>
  );
}
