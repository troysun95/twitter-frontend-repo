import styles from "styles/Layout3.module.scss";
import MainNavbar  from "components/MainNavbar";
import NavItem from "components/NavItem";
import TweetModal from "components/TweetModal"
import  {ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import  {ReactComponent as UserIcon} from "icons/user.svg"
import  {ReactComponent as SettingIcon} from "icons/setting.svg"
import PopularList from "components/PopularList";
import TweetList from "components/TweetList"
import {getTweets} from "api/twitter"
import { useEffect ,useState} from "react";


const MainTweetPage= ()=> {
  const [tweets, setTweets] = useState([]);
  const user = localStorage.getItem('user')
  //設定讓背景無法點擊
  
  useEffect(() => {
    const getTweetsAsync = async () => {
    try {
    const tweets = await getTweets();
    console.log(tweets)
    setTweets(tweets.map((tweet) => ({...tweet})));
    } catch (error) {
    console.error (error);
    }
    };
    getTweetsAsync();
    }, []);

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
          <TweetModal user={user}/>
          <TweetList tweets={tweets} />
        </div>
        <div className={styles.popularList}>
            <PopularList/>
        </div>
    </div>
  )
}


export default MainTweetPage;

