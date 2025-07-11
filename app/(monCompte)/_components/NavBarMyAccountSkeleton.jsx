import styles from "../myAccount.module.css";

export default function NavBarMyAccountSkeleton() {
  return (
    <aside className={styles.navBarMyAccount}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className={styles.skeletonButton} />
      ))}
    </aside>
  );
}
