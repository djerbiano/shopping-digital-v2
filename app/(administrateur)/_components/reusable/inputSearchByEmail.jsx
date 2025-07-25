import styles from "../../admin.module.css";

export default function InputSearchByEmail({ emailSearch, setEmailSearch }) {
  return (
    <div className={styles.searchBar}>
      <label htmlFor="emailSearch" className={styles.srOnly}>
        Rechercher par email:
      </label>
      <input
        type="search"
        id="emailSearch"
        placeholder="Rechercher par email..."
        value={emailSearch}
        onChange={(e) => setEmailSearch(e.target.value)}
      />
    </div>
  );
}
