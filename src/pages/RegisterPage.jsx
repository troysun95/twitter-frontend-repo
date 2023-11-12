import { useState } from "react";
import styles from "styles/RegisterPage.module.scss";
import { ReactComponent as Logo } from "icons/logo.svg";
import { ReactComponent as RegistBtn} from "icons/registBtn.svg"
import RegisterInput from "components/RegisterInput"
import {Register} from "api/auth"
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";


const RegisterPage = ()=>{
    const [account, setAccount] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const navigate = useNavigate("")
    
    
    const handleRegister = async()=>{  
        //判斷錯誤文案，不可空白
        if(account.trim().length === 0){
            Swal.fire({
                position: "top",
                title: "每個欄位皆為必填",
                timer: 1000,
                icon: "error",
                showConfirmButton: false,
              });
              return
        }
        if(name.trim().length === 0){
            Swal.fire({
                position: "top",
                title: "每個欄位皆為必填",
                timer: 1000,
                icon: "error",
                showConfirmButton: false,
              });
              return
        }
        if(email.trim().length === 0){
            Swal.fire({
                position: "top",
                title: "每個欄位皆為必填",
                timer: 1000,
                icon: "error",
                showConfirmButton: false,
              });
              return
        }
        if(password.trim().length === 0){
            Swal.fire({
                position: "top",
                title: "每個欄位皆為必填",
                timer: 1000,
                icon: "error",
                showConfirmButton: false,
              });
              return
        }
        if(checkPassword.trim().length === 0){
            Swal.fire({
                position: "top",
                title: "每個欄位皆為必填",
                timer: 1000,
                icon: "error",
                showConfirmButton: false,
              });
              return
        }
        //字數超過
        if(name.trim().length > 50 ){
            Swal.fire({
                position: "top",
                title: "字數超過上限！",
                timer: 1000,
                icon: "error",
                showConfirmButton: false,
                });
                return
        }
        //密碼不一致
        if(password !== checkPassword ){
            Swal.fire({
                position: "top",
                title: "password跟checkedpassword需一致",
                timer: 1000,
                icon: "error",
                showConfirmButton: false,
              });
              return
        }

        const response = await Register({
            name,
            account,
            email,
            password,
            checkPassword
        });

        if(!response){
            Swal.fire({
                position: "top",
                title: "此account/email已經註冊過",
                timer: 1000,
                icon: "error",
                showConfirmButton: false,
              });
        }else{
            if(response.data.status === "success"){
                navigate('/login')
            }
        }
        

            
        
    }



    return(
        <div className={styles.appContainer}>
            <div className={styles.brandContainer}>
                <Logo/>
            </div>
            <h3>建立你的帳號</h3>
            <div className={styles.content}>
                <RegisterInput
                    label={"帳號"}
                    value={account}
                    placeholder={"請輸入帳號"}
                    onChange={(accountInput) => setAccount(accountInput)}
                />
        
                <RegisterInput
                    label={"名稱"}
                    value={name}
                    placeholder={"請輸入使用者名稱"}
                    onChange={(nameInput) => setName(nameInput)}
                />

                <RegisterInput
                    type="password"
                    label={"Email"}
                    value={email}
                    placeholder={"請輸入 Email"}
                    onChange={(emailInput) => setEmail(emailInput)}
                />

                <RegisterInput
                    type="password"
                    label={"密碼"}
                    value={password}
                    placeholder={"請輸入密碼"}
                    onChange={(passwordInput) => setPassword(passwordInput)}
                />

                <RegisterInput
                    type="password"
                    label={"密碼"}
                    value={checkPassword}
                    placeholder={"請再次輸入密碼"}
                    onChange={(checkPasswordInput) => setCheckPassword(checkPasswordInput)}
                />
            </div>
            <button> <RegistBtn  onClick={handleRegister}/></button>
            <div className={styles.linkText} onClick={()=>{navigate('/login')}}>取消</div>
        </div>
    )
}

export default RegisterPage;