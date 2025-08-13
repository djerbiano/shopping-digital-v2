"use client";
import styles from "../../myAccount.module.css";
import { useOrders } from "../../../context/OrdersContext";
import SingleOrder from "../../_components/SingleOrder";
import SingleOrderSkeleton from "./SingleOrderSkeleton";
export default function MesCommandes() {
  const { ordersUser, loadingOrders, refetchOrders } = useOrders();

  if (loadingOrders) return <SingleOrderSkeleton />;

  return (
    <>
      {ordersUser?.length <= 0 ? (
        <h3>Vous n'avez aucune commande</h3>
      ) : (
        <section aria-labelledby="section-orders" className={styles.myAccountContent}>
          <h3 id="section-orders">Liste de vos commandes</h3>
          {ordersUser?.map((commande) => (
            <SingleOrder key={commande?._id} commande={commande} refreshOrders={refetchOrders} />
          ))}
        </section>
      )}
    </>
  );
}
