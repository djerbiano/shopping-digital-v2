"use client";
import styles from "../../admin.module.css";
import { useState, useEffect, useRef } from "react";
import userStyles from "../../_components/UsersComponents/usersComponent.module.css";
import UserDetailsModal from "../../_components/UsersComponents/UserDetailsModal";
import InputSearchByEmail from "../../_components/reusable/inputSearchByEmail";
import Pagination from "../../_components/DashboardComponent/Pagination";
import toast from "react-hot-toast";

export default function Users() {
  const mounted = useRef(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [limitUsers, setLimitUsers] = useState(5);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [page, setPage] = useState(1);
  const [emailSearch, setEmailSearch] = useState("");

  const fetchUsers = async () => {
    const queryUsers = {};
    if (emailSearch !== "") queryUsers.email = emailSearch.trim();

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limitUsers", limitUsers);

    if (Object.keys(queryUsers).length > 0) {
      params.set("queryUsers", JSON.stringify(queryUsers));
    }

    const endpoint = `/api/admin/users?${params.toString()}`;
    try {
      setLoadingUsers(true);
      const response = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
        toast.success("Utilisateurs chargés");
      } else {
        toast.error(data.message || "Une erreur est survenue lors de la récupération des utilisateurs");
        console.error(data.message || "Une erreur est survenue lors de la récupération des utilisateurs");
      }
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue lors de la récupération des utilisateurs");
      console.error(error);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limitUsers]);

  useEffect(() => {
    if (mounted.current) {
      if (emailSearch === "") {
        fetchUsers();
      }
    } else {
      mounted.current = true;
    }
  }, [emailSearch]);

  if (loadingUsers) {
    return (
      <section aria-labelledby="section-users" className={styles.adminContent}>
        <h3 id="section-users">Utilisateurs</h3>
        <p>Chargement...</p>
      </section>
    );
  }
  return (
    <section aria-labelledby="section-users" className={styles.adminContent}>
      <h3 id="section-users">Utilisateurs</h3>

      <InputSearchByEmail emailSearch={emailSearch} setEmailSearch={setEmailSearch} functionToCall={fetchUsers} />
      <label htmlFor="limitUsers">Nombre d'utilisateurs par page</label>
      <select
        name="limitUsers"
        id="limitUsers"
        value={limitUsers}
        aria-label="Nombre d'utilisateurs par page"
        className={userStyles.selectPageUsers}
        onChange={(e) => {
          setPage(1);
          setLimitUsers(Number(e.target.value));
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

      <table className={userStyles.userTable}>
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Téléphone</th>
            <th scope="col">Email</th>
            <th scope="col">Adresse</th>
            <th scope="col">Email validé</th>
          </tr>
        </thead>
        <tbody>
          {users?.users?.length <= 0 ? (
            <tr>
              <td colSpan="6">Aucun utilisateur trouvé</td>
            </tr>
          ) : (
            users?.users?.map((user) => (
              <tr
                key={user._id}
                className={userStyles.clickableRow}
                role="button"
                aria-label={` Voir les détails de l'utilisateur ${user.name} ${user.lastName}`}
                tabIndex={selectedUser ? -1 : 0}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " " || e.key === "Escape") && !selectedUser) {
                    setSelectedUser(user);
                  }
                }}
                onClick={() => setSelectedUser(user)}
              >
                <td data-label="Nom">{user.lastName}</td>
                <td data-label="Prénom">{user.name}</td>
                <td data-label="Téléphone">{user.phone}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Adresse">{user.address}</td>
                <td data-label="Email validé">{user.validateEmail ? "✅" : "❌"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} refetchUsers={fetchUsers} />
      )}
      {users?.pagination?.totalPages > 0 && (
        <Pagination pagination={users?.pagination} currentPage={page} onPageChange={setPage} />
      )}
    </section>
  );
}
