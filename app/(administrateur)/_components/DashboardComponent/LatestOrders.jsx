"use client";
import styles from "../../admin.module.css";
import OneLatestOrder from "./OneLatestOrder";
import Pagination from "./Pagination";
import { useOrders } from "../../../context/admin/adminOrdersContext";

export default function LatestOrders() {
  const { orders, loadingOrders, refetchOrders, currentPage, setCurrentPage } = useOrders();

  if (loadingOrders) return <p>Chargement des commandes...</p>;
  if (!orders || !orders.orders?.length) return <p>Aucune commande trouvée</p>;

  const handlePageChange = (page) => {
    const totalPages = Number(orders?.pagination?.totalPages) || 1;
    if (page < 1 || page > totalPages || page === currentPage) return;

    setCurrentPage(page);

    refetchOrders(page);
  };

  return (
    <section aria-labelledby="latest-orders-title">
      <h2 id="latest-orders-title">Dernières Commandes</h2>
      <hr />
      <table className={styles.latestOrdersTable}>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Client</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.orders.map((order) => (
            <OneLatestOrder
              key={order._id || `${order.email}-${order.createdAt}`}
              date={order.createdAt}
              email={order.email}
              status={order.status}
            />
          ))}
        </tbody>
      </table>

      <Pagination pagination={orders.pagination} currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
}
