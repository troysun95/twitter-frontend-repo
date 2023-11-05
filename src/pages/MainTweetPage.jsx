import styles from "styles/Layout3.module.scss";
import MainNavbar  from "components/MainNavbar";
import NavItem from "components/NavItem";
import  {ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import  {ReactComponent as UserIcon} from "icons/user.svg"
import  {ReactComponent as SettingIcon} from "icons/setting.svg"
import PopularList from "components/PopularList";

// //假資料
// import {user} from "data/user"
// import {tweets} from "data/tweets"



const MainPage = ()=> {
  
  
  return(
<div className={styles.appContainer}>
    <div className={styles.navbarContainer}>
      <MainNavbar>
            <NavItem title="首頁" toRoute="/main" >
              <HomeActiveIcon/>
            </NavItem>
          <NavItem title="個人資料" toRoute="/user">
            <UserIcon/>
          </NavItem>
            <NavItem title="設定" toRoute="/setting">
                <SettingIcon/>
            </NavItem>
        
       <button className={styles.tweetButton}>推文</button>
      </MainNavbar>
    </div>
    <div className={styles.content}>
      <div className={styles.headerContainer}>
        <h4>首頁</h4>
      </div>
    
    </div>
    <div className={styles.popularList}>
        <PopularList/>
    </div>
</div>
    


  )
}


export default MainPage;

