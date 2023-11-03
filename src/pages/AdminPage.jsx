import { useEffect } from "react";

import AdminUser from "./components/AdminUser";
// import AdminLogIn from "./component/AdminLogin"
import { getAdminPage } from "../api/auth";

const AdminPage = () => {
  useEffect(() => {
    const getAdminUserAsync = async () => {
      try {
        await getAdminPage();
      } catch (error) {
        console.error(error);
      }
    };
    getAdminUserAsync();
  }, []);

  return (
    <>
    {/* <AdminLogIn /> */}
      <AdminUser/>
    </>
  );
}

export default AdminPage;