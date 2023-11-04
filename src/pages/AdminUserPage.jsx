import AdminUsers from "components/AdminUserCollection";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";
import styles from "styles/Layout2.module.scss"

const AdminUserPage = () => {
  return (
    <>
    <div className={styles.appContainer}>
      <div className={styles.navbarContainer}>
        <MainNavbar>
          <NavItem title="推文清單">
            <HomeIcon />
          </NavItem>

          <NavItem title="使用者列表">
            <UserActiveIcon />
          </NavItem>
        </MainNavbar>
        </div>
        <div className={styles.content}>
        <AdminUsers />
        </div>

      
      

    </div>
      
    </>
  );
}

export default AdminUserPage