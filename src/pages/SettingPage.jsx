import styles from "styles/Layout2.module.scss";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import SettingInput from "components/SettingInput"
import { ReactComponent as SettingActiveIcon } from "icons/settingActive.svg";
import {ReactComponent as HomeIcon} from "icons/home.svg"
import {ReactComponent as UserIcon} from "icons/user.svg";
import {ReactComponent as SaveBtn} from "icons/saveBtn.svg";
import {Login} from "api/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';




const SettingPage = ()=>{
    const navigate = useNavigate();
    //取出帳密
    const userAccount = localStorage.getItem('account')
    const userPassword = localStorage.getItem('password')
    //確定帳密
    console.log(userAccount);
    console.log(userPassword);
    //傳入拿到資料
    const getUser = async ()=>{
        const data = await Login({
            userAccount,
            userPassword,
            });
        return data.user
    }

    const userData = JSON.stringify(getUser())
    
    //onChange 紀錄Input 
    const [account, setAccount]=useState('');
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [checkPassword, setChecPassword] = useState("");
    const [nameError, setNameError ] = useState(false)
    const [passwordeEror, setPassowrdError ] = useState(false)


    //顯示錯誤文案用
    if(name.length > 50) {
        setNameError(true)
    }
    if(password !== checkPassword){
        setPassowrdError(true)
    }


    // //登出按鈕
    const handleLogout = ()=>{
        localStorage.removeItem('authToken');
        localStorage.removeItem('account');
        localStorage.removeItem('password');
        localStorage.removeItem('user')
        navigate('/login')
    }


    const CheckInputsAvalible = ()=>{
        if(account.lengnth === 0){
            return
        }
        if(name.lengnth === 0){
            return
        }
        if(email.lengnth === 0){
            return
        }
        if(password.lengnth === 0){
            return
        }
        if(checkPassword !== password){
            return
        }
        return true;
    }
    
     
    // //儲存更新後user ，useEffect?

    const handleSave = async()=>{
        //判斷文案正確
        if(CheckInputsAvalible()){
            const newUserData = {
                account : account,
                name : name,
                email : email,
                password : password,
            }
            console.log(`更新後使用者資料為：${newUserData}`)
            //const data = await UserDataUpdate(newUserData); 應該是 put /api/users
            //假設回傳值 為succeess
            const data = {success: 'success'}
            if(data.success === 'success'){
                Swal.fire({
                    position: 'top',
                    title: '儲存成功！',
                    timer: 1000,
                    icon: 'success',
                    showConfirmButton: false,
                });
            }else{
                Swal.fire({
                    position: 'top',
                    title: '儲存失敗！',
                    timer: 1000,
                    icon: 'error',
                    showConfirmButton: false,
                });
            }
        }else{
            console.log('輸入資料不符合規定')
            return
        }       
    }


    return(
        <div className={styles.appContainer}>
            <div className={styles.navbarContainer}>
                <MainNavbar handleLogout={handleLogout}>
                    <NavItem title="首頁">
                        <HomeIcon/>
                    </NavItem>
                    <NavItem title="個人資料">
                        <UserIcon/>
                    </NavItem>
                    <NavItem title="設定">
                        <SettingActiveIcon/>
                    </NavItem>
                </MainNavbar>
            </div>
            <div className={styles.content}>
                <div className={styles.headerContainer}>
                    <h4>帳戶設定</h4>
                </div>
                    <SettingInput 
                        label="帳號"  
                        placeholder= "" 
                        defaultValue={userData.account} 
                        value={account}
                        errMassage=" "
                        onChange={(accountInput)=>{setAccount(accountInput)}}
                    />
                    <SettingInput 
                        label="名稱"  
                        placeholder= "" 
                        defaultValue={userData.name} 
                        value={name} 
                        errMassage={nameError ? "字數超過上限！" : '' }
                        handleChange={(nameInput)=>{setName(nameInput)}}
                    />
                    <SettingInput
                        label="Email" 
                        defaultValue={userData.email} 
                        value={email} 
                        errMassage=" "
                        handleChange={(emailInput)=>{setEmail(emailInput)}}
                    />
                    <SettingInput 
                        label="密碼" 
                        placeholder="請設定密碼" 
                        defaultValue="" 
                        value={password}  
                        handleChange={(passwordInput)=>{setPassword(passwordInput)}}
                    />
                    <SettingInput 
                        label="密碼再確認" 
                        placeholder="請再次輸入密碼"  
                        defaultValue=" "  
                        value={checkPassword} 
                        handleChange={(checkPasswordInput)=>{setChecPassword(checkPasswordInput)}} 
                        errMassage={passwordeEror ? "輸入密碼不相同" : '' }
                    />    

                <div className={styles.saveBtn} onClick={handleSave} ><SaveBtn /></div>
            </div>
      </div>
    )
}

export default SettingPage