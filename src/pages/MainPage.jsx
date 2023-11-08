import styles from "styles/Layout3.module.scss";
import MainNavbar  from "components/MainNavbar";
import NavItem from "components/NavItem";
import ToTweetPanel from "components/ToTweetPanel"
import  {ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import  {ReactComponent as UserIcon} from "icons/user.svg"
import  {ReactComponent as SettingIcon} from "icons/setting.svg"
import PopularList from "components/PopularList";
import TweetList from "components/TweetList";
import { useNavigate } from "react-router-dom";
import {getTweets} from "api/twitter";

//假資料
import { useState,useEffect } from "react";



const MainPage = ()=> {
  const [tweets, setTweets] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem("user")

  //handler

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  //頁面跳轉

  const handleLogout =()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('user')
    navigate('/login')
  }



 //發送推文
  const handleSubmitTweet = ()=>{
    if(inputValue.length !== 0 &&  inputValue.length < 150){
       const newTweet = {
        id: tweets.length + 1,
        descrption: inputValue,
        createdAt: "剛剛",
        updatedAt: "2023-11-05T12:50:12.000Z", //發文時間函式
        User:{...user},
        Replies: [
              {
              }
          ],
        LikedUsers: [],
        repliesAmount: 0,
        likesAmount: 0
      }

     console.log(newTweet)
     //先取得所有推文，再新增推文
     setTweets([...tweets, newTweet])
     setInputValue("")
     setIsSubmit(true)
     setIsSubmit(false)
    }
  }
 

 
  let date = new Date().toDateString();
  console.log(date);
  
  useEffect(() => {
    const getTweetsAsync = async () => {
    try {
    const tweets = await getTweets();
    console.log(tweets);
    setTweets(tweets.map((tweet) => ({...tweet})));
    } catch (error) {
    console.error (error);
    }
    };
    getTweetsAsync();
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
              
              
            <button className={styles.tweetButton} onClick={()=>navigate('/main/tweet')}>推文</button>
          </MainNavbar>
        </div>
        <div className={styles.content}>
          <div className={styles.headerContainer}>
            <h4>首頁</h4>
          </div>
          <ToTweetPanel user={user} handleSubmitTweet={handleSubmitTweet} handleInputChange={handleInputChange} isSubmit={isSubmit}/>
          <TweetList tweets={tweets} />
        </div>
        <div className={styles.popularList}>
            <PopularList/>
        </div> 
    </div>
  )
}


export default MainPage;

