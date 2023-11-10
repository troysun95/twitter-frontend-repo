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
import ReplyModal from "components/ReplyModal"
import { useState,useEffect } from "react";


const MainPage = ()=> {
  const [tweets, setTweets] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
  const Replyeduser = localStorage.getItem("user")
  const [topTenUsers, setTopTenUsers] = useState([]);

  //頁面跳轉

  const handleLogout =()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('account');
    localStorage.removeItem('password')
    navigate('/login')
  }



 //發送推文
  // const handleSubmitTweet = ()=>{
  //   if(inputValue.length !== 0 &&  inputValue.length < 150){
  //      const newTweet = {
  //       id: tweets.length + 1,
  //       descrption: inputValue,
  //       createdAt: "剛剛",
  //       updatedAt: "2023-11-05T12:50:12.000Z", //發文時間函式，Raect U44
  //       User:{...user},
  //       Replies: [
  //             {
  //             }
  //         ],
  //       LikedUsers: [],
  //       repliesAmount: 0,
  //       likesAmount: 0
  //     }

  //    //先取得所有推文，再新增推文
  //    setTweets([...tweets, newTweet])
  //    setInputValue("")
  //    setIsSubmit(true)
  //    setIsSubmit(false)
  //   }
  // }
 
  
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
   console.log('推文取得修正中')
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
    }, []); 

  
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
          <ReplyModal className={styles.replyModal} Replyeduser={Replyeduser}  isOpen={isOpen}  onClick={handleClose} />
        </div>
        <div className={styles.popularList}>
            <PopularList topTenUsers={topTenUsers}/>
        </div> 
       
    </div>
  )
}


export default MainPage;

