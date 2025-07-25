"use client";
import { useState } from "react";
import styles from "../../admin.module.css";
import userStyles from "../../_components/UsersComponents/usersComponent.module.css";
import UserDetailsModal from "../../_components/UsersComponents/UserDetailsModal";
import InputSearchByEmail from "../../_components/reusable/inputSearchByEmail";

const fakeUsers = [
  {
    _id: "1",
    name: "Jean",
    lastName: "Dupont",
    phone: "0601020304",
    email: "jean.dupont@email.com",
    address: "12 rue de Paris, Lyon",
    validateEmail: true,
    avatar: "avatarDefault.webp",
    verifyProfile: true,
    isAdmin: false,
    favoritesProduct: [],
    createdAt: "2024-01-11T06:16:54.564Z",
  },
  {
    _id: "2",
    name: "Sophie",
    lastName: "Durand",
    phone: "0611223344",
    email: "sophie.durand@email.com",
    address: "45 avenue des Lilas, Marseille",
    validateEmail: false,
    avatar: "avatarDefault.webp",
    verifyProfile: false,
    isAdmin: false,
    favoritesProduct: ["1", "2"],
    createdAt: "2024-02-11T06:16:54.564Z",
  },
  {
    _id: "3",
    name: "Marie",
    lastName: "Martin",
    phone: "0611223344",
    email: "marie.martin@email.com",
    address: "12 rue de Paris, Lyon",
    validateEmail: true,
    avatar: "avatarDefault.webp",
    verifyProfile: true,
    isAdmin: false,
    favoritesProduct: ["1", "2"],
    createdAt: "2024-01-11T06:16:54.564Z",
  },
  {
    _id: "4",
    name: "Julie",
    lastName: "Lefebvre",
    phone: "0611223344",
    email: "julie.lefebvre@email.com",
    address: "12 rue de Paris, Lyon",
    validateEmail: true,
    avatar: "avatarDefault.webp",
    verifyProfile: true,
    isAdmin: false,
    favoritesProduct: ["1", "2"],
    createdAt: "2024-01-11T06:16:54.564Z",
  },
  {
    _id: "5",
    name: "Paul",
    lastName: "Garcia",
    phone: "0611223344",
    email: "paul.garcia@email.com",
    address: "12 rue de Paris, Lyon",
    validateEmail: true,
    avatar: "avatarDefault.webp",
    verifyProfile: true,
    isAdmin: false,
    favoritesProduct: ["1", "2"],
    createdAt: "2024-01-11T06:16:54.564Z",
  },
];

export default function Users() {
  const [emailSearch, setEmailSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = fakeUsers.filter((user) => user.email.toLowerCase().includes(emailSearch.toLowerCase()));

  return (
    <section aria-labelledby="section-users" className={styles.adminContent}>
      <h3 id="section-users">Utilisateurs</h3>

      <InputSearchByEmail emailSearch={emailSearch} setEmailSearch={setEmailSearch} />

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
          {filteredUsers.map((user) => (
            <tr
              key={user._id}
              className={userStyles.clickableRow}
              onClick={() => setSelectedUser(user)}
              role="button"
              aria-label={` Voir les détails de l'utilisateur ${user.name} ${user.lastName}`}
              tabIndex={selectedUser ? -1 : 0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !selectedUser) {
                  setSelectedUser(user);
                }
              }}
            >
              <td data-label="Nom">{user.lastName}</td>
              <td data-label="Prénom">{user.name}</td>
              <td data-label="Téléphone">{user.phone}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Adresse">{user.address}</td>
              <td data-label="Email validé">{user.validateEmail ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </section>
  );
}
