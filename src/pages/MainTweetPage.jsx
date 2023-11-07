import styles from "styles/Layout3.module.scss";
import MainNavbar  from "components/MainNavbar";
import NavItem from "components/NavItem";
import TweetModal from "components/TweetModal"
import  {ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import  {ReactComponent as UserIcon} from "icons/user.svg"
import  {ReactComponent as SettingIcon} from "icons/setting.svg"
import PopularList from "components/PopularList";
import TweetItem from "components/TweetItems/TweetItem";


// //假資料
import {prevUser} from "data/user"
import {tweets} from "data/tweets"



const MainTweetPage= ()=> {

  //設定讓背景無法點擊
  
   

  return(
    <div className={styles.appContainerModal}>
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
          <TweetModal user={prevUser}/>
          {tweets.map((tweet) => {
              return (
                <TweetItem
                  key={tweet.id}
                  data={tweet}
                />); 
          })}
        </div>
        <div className={styles.popularList}>
            <PopularList/>
        </div>
    </div>
  )
}


export default MainTweetPage;

