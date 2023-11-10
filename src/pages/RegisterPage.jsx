import { useState } from "react";
import styles from "styles/RegisterPage.module.scss";
import { ReactComponent as Logo } from "icons/logo.svg";
import { ReactComponent as RegistBtn} from "icons/registBtn.svg"
import RegisterInput from "components/RegisterInput"
import {Register} from "api/auth"
import { useNavigate } from "react-router-dom"; 



const RegisterPage = ()=>{
    const [account, setAccount] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const navigate = useNavigate("")
    
    
    const handleRegister = async()=>{   
        //   判斷 ：1. 驗證資料正確，state: isAvalabe 
        
        const response = await Register({
            name,
            account,
            email,
            password,
            checkPassword
        });
        console.log(response)
        if(response.data.status === "success"){
            console.log('註冊成功！')
            console.log(`註冊資料如下${response.data.user}`)
            navigate('/login')
        }else{

            console.log('註冊失敗！')
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