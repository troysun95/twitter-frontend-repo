import styles from "styles/MainNavbar.module.scss";

export default function NavItem({ title, children }) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemWrapper}>
        {/* <i></i> */}
        {children}
        <div className={styles.navtitle}>{title}</div>
      </div>
    </div>
  );
}
