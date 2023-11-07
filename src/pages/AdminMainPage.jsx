import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import AdminTweetList from "components/AdminTweetList"
import styles from "styles/Layout2.module.scss"
import{ReactComponent as HomeActiveIcon} from "icons/homeActive.svg"
import{ReactComponent as UserIcon} from "icons/user.svg";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {getAdminTweets} from"api/twitter"



const AdminMainPage = ()=> {
  const [tweets, setTweets] = useState([])

  
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('Authorization');
    navigate('/admin');
  };




  useEffect(() => {
    const getAdminTweetsAsync = async () => {
    try {
    const tweets = await getAdminTweets();
    setTweets(tweets.map((tweet ) => ({...tweet})));
    } catch (error) {
    console.error (error);
    }
    };
    getAdminTweetsAsync();
    }, []);


  return(
    <div className={styles.appContainer}>
      <div className={styles.navbarContainer}>
        <MainNavbar handleClick={handleClick}>
          <NavItem title="推文清單"  >
            <HomeActiveIcon/>
          </NavItem>
          <NavItem title="使用者列表" >
            <UserIcon/>
          </NavItem>
        </MainNavbar>
      </div>
      <div className={styles.content}>
        <div className={styles.headerContainer}>
            <h4>推文清單</h4>
        </div>
          <AdminTweetList tweets={tweets} />
      </div>
    </div>
  )
}


export default AdminMainPage;

