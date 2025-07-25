import styles from "../../admin.module.css";

export default function ViewBtn({ action, text }) {
  return (
    <button type="button" className={styles.updateBtn} title={text} aria-label={text} onClick={action}>
      Voir
    </button>
  );
}
