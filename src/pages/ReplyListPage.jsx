import styles from "styles/Layout3.module.scss";
import MainNavbar  from "components/MainNavbar";
import NavItem from "components/NavItem";
import PopularList from "components/PopularList";
import  {ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import  {ReactComponent as UserIcon} from "icons/user.svg"
import  {ReactComponent as SettingIcon} from "icons/setting.svg"
import { useNavigate } from "react-router-dom";
import {getTopTenUsers,GetOneTweet} from "api/twitter"
import { useState,useEffect } from "react";
//import ReplyTweetList from "components/ReplyTweetList";
//import  ReplyedTweeet from "components/ReplyedTweeet"
import {ReactComponent as GoBackBtnIcon} from "icons/goBackBtn.svg"


const ReplyListPage = ()=> {
  const navigate = useNavigate();
  const [topTenUsers, setTopTenUsers] = useState([]);
  //const [replyedTweet, setReplyedTweet] =useState([]);
  const replyedTweetId = localStorage.getItem("ReplyedTweetId")


  //頁面跳轉

  const handleLogout =()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login')
  }

  const handleGoBack =()=>{
    localStorage.removeItem('ReplyedTweetId')
    
    navigate('/main')
  }



  useEffect(() => {
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

    const GetOneTweetAsync = async () => {
        try{
            const replyedTweetId = JSON.parse(localStorage.getItem("ReplyedTweetId"))
            console.log(replyedTweetId)

            const OneTweet = await GetOneTweet({replyedTweetId});
            const replyedTweet = OneTweet
            if(replyedTweet){
                // setReplyedTweet(replyedTweet)
                console.log(replyedTweet)
            }
        }catch(error){
            console.error("error", error);
        }
    };
    getTopTenUsersAsync()
    GetOneTweetAsync()
    }, [replyedTweetId]); 
  
  
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
            <button className={styles.tweetButton} >推文</button>
          </MainNavbar>
        </div>
        <div className={styles.content}>
          <div className={styles.headerContainer}>
            <GoBackBtnIcon onClick={()=>handleGoBack}/>
            <h4>推文</h4>
          </div>
          {/* < ReplyedTweeet replyedTweet={replyedTweet} />
          <ReplyTweetList/> */}
        </div>
        <div className={styles.popularList}>
            <PopularList topTenUsers={topTenUsers}/>
        </div> 
    </div>
  )
}


export default ReplyListPage;

