import AdminUsers from "components/AdminUserCollection";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";
import styles2 from "styles/Layout2.module.scss";
import { getUsers } from "../api/twitter.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsersAsync = async () => {
      try {
        const users = await getUsers();
        console.log("admin users", users);
        setUsers(users.map((user) => ({ ...user })));
      } catch (error) {
        console.error(error);
      }
    };
    getUsersAsync();
  }, []);

  return (
    <>
      <div className={styles2.appContainer}>
        <div className={styles2.navbarContainer}>
          <MainNavbar>
            <div onClick={() => navigate("/admin/main")}>
              <NavItem title="推文清單">
                <HomeIcon />
              </NavItem>
            </div>
            <div onClick={() => navigate("/admin/users")}>
              <NavItem title="使用者列表">
                <UserActiveIcon />
              </NavItem>
            </div>
          </MainNavbar>
        </div>
        <div className={styles2.content}>
          <AdminUsers users={users} />
        </div>
      </div>
    </>
  );
};

export default AdminUserPage;
