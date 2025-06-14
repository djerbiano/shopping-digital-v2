import styles from "../../page.module.css";
import { MdHeadsetMic } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
export default function LinkIconHeader() {
  return (
    <div className={styles.linkIconHeader}>
      <button type="button" aria-label="Contactez-nous">
        <MdHeadsetMic  aria-hidden="true"/>
      </button>

      <button type="button" aria-label="Panier">
        <BsFillCartCheckFill aria-hidden="true" />
      </button>
      <button type="button" aria-label="Favoris">
        <MdFavorite aria-hidden="true" />
      </button>
      <button type="button" aria-label="Mon compte">
        <FaUserAlt aria-hidden="true" />
      </button>
    </div>
  );
}
