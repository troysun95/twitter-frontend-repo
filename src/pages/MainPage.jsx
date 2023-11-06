import styles from "styles/Layout3.module.scss";
import MainNavbar  from "components/MainNavbar";
import NavItem from "components/NavItem";
import ToTweetPanel from "components/ToTweetPanel"
import  {ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import  {ReactComponent as UserIcon} from "icons/user.svg"
import  {ReactComponent as SettingIcon} from "icons/setting.svg"
import PopularList from "components/PopularList";
import TweetItem from "components/TweetItems/TweetItem";
import { useNavigate } from "react-router-dom";
//import * as jwt from "jsonwebtoken";

//假資料
import {prevUser} from "data/user"
import {tweets} from "data/tweets"
import { useState,useEffect } from "react";



const MainPage = ()=> {
    //寫法可能要改，若回傳Alltweets ，只需要取第一層
  const [tweetsList, setTweetsList] = useState(tweets)
  const [inputValue, setInputValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false)

  
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [payload, setPayload] = useState(null);
  // 儲存 userInfo 物件方便運用，裡面包含 account、avatar、banner、name 等
  const navigate = useNavigate()

  //handler

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSubmitTweet = ()=>{
   if(inputValue.length !== 0 &&  inputValue.length < 150){
      const newTweet = {
        id:tweetsList.length + 1,
        avatar:prevUser.avatar,
        name:prevUser.name,
        account:prevUser.account, 
        time:"5hrs", 
        tweet:inputValue,
        relpyedCounts:0,
        likedCounts:0,
    }
    setTweetsList([...tweetsList, newTweet])
    //console.log(`發文成功,內容為:${newTweet.id}`)
    setInputValue("")
    setIsSubmit(true)
    setIsSubmit(false)
   }
    
  }

  useEffect(() => {
    const checkTokenIsValid = async () => {
      // 從 localStorage 拿 token
      const authToken = localStorage.getItem("authToken");
      // 如果 token 不存在則進行相關設定
      if (!authToken) {
        //setIsAuthenticated(false);
        //setPayload(null);
        return navigate('/admin')
      }
      
      // if (authToken) {
      //   //const tempPayload = jwt.decode(authToken);
      //   //setPayload(tempPayload);
      //   // if (!tempPayload) {
      //   //   setIsAuthenticated(false);
      //   //   setPayload(null);
      //   //   return navigate('/admin')
      //   // }
      //   // setIsAuthenticated(true);
      //   // // 使用 localStorage 中的 userInfo 來初始化
      //   // const savedUserInfo = localStorage.getItem("userInfo");
      //   // if (savedUserInfo) {
      //   //   setUserInfo(JSON.parse(savedUserInfo));
      //   // }
      //   // // 使用 localStorage 中的 tweetId 來初始化
      //   // const savedTweetId = localStorage.getItem("tweetId");
      //   // if (savedTweetId) {
      //   //   setTweetId(savedTweetId);
      //   }
      //   } else {
      //   // 無效
      //   setIsAuthenticated(false);
      //   setPayload(null);
      //   navigate('/admin')
      // }
    };
    checkTokenIsValid();
    //console.log('AuthProvider 重新渲染')
}, [ navigate]);



  
  return(
<div className={styles.appContainer}>
    <div className={styles.navbarContainer}>
      <MainNavbar>
            <NavItem title="首頁"  toRoute='/main'>
              <HomeActiveIcon/>
            </NavItem>
          <NavItem title="個人資料" toRoute='/user'>
            <UserIcon/>
          </NavItem>
            <NavItem title="設定"   toRoute='setting'>
                <SettingIcon/>
            </NavItem>
        
       <button className={styles.tweetButton} onClick={()=>navigate('/main/tweet')}>推文</button>
      </MainNavbar>
    </div>
    <div className={styles.content}>
      <div className={styles.headerContainer}>
        <h4>首頁</h4>
      </div>
      <ToTweetPanel user={prevUser} handleSubmitTweet={handleSubmitTweet} handleInputChange={handleInputChange} isSubmit={isSubmit}/>
      {tweetsList.map((tweet) => {
          return (
            <TweetItem
              key={tweet.id}
              data={tweet}
            />
          );
          
        })}
    </div>
    <div className={styles.popularList}>
        <PopularList/>
    </div>
</div>
    


  )
}


export default MainPage;

