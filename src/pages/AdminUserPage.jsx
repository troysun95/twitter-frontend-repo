import AdminUsers from "components/AdminUserCollection";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";
import styles from "styles/Layout2.module.scss"
import {getUsers} from '../api/twitter.js'
import { useEffect, useState } from 'react';

const AdminUserPage = () => {
 const [users, setUsers] = useState([])



  useEffect(() => {
    const getUsersAsync = async () => {
      try {
        const users = await getUsers();
        setUsers(users.map((user) => ({...user})));
      } catch (error) {
        console.error (error);
      } 
    };
    getUsersAsync();
  }, []);

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
        <AdminUsers users={users}/>
        </div>

      
      

    </div>
      
    </>
  );
}

export default AdminUserPage