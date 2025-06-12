import styles from "../../page.module.css";
import { IoIosSearch } from "react-icons/io";

export default function InputSearchBar() {
  return (
    <div className={styles.inputSearchBarContainer}>
      <label htmlFor="search">
        <IoIosSearch />
      </label>
      <input type="search" name="search" id="search" />
    </div>
  );
}
