import { useState } from "react";

import styles from "styles/AdminPage.module.scss";
import { ReactComponent as LoginBtn } from "icons/adminLoginBtn.svg";
import { ReactComponent as Logo } from "icons/logo.svg";
import {Login} from '../api/auth'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'

<<<<<<< HEAD
const AuthInput = ({ type, label, value, placeholder, onChange, errMsg }) => {
=======
const AuthInput = ({ type, label, value, placeholder, onChange, errMassage }) => {
>>>>>>> 82d3d1e (add error hint)
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <input
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={(event) => onChange?.(event.target.value)}
      />
<<<<<<< HEAD
      <div className={styles.errMsg}>{errMsg}</div>
=======
      <div className={styles.errMassage}>{errMassage}</div>
>>>>>>> 82d3d1e (add error hint)
    </div>
  );
};

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [isAccEr, setIsAccer] = useState(false)
=======
  const [isAccountErr, setIsAccountErr] = useState(false)
>>>>>>> 82d3d1e (add error hint)
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
      localStorage.setItem("user", JSON.stringify(data.user)) 
<<<<<<< HEAD


=======
>>>>>>> 82d3d1e (add error hint)
      Swal.fire({
        position: "top",
        title: "登入成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      setIsAccer(false)
      navigate("/main");
    } else {
      Swal.fire({
        position: "top",
<<<<<<< HEAD
        title: "帳號不存在",
=======
        title: "帳號不存在！",
>>>>>>> 82d3d1e (add error hint)
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
<<<<<<< HEAD
      setIsAccer(true)
=======
      setIsAccountErr(true)      
      //navigate('/login')
      
>>>>>>> 82d3d1e (add error hint)
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
<<<<<<< HEAD
          errMsg={isAccEr ? '帳號不存在！' : ''}
=======
          errMassage={isAccountErr ? '帳號不存在！' : ''}
>>>>>>> 82d3d1e (add error hint)
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
