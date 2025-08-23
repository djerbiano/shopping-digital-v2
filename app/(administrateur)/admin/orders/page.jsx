"use client";
import styles from "../../admin.module.css";
import ordersStyles from "./orders.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ViewBtn from "../../_components/reusable/viewBtn";
import InputSearchByEmail from "../../_components/reusable/inputSearchByEmail";
import Pagination from "../../_components/DashboardComponent/Pagination";
import toast from "react-hot-toast";

export default function Orders() {
  const mounted = useRef(false);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [limitOrders, setLimitOrders] = useState(5);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    email: "",
    status: "",
  });

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setPage(1);
  };
  const fetchOrders = async () => {
    const queryOrders = {};

    if (data.email !== "") queryOrders.email = data.email.trim();

    const validStatuses = ["payée", "expédiée", "reçue", "annulée"];
    if (data.status !== "" && validStatuses.includes(data.status)) {
      queryOrders.status = data.status;
    }

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limitOrders", limitOrders);

    if (Object.keys(queryOrders).length > 0) {
      params.set("queryOrders", JSON.stringify(queryOrders));
    }

    const endpoint = `/api/admin/orders/allOrders?${params.toString()}`;

    try {
      setLoadingOrders(true);
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setOrders(data);
        toast.success("Commandes chargées");
      } else {
        setError(data?.message);
        console.error(data?.message || "Erreur lors de la récupération des commandes");
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    setError(null);
    fetchOrders();
  }, [page, limitOrders, data.status]);

  useEffect(() => {
    if (mounted.current) {
      if (data.email === "") {
        setError(null);
        fetchOrders();
      }
    } else {
      mounted.current = true;
    }
  }, [data.email]);

  if (loadingOrders) {
    return (
      <section aria-labelledby="section-orders" className={styles.adminContent}>
        <h3 id="section-orders">Commandes</h3>
        <p>Chargement...</p>
      </section>
    );
  }

  return (
    <section aria-labelledby="section-orders" className={styles.adminContent}>
      <h3 id="section-orders">Commandes</h3>

      <InputSearchByEmail
        emailSearch={data.email}
        setEmailSearch={(value) => setData({ ...data, email: value })}
        functionToCall={fetchOrders}
      />

      <label htmlFor="orders" className={styles.srOnly}>
        Filtrer par statut:
      </label>
      <select
        name="status"
        id="orders"
        value={data.status}
        aria-label="Filtrer par statut"
        className={ordersStyles.ordersSelect}
        onChange={handleSearch}
      >
        <option value="">Toutes les commandes</option>
        <option value="payée">Payées</option>
        <option value="expédiée">Expédiées</option>
        <option value="reçue">Reçues</option>
        <option value="annulée">Annulées</option>
      </select>
      <label htmlFor="limitOrders" aria-hidden="true">
        Nombre de commandes par page
      </label>
      <select
        name="limitOrders"
        id="limitOrders"
        value={limitOrders}
        aria-label="Nombre de commandes par page"
        className={ordersStyles.ordersSelect}
        onChange={(e) => {
          setPage(1);
          setLimitOrders(e.target.value);
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <table className={ordersStyles.ordersTable}>
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Statut</th>
            <th scope="col">Total</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.length === 0 ? (
            <tr>
              <td colSpan="5">Aucune commande trouvée</td>
            </tr>
          ) : (
            orders?.orders?.map((order) => (
              <tr key={order?._id}>
                <td data-label="Email">{order?.email}</td>
                <td data-label="Statut">{order?.status}</td>
                <td data-label="Total">{order?.total}</td>
                <td data-label="Date">{order?.createdAt?.slice(0, 10)}</td>
                <td data-label="Actions">
                  <ViewBtn action={() => router.push(`/admin/orders/${order?._id}`)} text="Voir la commande" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {error && <p>{error}</p>}
      {orders?.pagination?.totalPages > 0 && (
        <Pagination pagination={orders?.pagination} currentPage={page} onPageChange={setPage} />
      )}
    </section>
  );
}
