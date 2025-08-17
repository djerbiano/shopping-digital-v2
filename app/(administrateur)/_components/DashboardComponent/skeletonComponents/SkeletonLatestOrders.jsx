"use client";
import styles from "../../../admin.module.css";

export default function SkeletonLatestOrders({ count = 5 }) {
  return (
    <section aria-labelledby="latest-orders-title">
      <h2 id="latest-orders-title">Dernières Commandes</h2>
      <hr />
      <table className={styles.latestOrdersTable}>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }).map((_, i) => (
            <tr key={i}>
              <td>
                <span className={styles.skeleton}></span>
              </td>
              <td>
                <span className={styles.skeleton}></span>
              </td>
              <td>
                <span className={styles.skeleton}></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
