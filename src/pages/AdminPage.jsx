import { useState,useEffect } from "react";
import styles from "styles/AdminPage.module.scss";
import { ReactComponent as AdminLogInBtn } from "icons/adminLoginBtn.svg";
import { ReactComponent as Logo } from "icons/logo.svg";
import {adminLogin, checkTokenIsValid} from '../api/auth'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"; 

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
  const navigate = useNavigate('')
  
  
  //handler
  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    const  {success, authToken} = await adminLogin({
      account,
      password
    });
    //const  loginok = success
    console.log(success)
    if(success === true){
      localStorage.setItem('authToken', authToken);
      //console.log('success')
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
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
//攜帶驗證並跳轉頁面

// useEffect(() => {
  
//   const checkTokenIsValid = async () => {
//     const authToken = localStorage.getItem('authToken');
//     if (authToken) {
//       return {
//         headers: {
//           Authorization: 'Bearer ' + authToken,
//         }};
//         navigate('/admin/main')
//     }else{return }
//     // const result = await checkPermission(authToken);
//     // if (result) {
//     //   //navigate('/admin/main');
//     // }
//   };

//   checkTokenIsValid();
// }, [navigate]);

useEffect(() => {
  const checkAndNavigate = async () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const AuthKey = await checkTokenIsValid(authToken)
      if(AuthKey){navigate('/admin/main');}
    } else {
      console.log('fail to get Authorize')
      localStorage.removeItem('authToken');
    }
  };

  checkAndNavigate();
}, [navigate]);



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