import { useState } from "react";
import styles from "styles/Layout1.module.scss";
import { ReactComponent as Logo } from "icons/logo.svg";
import { ReactComponent as RegistBtn} from "icons/registBtn.svg"
import {Regist} from '../api/auth'
//import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"; 


const RegistInput = ({ type, label, value, placeholder, onChange }) => {
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

const RegisterPage = ()=>{
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate('')

    //handler
    const handleRegist =async()=>{
        //驗證資料正確，state: isAvalabe

        //post.(api/users)
        const response = await Regist()
        console.log(response)
    }



    return(
        <div className={styles.adminLogInContainer}>
        <div className={styles.brandContainer}>
          <Logo/>
        </div>
        <h3>登入 Alphitter</h3>
        <div>
          <RegistInput
            label={"帳號"}
            value={account}
            placeholder={"請輸入帳號"}
            onChange={(nameInputValue) => setAccount(nameInputValue)}
          />
  
          <RegistInput
            type="password"
            label={"密碼"}
            value={password}
            placeholder={"請輸入密碼"}
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          />

          <RegistInput
            type="password"
            label={"密碼"}
            value={password}
            placeholder={"請輸入密碼"}
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          />


          <RegistInput
            type="password"
            label={"密碼"}
            value={password}
            placeholder={"請輸入密碼"}
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          />



  
        </div>
        <button>
          <RegistBtn  onClick={handleRegist}/>
        </button>
        <div className={styles.linkText} onClick={()=>{navigate('/register')}}>註冊</div>
        <div className={styles.linkText} onClick={()=>{navigate('/admin')}}>後台登入</div>
      </div>
    )
}

export default RegisterPage;