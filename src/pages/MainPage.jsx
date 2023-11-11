import styles from "styles/Layout3.module.scss";
import MainNavbar  from "components/MainNavbar";
import NavItem from "components/NavItem";
import ToTweetPanel from "components/ToTweetPanel"
import TweetModal from "components/TweetModal"
import PopularList from "components/PopularList";
import  {ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import  {ReactComponent as UserIcon} from "icons/user.svg"
import  {ReactComponent as SettingIcon} from "icons/setting.svg"
import TweetList from "components/TweetList";
import { useNavigate } from "react-router-dom";
import {getTweets} from "api/twitter"; 
import {getTopTenUsers} from "api/twitter"
//import ReplyModal from "components/ReplyModal"
import { useState,useEffect } from "react";


const MainPage = ()=> {
  const [tweets, setTweets] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
  const [topTenUsers, setTopTenUsers] = useState([]);

  //頁面跳轉

  const handleLogout =()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('ReplyedTweetId');
    navigate('/login')
  }

  //控制modal
  const handleOpen = () =>{
    setIsOpen(true);
  }
  const handleClose = () =>{
    setIsOpen(false);
  }

  useEffect(() => {
    const getTweetsAsync = async () => {
    try {
    const tweets = await getTweets();
    setTweets(tweets);
    setTweets(tweets.map((tweet) => ({...tweet})));
    } catch (error) {
    console.error (error);
    }
    };

    const getTopTenUsersAsync = async () => {
      try {
        const topTenUsersData = await getTopTenUsers();
        const topTenUsers = topTenUsersData.data; //data內
        if (topTenUsers) {
          setTopTenUsers(topTenUsers.map((topTenUser) => ({ ...topTenUser })));
        }
        else {
          setTopTenUsers(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    getTweetsAsync();
    getTopTenUsersAsync()
    }, [tweets]); 

  
  return(
    <div className={styles.appContainer}>
        <div className={styles.navbarContainer}>
          <MainNavbar handleLogout={handleLogout}>
            <div onClick={()=>navigate('/main')}>
              <NavItem title="首頁"  >
                <HomeActiveIcon/>
              </NavItem>
            </div>
            <div onClick={()=>navigate('/user')}>
              <NavItem title="個人資料">
                <UserIcon/>
              </NavItem>
            </div>
            <div onClick={()=>navigate('/setting')}>
              <NavItem title="設定" >
                  <SettingIcon/>
                </NavItem>
            </div>
            <button className={styles.tweetButton} onClick={handleOpen}>推文</button>
          </MainNavbar>
        </div>
        <div className={styles.content}>
          <div className={styles.headerContainer}>
            <h4>{isOpen ? '推文' :'首頁'}</h4>
          </div>
          <ToTweetPanel/>
          <TweetModal className={styles.tweetModal}  user={user} isOpen={isOpen}  onClick={handleClose}/>
          <TweetList tweets={tweets} />
          
        </div>
        <div className={styles.popularList}>
            <PopularList topTenUsers={topTenUsers}/>
        </div> 
    </div>
  )
}


export default MainPage;

