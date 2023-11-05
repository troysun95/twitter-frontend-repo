import styles from "styles/Layout3.module.scss";
import MainNavbar  from "components/MainNavbar";
import NavItem from "components/NavItem";
import ToTweetPanel from "components/ToTweetPanel"
import  {ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import  {ReactComponent as UserIcon} from "icons/user.svg"
import  {ReactComponent as SettingIcon} from "icons/setting.svg"
import PopularList from "components/PopularList";
import TweetItem from "components/TweetItems/TweetItem";

//假資料
import {user} from "data/user"
import {tweets} from "data/tweets"
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const MainPage = ()=> {
  
  const navigate = useNavigate();
  const [tweetsList, setTweetsList] = useState(tweets)
  const [inputValue, setInputValue] = useState("");
  const [isSubmit, setIsSubmit] = useState(false)

  //handler

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSubmitTweet = ()=>{
   if(inputValue.length !== 0 &&  inputValue.length < 150){
      const newTweet = {
        id:tweetsList.length + 1,
        avatar:user.avatar,
        name:user.name,
        account:user.account, 
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
      <ToTweetPanel user={user} handleSubmitTweet={handleSubmitTweet} handleInputChange={handleInputChange} isSubmit={isSubmit}/>
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

