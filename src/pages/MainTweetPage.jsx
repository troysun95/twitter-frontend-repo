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
                <NavItem title="首頁" >
                  <HomeActiveIcon/>
                </NavItem>
              <NavItem title="個人資料">
                <UserIcon/>
              </NavItem>
                <NavItem title="設定">
                    <SettingIcon/>
                </NavItem>
          <button className={styles.tweetButton}>推文</button>
          </MainNavbar>
        </div>
        <div className={styles.content}> 
        <div className={styles.headerContainer}>
            <h4>推文</h4>
          </div>
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

