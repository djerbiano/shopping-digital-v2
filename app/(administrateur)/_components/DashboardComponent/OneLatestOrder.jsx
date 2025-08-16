import styles from "../../admin.module.css";
export default function OneLatestOrder({ date, email, status }) {
  let statusClass = "";
  if (status === "expédiée" || status === "payée") statusClass = "statusBlue";
  else if (status === "reçue") statusClass = "statusGreen";
  else if (status === "annulée") statusClass = "statusRed";

  return (
    <tr>
      <td>
        {new Date(date).toLocaleString("fr-FR", {
          timeZone: "Europe/Paris",
        })}
      </td>
      <td>{email}</td>
      <td>
        <span className={styles[statusClass]}>{status}</span>
      </td>
    </tr>
  );
}
