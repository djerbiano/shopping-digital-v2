import styles from "../../admin.module.css";
import { CiSettings } from "react-icons/ci";

export default function UpdateBtn({ action, text }) {
  return (
    <button type="button" className={styles.updateBtn} title={text} aria-label={text} onClick={action}>
      <CiSettings />
    </button>
  );
}
