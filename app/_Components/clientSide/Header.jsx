import styles from "../../page.module.css";
import InputSearchBar from "./InputSearchBar";
export default function Header() {
  return (
    <header>
      <div className={styles.iconHeaderContainer}>
        <h1 className={styles.iconHeader}>
          Shoping <span>Digital</span>
        </h1>
      </div>
      <InputSearchBar />
    </header>
  );
}
