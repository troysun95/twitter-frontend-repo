import styles from "styles/Layout2.module.scss";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import SettingInput from "components/SettingInput"
import { ReactComponent as SettingActiveIcon } from "icons/settingActive.svg";
import {ReactComponent as HomeIcon} from "icons/home.svg"
import {ReactComponent as UserIcon} from "icons/user.svg";
import {ReactComponent as SaveBtn} from "icons/saveBtn.svg";
<<<<<<< HEAD
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {EditUser} from "api/twitter"
import Swal from "sweetalert2";
//import SettingAccountInput from "components/SettingAccountInput"
=======
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import {EditUser} from "api/twitter"
import SettingAccountInput from "components/SettingAccountInput"
//import Swal from "sweetalert2";

>>>>>>> 82d3d1e (add error hint)


const SettingPage = ()=> {
    const navigate = useNavigate();
    //取出帳密
    const user = JSON.parse(localStorage.getItem("user"))
    
    //onChange 紀錄Input 
    const [account, setAccount]=useState(user.account);
    const [name, setName]=useState(user.name);
    const [email, setEmail]=useState(user.email);
    const [password, setPassword]=useState('');
    const [checkPassword, setChecPassword] = useState('');
<<<<<<< HEAD
=======
    //const [nameError, setNameError ] = useState(false);
    const [passwordError, setPasswordError ] = useState(false);
    const [emailError, setEmailError ] = useState(false);
    const [accountError, setAccountError ] = useState(false);



   

    //顯示錯誤文案用
    useEffect(() => {
        if(password.length === 0){
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        if(account.length === 0){
            setAccountError(true)
        }else{
            setAccountError(false)
        }

        if(email.lengnth === 0){
            setEmailError(true)
        }else{
            setEmailError(false)
        }

      


    }, [name, password, checkPassword, email, account]);

    const handleError1 = ()=>{
        if(checkPassword.length === 0){
            return "每個欄位皆必填"
        }else if(checkPassword !== password){
            return "password跟checkedpassword需一致"
        }else{
            return ''
        }
    }

   

>>>>>>> 82d3d1e (add error hint)
    
    // //登出按鈕
    const handleLogout = ()=>{
        localStorage.removeItem('authToken');
        localStorage.removeItem('user')
        navigate('/login')
    }


    const CheckInputsAvalible = ()=>{
        if(account.trim().lengnth === 0){
   
            return
        }
        if(name.trim().lengnth === 0 || name.length >50){
     
            return
        }
        if(email.trim().lengnth === 0){
    
            return
        }
        if(password.trim().lengnth === 0){
      
            return
        }
        if(password.trim().lengnth === 0){
       
            return
        }
        if(checkPassword.length === 0){
            return
        }
        if(checkPassword !== password){
          
            return
        }
        if(name.trim().length > 50){
     
            return
        }
        return true;
    }
    
     

    const handleSave = async()=>{
        if(CheckInputsAvalible()){
            //api 格式來源要求為 from data
            const formData = {
                account,
                name,
                email,
                password,
                checkPassword
            }
            const response = await EditUser(user.id, formData)
<<<<<<< HEAD
            if(!response){
                Swal.fire({
                    position: "top",
                    title: "此account/email已經註冊過",
                    timer: 1000,
                    icon: "error",
                    showConfirmButton: false,
                  });
            }else{
                console.log(response)
                navigate('/main')
            }
            
        }       
=======
            console.log(response)
        }else{

        }
>>>>>>> 82d3d1e (add error hint)
    }




    return(
        <div className={styles.appContainer}>
            <div className={styles.navbarContainer}>
                <MainNavbar handleLogout={handleLogout}>
                    <div onClick={()=>{navigate('/main')}}>
                        <NavItem title="首頁"  >
                            <HomeIcon/>
                        </NavItem>
                    </div>
                    <div onClick={()=>{navigate('/user')}}>
                        <NavItem title="個人資料"  >
                            <UserIcon/>
                        </NavItem>
                    </div>
                    <div onClick={()=>{navigate('/setting')}}>
                        <NavItem title="設定">
                            <SettingActiveIcon/>
                        </NavItem>
                    </div>
                </MainNavbar>
            </div>
            <div className={styles.content}>
                <div className={styles.headerContainer}>
                    <h4>帳戶設定</h4>
                </div>
                    <SettingAccountInput 
                        label="帳號"  
                        placeholder= "" 
                        value={account}
                        onChange={(accountInput)=>{setAccount(accountInput)}}
<<<<<<< HEAD
                        // errMassage=" "
=======
                        errMassage={accountError ? "每個欄位皆必填" : '' }
>>>>>>> 82d3d1e (add error hint)
                    />
                    <SettingInput 
                        label="名稱"  
                        placeholder= "" 
                        value={name} 
                        onChange={(nameInput)=>{setName(nameInput)}}
<<<<<<< HEAD
                        // errMassage={nameError ? "字數超過上限！" : " " }
=======
                        errMassage={ '' }
>>>>>>> 82d3d1e (add error hint)
                    />
                    <SettingInput
                        label="Email" 
                        value={email} 
                        onChange={(emailInput)=>{setEmail(emailInput)}}
<<<<<<< HEAD
                        // errMassage=""
=======
                        errMassage={emailError ? "每個欄位皆必填" : '' }
>>>>>>> 82d3d1e (add error hint)
                    />
                    <SettingInput 
                        label="密碼" 
                        placeholder="請設定密碼" 
                        value={password}  
                        onChange={(passwordInput)=>{setPassword(passwordInput)}}
<<<<<<< HEAD
                        // errMassage=""
=======
                        errMassage={passwordError ? "每個欄位皆必填" : '' }
>>>>>>> 82d3d1e (add error hint)
                    />
                    <SettingInput 
                        label="密碼再確認" 
                        placeholder="請再次輸入密碼"  
                        value={checkPassword} 
                        onChange={(checkPasswordInput)=>{setChecPassword(checkPasswordInput)}} 
<<<<<<< HEAD
                        // errMassage={passwordeEror ? "輸入密碼不相同" : '' }
=======
                        errMassage={()=>{handleError1()}}
>>>>>>> 82d3d1e (add error hint)
                    />    

                <div className={styles.saveBtn} onClick={handleSave} ><SaveBtn /></div>
            </div>
      </div>
    )
}

export default SettingPage;