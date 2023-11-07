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
import {getTweets} from "api/twitter"

//假資料
import {prevUser} from "data/user"
import { useState,useEffect } from "react";



const MainPage = ()=> {
  
  const [tweets, setTweets] = useState();
  const [inputValue, setInputValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false)

  
 
  const navigate = useNavigate()

  //handler

  const handleInputChange = (value) => {
    setInputValue(value);
  };

 
 //發送推文
  const handleSubmitTweet = ()=>{
    if(inputValue.length !== 0 &&  inputValue.length < 150){
       const newTweet = {
         id: tweets.length + 1,
         avatar:prevUser.avatar,
         name:prevUser.name,
         account:prevUser.account, 
         time:"5hrs", 
         tweet:inputValue,
         relpyedCounts:0,
         likedCounts:0,
     }

     //先取得所有推文，再新增推文
     setTweets([...tweets, newTweet])
     setInputValue("")

     setIsSubmit(true)
     setIsSubmit(false)
    }
  }   

  
  useEffect(() => {
    const getTweetsAsync = async () => {
    try {
    const todos = await getTweets();
    setTweets(todos.map((tweet ) => ({...tweet})));
    } catch (error) {
    console.error (error);
    }
    };
    getTweetsAsync();
    }, []);



  
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
          {/* 抓User裡的推文資料，並用 外面那層的 updatedAt 排順序 */}
          {tweets.map((tweet) => {
              return (
                <TweetItem
                  key={tweet.id}
                  data={tweet.User}
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

