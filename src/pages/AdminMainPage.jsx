
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
//import AdminTweetList from "components/AdminTweetList"
import styles from "styles/Layout2.module.scss"
import{ReactComponent as HomeAcgtiveIcon} from "icons/homeActive.svg"
import{ReactComponent as UserIcon} from "icons/user.svg"
// import { useEffect, useState } from "react"
// import {getTweets} from"api/twitter"



const AdminMainPage = ()=> {
  // const [tweets, setTweets] = useState([])

  // useEffect(() => {
  //   const getTweetsAsync = async () => {
  //     try {
  //       const tweets = await getTweets();
  //       setTweets(tweets.map((tweet) => ({ ...tweet })));
  //     } catch (error) {
  //       console.error (error);
  //     }
  //   };
  //   getTweetsAsync();
  // }, []);

  return(
<div className={styles.appContainer}>
    <div className={styles.navbarContainer}>
      <MainNavbar>
        
        <NavItem title="推文清單">
          <HomeAcgtiveIcon/>
        </NavItem>
        <NavItem title="使用者列表">
          <UserIcon/>
        </NavItem>
      </MainNavbar>
    </div>
    <div className={styles.content}>
      <div className={styles.headerContainer}>
          <h4>推文清單</h4>
      </div>
        {/* <AdminTweetList tweets={tweets} /> */}
    </div>
</div>
    


  )
}


export default AdminMainPage;

