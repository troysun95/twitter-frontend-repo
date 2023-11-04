
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import AdminTweetList from "components/AdminTweetList"
import styles from "styles/Layout2.module.scss"
import{ReactComponent as HomeAcgtiveIcon} from "icons/homeActive.svg"
import{ReactComponent as UserIcon} from "icons/user.svg"
import {tweets} from "data/tweets"



const AdminMainPage = ()=> {
  return(
<div className={styles.appContainer}>
    <div className={styles.navbarContainer}>
      <MainNavbar>
        
        <NavItem title="推文清單">
          <HomeAcgtiveIcon/>
        </NavItem>
        <NavItem title="使用者列表">
          <UserIcon/>
        </NavItem>
      </MainNavbar>
    </div>
    <div className={styles.content}>
        <AdminTweetList tweets={tweets} header="推文清單"/>
    </div>
</div>
    


  )
}


export default AdminMainPage;

