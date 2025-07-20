"use client";
import { useState } from "react";
import styles from "../../admin.module.css";
import OneLatestOrder from "./OneLatestOrder";
import Pagination from "./Pagination";

const fakeOrders = [
  { id: "1", client: "Jean Dupont", status: "Livré" },
  { id: "2", client: "Alice Martin", status: "En cours" },
  { id: "3", client: "Léo Dubois", status: "Annulée" },
  { id: "4", client: "Sarah Chevalier", status: "Livré" },
  { id: "5", client: "Karim Benz", status: "Livré" },
  { id: "6", client: "Fatima Ouali", status: "En cours" },
  { id: "7", client: "Thomas Durand", status: "Annulée" },
  { id: "8", client: "Julie Petit", status: "Livré" },
  { id: "9", client: "Luc Moreau", status: "En cours" },
  { id: "10", client: "Nora Bensalem", status: "Livré" },
  { id: "11", client: "Rayan Lefevre", status: "Annulée" },
  { id: "12", client: "Emma Collin", status: "Livré" },
  { id: "13", client: "Yanis Haddad", status: "En cours" },
  { id: "14", client: "Clara Fontaine", status: "Livré" },
  { id: "15", client: "Mehdi Gharbi", status: "Annulée" },
  { id: "16", client: "Sophie Lemoine", status: "Livré" },
  { id: "17", client: "Adel Maarek", status: "Livré" },
  { id: "18", client: "Lina Rousseau", status: "En cours" },
  { id: "19", client: "Noé Caron", status: "Livré" },
  { id: "20", client: "Camille Blin", status: "Annulée" },
  { id: "21", client: "Zineb Lahlou", status: "Livré" },
  { id: "22", client: "Nassim Belkacem", status: "En cours" },
  { id: "23", client: "Inès Louati", status: "Livré" },
  { id: "24", client: "Malo Tanguy", status: "Annulée" },
  { id: "25", client: "Imane Khadraoui", status: "Livré" },
  { id: "26", client: "Eliott Garnier", status: "Livré" },
   { id: "1", client: "Jean Dupont", status: "Livré" },
  { id: "2", client: "Alice Martin", status: "En cours" },
  { id: "3", client: "Léo Dubois", status: "Annulée" },
  { id: "4", client: "Sarah Chevalier", status: "Livré" },
  { id: "5", client: "Karim Benz", status: "Livré" },
  { id: "6", client: "Fatima Ouali", status: "En cours" },
  { id: "7", client: "Thomas Durand", status: "Annulée" },
  { id: "8", client: "Julie Petit", status: "Livré" },
  { id: "9", client: "Luc Moreau", status: "En cours" },
  { id: "10", client: "Nora Bensalem", status: "Livré" },
  { id: "11", client: "Rayan Lefevre", status: "Annulée" },
  { id: "12", client: "Emma Collin", status: "Livré" },
  { id: "13", client: "Yanis Haddad", status: "En cours" },
  { id: "14", client: "Clara Fontaine", status: "Livré" },
  { id: "15", client: "Mehdi Gharbi", status: "Annulée" },
  { id: "16", client: "Sophie Lemoine", status: "Livré" },
  { id: "17", client: "Adel Maarek", status: "Livré" },
  { id: "18", client: "Lina Rousseau", status: "En cours" },
  { id: "19", client: "Noé Caron", status: "Livré" },
  { id: "20", client: "Camille Blin", status: "Annulée" },
  { id: "21", client: "Zineb Lahlou", status: "Livré" },
  { id: "22", client: "Nassim Belkacem", status: "En cours" },
  { id: "23", client: "Inès Louati", status: "Livré" },
  { id: "24", client: "Malo Tanguy", status: "Annulée" },
  { id: "25", client: "Imane Khadraoui", status: "Livré" },
  { id: "26", client: "Eliott Garnier", status: "Livré" },
];

export default function LatestOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = fakeOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(fakeOrders.length / ordersPerPage);

  return (
    <section aria-labelledby="latest-orders-title">
      <h2 id="latest-orders-title">Dernières Commandes</h2>
      <hr />
      <table className={styles.latestOrdersTable}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Client</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <OneLatestOrder
              key={`${index}-${order.client}`}
              id={order.id}
              client={order.client}
              status={order.status}
            />
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </section>
  );
}
