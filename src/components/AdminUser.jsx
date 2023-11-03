import AdminUserCollection from "components/AdminUserCollection";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";

const AdminUser = () => {
  return (
    <>
      <MainNavbar>
        <NavItem title="推文清單">
          <HomeIcon />
        </NavItem>

        <NavItem title="使用者列表">
          <UserActiveIcon />
        </NavItem>
      </MainNavbar>
      <AdminUserCollection />
    </>
  );
}

export default AdminUser