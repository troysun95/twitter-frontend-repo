// import { useState } from "react";
import { useState, useEffect } from "react";//add
import {Login, checkPermission} from '../api/auth'

import styles from "styles/AdminPage.module.scss";
import { ReactComponent as AdminLogInBtn } from "icons/adminLoginBtn.svg";
import { ReactComponent as Logo } from "icons/logo.svg";
// import {Login} from '../api/auth'
import Swal from 'sweetalert2';
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
  const navigate = useNavigate('')

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
    password
    });

    if(data.success){
      localStorage.setItem("authToken", data.token);
      //localStorage.setItem('Authorization', JSON.stringify(Authorization));
      //將 userid儲存進去，以幫助跳轉使用者時使用
      // localStorage.setItem('user', data.user)
      localStorage.setItem("user", JSON.stringify(data.user)) //try

      Swal.fire({
        position: "top",
        title: "登入成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      navigate('/main')
    }else{
        Swal.fire({
            position: 'top',
            title: '登入失敗！',
            timer: 1000,
            icon: 'error',
            showConfirmButton: false,
        });
      }
    };

  useEffect(() => {
    //add
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        return;
      }
      const result = await checkPermission(authToken);

      if (result) {
        navigate('/main');
      }
    };
    checkTokenIsValid();
  }, [navigate]);
  
  return (
    <div className={styles.adminLogInContainer}>
      <div className={styles.brandContainer}>
        <Logo/>
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
        <AdminLogInBtn  onClick={handleClick}/>
      </button>
      <div className={styles.linkText} onClick={()=>{navigate('/register')}}>註冊</div>
      <div className={styles.linkText} onClick={()=>{navigate('/admin')}}>後台登入</div>
    </div>
  );
};

export default LoginPage;