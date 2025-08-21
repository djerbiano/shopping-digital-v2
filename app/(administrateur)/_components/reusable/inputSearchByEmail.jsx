import styles from "../../admin.module.css";

export default function InputSearchByEmail({ emailSearch, setEmailSearch, functionToCall = null }) {
  return (
    <div className={styles.searchBar}>
      <label htmlFor="emailSearch" className={styles.srOnly}>
        Rechercher par email:
      </label>
      <input
        type="search"
        id="emailSearch"
        name="email"
        placeholder="Rechercher par email..."
        value={emailSearch}
        onChange={(e) => setEmailSearch(e.target.value)}
      />
      <button type="button" aria-label="Rechercher" onClick={functionToCall} className={styles.searchButton}>
        Rechercher
      </button>
    </div>
  );
}
