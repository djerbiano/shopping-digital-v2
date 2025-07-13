import styles from "../admin.module.css";
import { FaEuroSign } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { ImSad } from "react-icons/im";
import Banner from "../_components/DashboardComponent/Banner";
import Statistical from "../_components/DashboardComponent/Statistical";
import LatestOrders from "../_components/DashboardComponent/LatestOrders";
export default function MonCompte() {
  return (
    <section aria-labelledby="section-admin" className={styles.adminContent}>
      <h3 id="section-admin">Dashboard</h3>

      <div className={styles.dashboardBannersContainer}>
        <Banner
          logo1={<FaEuroSign fill="#ffaa55" />}
          title="Ventes"
          revenue="30 000 €"
          logo2={<FaArrowUp />}
          percentage="7% (30 jours)"
        />
        <Banner
          logo1={<HiOutlineShoppingCart fill="green" stroke="green" />}
          title="Commandes"
          revenue="3 500 €"
          logo2={<FaArrowDown />}
          percentage="-5% (7 jours)"
          negative={true}
        />
        <Banner
          logo1={<FaRegUser fill="#007cff" />}
          title="Users"
          revenue="800"
          logo2={<FaArrowDown />}
          percentage="-10% (7 jours)"
          negative={true}
        />
        <Banner
          logo1={<ImSad fill="#ff0000" />}
          title="Réclamations"
          revenue="10"
          logo2={<FaArrowUp />}
          percentage="2% (7 jours)"
        />
      </div>
      <Statistical />
      <LatestOrders />
    </section>
  );
}
