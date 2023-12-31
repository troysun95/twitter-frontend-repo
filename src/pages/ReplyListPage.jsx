import styles from "styles/Layout3.module.scss";
import MainNavbar  from "components/MainNavbar";
import NavItem from "components/NavItem";
import PopularList from "components/PopularList";
import  {ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import  {ReactComponent as UserIcon} from "icons/user.svg"
import  {ReactComponent as SettingIcon} from "icons/setting.svg"
import { useNavigate } from "react-router-dom";
import {getTopTenUsers,GetOneTweet,getOneTweetReplies } from "api/twitter"
import { useState,useEffect } from "react";
import ReplyTweetList from "components/ReplyTweetList";
import  ReplyedTweeet from "components/ReplyedTweeet"
import {ReactComponent as GoBackBtnIcon} from "icons/goBackBtn.svg"


const ReplyListPage = ()=> {
  const navigate = useNavigate();
  const [topTenUsers, setTopTenUsers] = useState([]);
  const tweetClicked = JSON.parse(localStorage.getItem("tweet"))
  const tweetClickedId = tweetClicked.id
  const [replyedTweet, setReplyedTweet] = useState(tweetClicked);
  const [tweetReplies, setTweeetReplies]= useState([]);
  
  



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
            const oneTweet = await GetOneTweet(tweetClickedId);
            if(oneTweet){
              setReplyedTweet(oneTweet.data)

            }else{
              console.log('no 取得貼文')
            }
            
    };

    const getOneTweetRepliesAsync = async () => {
      try {
        const oneTweetReplies = await getOneTweetReplies(tweetClickedId);
        
        if (oneTweetReplies) {
          console.log(`回覆串:${oneTweetReplies.data}`);
          setTweeetReplies(oneTweetReplies.data)
        }
        else {
          setTweeetReplies(null);
          console.log(`no 回覆串`);

        }
      } catch (error) {
        console.error("error", error);
      }
    };

    getTopTenUsersAsync()
    GetOneTweetAsync()
    getOneTweetRepliesAsync()
    }, [tweetClickedId]); 



  const handleLogout =()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login')
  }

  const handleGoBack =()=>{
    localStorage.removeItem('tweet')
    navigate('/main')
  }
  
  
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
            <div className={styles.headerWrapper}>
              <div className={styles.goBack}>
                <GoBackBtnIcon onClick={handleGoBack}/>
              </div>
              <h4>推文</h4>
            </div>
          </div>
          < ReplyedTweeet replyedTweet={replyedTweet}/>
          < ReplyTweetList tweeetReplies={tweetReplies} /> 
        </div>
        <div className={styles.popularList}>
            <PopularList topTenUsers={topTenUsers} />
        </div> 
    </div>
  )
}


export default ReplyListPage;

