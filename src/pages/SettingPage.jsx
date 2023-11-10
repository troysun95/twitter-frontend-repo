import styles from "styles/Layout2.module.scss";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import SettingInput from "components/SettingInput"
import { ReactComponent as SettingActiveIcon } from "icons/settingActive.svg";
import {ReactComponent as HomeIcon} from "icons/home.svg"
import {ReactComponent as UserIcon} from "icons/user.svg";
import {ReactComponent as SaveBtn} from "icons/saveBtn.svg";
import { useState ,useEffect} from "react"
import { useNavigate } from "react-router-dom";
import {EditUser} from "api/twitter"



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
    const [nameError, setNameError ] = useState(false);
    const [passwordeEror, setPassowrdError ] = useState(false);


    //顯示錯誤文案用
    useEffect(() => {
        if(name.length > 50) {
            setNameError(true);
        } else {
            setNameError(false);
        }
        if(password !== checkPassword){
            setPassowrdError(true);
        } else {
            setPassowrdError(false);
        }
    }, [name, password, checkPassword]);

    // //登出按鈕
    const handleLogout = ()=>{
        localStorage.removeItem('authToken');
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
            console.log(response)
        }       
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
                    <SettingInput 
                        label="帳號"  
                        placeholder= "" 
                        value={account}
                        onChange={(accountInput)=>{setAccount(accountInput)}}
                        errMassage=" "
                    />
                    <SettingInput 
                        label="名稱"  
                        placeholder= "" 
                        value={name} 
                        onChange={(nameInput)=>{setName(nameInput)}}
                        errMassage={nameError ? "字數超過上限！" : " " }
                    />
                    <SettingInput
                        label="Email" 
                        value={email} 
                        onChange={(emailInput)=>{setEmail(emailInput)}}
                        errMassage=""
                    />
                    <SettingInput 
                        label="密碼" 
                        placeholder="請設定密碼" 
                        value={password}  
                        onChange={(passwordInput)=>{setPassword(passwordInput)}}
                        errMassage=""
                    />
                    <SettingInput 
                        label="密碼再確認" 
                        placeholder="請再次輸入密碼"  
                        value={checkPassword} 
                        onChange={(checkPasswordInput)=>{setChecPassword(checkPasswordInput)}} 
                        errMassage={passwordeEror ? "輸入密碼不相同" : '' }
                    />    

                <div className={styles.saveBtn} onClick={handleSave} ><SaveBtn /></div>
            </div>
      </div>
    )
}

export default SettingPage;