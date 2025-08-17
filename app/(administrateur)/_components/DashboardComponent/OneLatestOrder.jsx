"use client";
import styles from "../../admin.module.css";
import { useRouter } from "next/navigation";
export default function OneLatestOrder({ date, email, status, orderId }) {
  const router = useRouter();
  let statusClass = "";
  if (status === "expédiée" || status === "payée") statusClass = "statusBlue";
  else if (status === "reçue") statusClass = "statusGreen";
  else if (status === "annulée") statusClass = "statusRed";

  return (
    <tr onClick={() => router.push(`/admin/orders/${orderId}`)} className={styles.cursorPointer}>
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
