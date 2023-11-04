import { useState } from "react";
import styles from "styles/AdminPage.module.scss";
import { ReactComponent as AdminLogInBtn } from "icons/adminLoginBtn.svg";
import { ReactComponent as Logo } from "icons/logo.svg";
import {adminLogin} from '../api/auth'

const AuthInput = ({ type, label, value, placeholder, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <input
        type={type || "text"}
        value={value || ""} //若外層沒有帶入 props 就預設給一個空字串
        placeholder={placeholder || ""} //若外層沒有帶入 props 就預設給一個空字串
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
};

const AdminPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

 
  
  //handler
  const handleClick = async () => {

    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    //確認輸入值
    console.log(`輸入的帳號為 ${account}`);
    console.log(`輸入的密碼為 ${password}`);

    const  data = await adminLogin({
      account,
      password
    });
    console.log(`回傳資料${data}`)
  };


  return (
    <div className={styles.adminLogInContainer}>
      <div className={styles.brandContainer}>
        <Logo/>
      </div>
      <h3>後台登入</h3>
      <div>
        <AuthInput
          label={"帳號"}
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(nameInputValue) => setAccount(nameInputValue)}
        />

        <AuthInput
          type="password"
          label={"密碼"}
          value={password}
          placeholder={"請輸入密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </div>
      <button>
        <AdminLogInBtn  onClick={handleClick}/>
      </button>
      <div className={styles.linkText}>前台登入</div>
    </div>
  );
};

export default AdminPage;