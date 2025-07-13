import styles from "../../admin.module.css";
export default function OneLatestOrder({ id, client, status }) {
  let statusClass = "";
  if (status === "En cours") statusClass = "statusBlue";
  else if (status === "Livré") statusClass = "statusGreen";
  else if (status === "Annulée") statusClass = "statusRed";

  return (
    <tr>
      <td>{id}</td>
      <td>{client}</td>
      <td>
        <span className={styles[statusClass]}>{status}</span>
      </td>
    </tr>
  );
}
