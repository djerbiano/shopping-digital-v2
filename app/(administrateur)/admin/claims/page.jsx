"use client";
import styles from "../../admin.module.css";
import claimsStyles from "./claims.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ViewBtn from "../../_components/reusable/viewBtn";
import InputSearchByEmail from "../../_components/reusable/inputSearchByEmail";
import Pagination from "../../_components/DashboardComponent/Pagination";
import toast from "react-hot-toast";

export default function Claims() {
  const router = useRouter();
  const mounted = useRef(false);
  const [error, setError] = useState(null);
  const [claims, setClaims] = useState([]);
  const [limitClaims, setLimitClaims] = useState(5);
  const [loadingClaims, setLoadingClaims] = useState(false);
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
  const validStatuses = ["En attente", "Traitement", "Cloturer"];
  const fetchClaims = async () => {
    const queryClaims = {};

    if (data.email !== "") queryClaims.email = data.email.trim();

    if (data.status !== "" && validStatuses.includes(data.status)) {
      queryClaims.status = data.status;
    }

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limitClaims", limitClaims);

    if (Object.keys(queryClaims).length > 0) {
      params.set("queryClaims", JSON.stringify(queryClaims));
    }

    const endpoint = `/api/admin/claims?${params.toString()}`;

    try {
      setLoadingClaims(true);
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setClaims(data);
        toast.success("Réclamations chargées");
      } else {
        setError(data?.message);
        console.error(data?.message || "Erreur lors de la récupération des commandes");
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoadingClaims(false);
    }
  };

  useEffect(() => {
    setError(null);
    fetchClaims();
  }, [page, limitClaims, data.status]);

  useEffect(() => {
    if (mounted.current) {
      if (data.email === "") {
        setError(null);
        fetchClaims();
      }
    } else {
      mounted.current = true;
    }
  }, [data.email]);

  if (loadingClaims) {
    return (
      <section aria-labelledby="section-claims" className={styles.adminContent}>
        <h3 id="section-claims">Réclamations</h3>
        <p>Chargement des réclamations...</p>
      </section>
    );
  }
  return (
    <section aria-labelledby="section-claims" className={styles.adminContent}>
      <h3 id="section-claims">Réclamations</h3>
      <InputSearchByEmail
        emailSearch={data.email}
        setEmailSearch={(value) => setData({ ...data, email: value })}
        functionToCall={fetchClaims}
      />
      <label htmlFor="claims" className={styles.srOnly}>
        Filtrer par statut:
      </label>
      <select
        name="status"
        id="claims"
        value={data.status}
        aria-label="Filtrer par statut"
        className={claimsStyles.claimsSelect}
        onChange={handleSearch}
      >
        <option value="">Toutes les réclamations</option>
        {validStatuses?.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <label htmlFor="limitClaims" aria-hidden="true">
        Nombre de réclamations par page
      </label>
      <select
        name="limitClaims"
        id="limitClaims"
        value={limitClaims}
        aria-label="Nombre de réclamations par page"
        className={claimsStyles.claimsSelect}
        onChange={(e) => {
          setPage(1);
          setLimitClaims(e.target.value);
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
      <table className={claimsStyles.claimsTable}>
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
          {claims?.claims?.length === 0 ? (
            <tr>
              <td colSpan="5">Aucune réclamation trouvée</td>
            </tr>
          ) : (
            claims?.claims?.map((claim) => (
              <tr key={claim?._id}>
                <td>{claim?.order?.email}</td>
                <td>{claim?.status}</td>
                <td>{claim?.order?.total} €</td>
                <td>{claim?.createdAt?.slice(0, 10)}</td>
                <td>
                  <ViewBtn action={() => router.push(`/admin/claims/${claim._id}`)} text="Voir" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {error && <p>{error}</p>}
      {claims?.pagination?.totalPages > 0 && (
        <Pagination pagination={claims?.pagination} currentPage={page} onPageChange={setPage} />
      )}
    </section>
  );
}
