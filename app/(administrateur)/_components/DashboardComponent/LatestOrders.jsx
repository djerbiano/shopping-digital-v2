"use client";
import { useEffect, useState } from "react";
import styles from "../../admin.module.css";
import SkeletonLatestOrders from "./skeletonComponents/SkeletonLatestOrders";
import OneLatestOrder from "./OneLatestOrder";
import Pagination from "./Pagination";

export default function LatestOrders() {
  const [orders, setOrders] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async (page = 1) => {
    setLoadingOrders(true);
    try {
      const response = await fetch(`/api/admin/orders/allOrders?page=${page}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      } else {
        console.error(data.message || "Erreur lors de la récupération des commandes");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > orders?.pagination?.totalPages || page === currentPage) return;
    setCurrentPage(page);
    fetchOrders(page);
  };

  if (loadingOrders) return <SkeletonLatestOrders count={5} />;
  if (!orders || !orders.orders?.length) return <p>Aucune commande trouvée</p>;

  return (
    <section aria-labelledby="latest-orders-title">
      <h2 id="latest-orders-title">Dernières Commandes</h2>
      <hr />
      <table className={styles.latestOrdersTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.map((order) => (
            <OneLatestOrder
              key={order?._id || `${order?.email}-${order?.createdAt}`}
              date={order?.createdAt}
              email={order?.email}
              status={order?.status}
            />
          ))}
        </tbody>
      </table>

      <Pagination pagination={orders?.pagination} currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
}
