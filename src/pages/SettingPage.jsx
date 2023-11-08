import styles from "styles/Layout2.module.scss";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import SettingInput from "components/SettingInput"
import { ReactComponent as SettingActiveIcon } from "icons/settingActive.svg";
import {ReactComponent as HomeIcon} from "icons/home.svg"
import {ReactComponent as UserIcon} from "icons/user.svg";
import {ReactComponent as SaveBtn} from "icons/saveBtn.svg";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

//假資料，a
import {prevUser} from "data/user"

const SettingPage = ()=>{
    const navigate = useNavigate();
    //const  prevUser = localStorage.getItem("user")
    const [user, setUser] = useState(prevUser);
    //接資料接 user 的
    //console.log(prevUser);
    const [isError, setIsError]= useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState("");



    const handleChange = (e, key) => {
        
        setUser({
            ...user,
            [key]: e.target.value
        });
        if(user.name.length >50 ){
            setIsError(true)
        }
        console.log(`更新後資料為${user}`)
    };


    const handleLogout = ()=>{
        localStorage.removeItem('authToken');
        //localStorage.getItem("user")
        navigate('/login')
    }

    const handlePassworConfirm = (e)=>{
        setPasswordConfirm(e.target.value);
        console.log(passwordConfirm);
    }

    const handleSave = ()=>{
        // if(passwordConfirm === user.password){
        //     setUser(user)
        //     console.log(user)
        //     //預計回傳使用者 ， api: post api/users/:id
        //     //
        // }else{console.error('不成功')}
        setUser(user)
        console.log(user)
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
                    <SettingInput label="帳號"  placeholder= "" defaultValue={user.account} onChange={(e) => handleChange(e, 'account')} isError={isError} />
                    <SettingInput label="名稱"  placeholder= "" defaultValue={user.name} onChange={(e) => handleChange(e, 'name')} isError={isError} errMassage="字數超過上限！"/>
                    <SettingInput label="Email" defaultValue={user.email} onChange={(e) => handleChange(e, 'email')} isError={isError}/>
                    <SettingInput label="密碼" placeholder="請設定密碼" defaultValue="" value={user.password}  onChange={(e) => handleChange(e, 'password')} isError={isError} />
                    <SettingInput label="密碼再確認" placeholder="請再次輸入密碼"  defaultValue="" value={passwordConfirm} onChange={handlePassworConfirm} isError={isError} errMassage="輸入密碼不相同"/>          
                <div className={styles.saveBtn} onClick={handleSave} ><SaveBtn /></div>
            </div>
      </div>
    )
}

export default SettingPage