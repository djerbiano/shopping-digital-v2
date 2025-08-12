import styles from "../../myAccount.module.css";
import skeleton from "./singleOrderSkeleton.module.css";

export default function SingleOrderSkeleton() {
  return (
    <div className={skeleton.wrapper}>
      <table className={styles.myAccountTable}>
        <tbody>
          <tr>
            <td>
              <div className={skeleton.skeletonBox} style={{ width: "140px" }}></div>
            </td>
          </tr>

          <tr>
            <td colSpan="3">
              <div
                className={skeleton.skeletonBox}
                style={{ width: "100px", height: "18px", marginBottom: "8px" }}
              ></div>
              <div className={skeleton.skeletonBox} style={{ width: "100%", height: "18px" }}></div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="3">
              <div className={skeleton.skeletonButton}></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
