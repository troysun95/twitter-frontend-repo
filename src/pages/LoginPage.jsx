import { useState } from "react";

import styles from "styles/AdminPage.module.scss";
import { ReactComponent as LoginBtn } from "icons/adminLoginBtn.svg";
import { ReactComponent as Logo } from "icons/logo.svg";
import {Login} from '../api/auth'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AuthInput = ({ type, label, value, placeholder, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <input
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
};

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate('');

  //handler
  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    const data = await Login({
      account,
      password,
    });


    if(data.success){

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)) //try


      Swal.fire({
        position: "top",
        title: "登入成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/main");
    } else {
      Swal.fire({
        position: "top",
        title: "登入失敗！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className={styles.adminLogInContainer}>
      <div className={styles.brandContainer}>
        <Logo />
      </div>
      <h3>登入 Alphitter</h3>
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
        <LoginBtn  onClick={handleClick}/>
      </button>
      <div className={styles.linkWrapper}>
        <div className={styles.linkText} onClick={()=>{navigate('/register')}}>註冊</div>
        <span className={styles.dot}>.</span>
        <div className={styles.linkText} onClick={()=>{navigate('/admin')}}>後台登入</div>
      </div>
    </div>
  );
};

export default LoginPage;
