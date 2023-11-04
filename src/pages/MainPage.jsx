
import SwitchButtonPanel from "components/SwitchButtonPanel";
import styles from "styles/Layout3.module.scss";
import MainNavbar  from "components/MainNavbar";
import NavItem from "components/NavItem";
import  {ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import  {ReactComponent as UserIcon} from "icons/user.svg"
import  {ReactComponent as SettingIcon} from "icons/setting.svg"
import PopularList from "components/PopularList";

const MainPage = ()=> {
  return(
<div className={styles.appContainer}>
    <div className={styles.navbarContainer}>
      <MainNavbar>
        
        <NavItem title="推文清單">
            <HomeActiveIcon/>
        </NavItem>

        <NavItem title="使用者列表">
            <UserIcon/>
        </NavItem>

        <NavItem title="設定">
            <SettingIcon/>
        </NavItem>
      </MainNavbar>
    </div>
    <div className={styles.content}>
        <SwitchButtonPanel/>
    </div>
    <div className={styles.popularList}>
        <PopularList/>
    </div>
</div>
    


  )
}


export default MainPage;

