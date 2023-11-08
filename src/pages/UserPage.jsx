import { useEffect } from "react";

import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";

import styles3 from "styles/Layout3.module.scss";

import { getUserTweets } from "../api/twitter.js";
// import { useNavigate } from "react-router-dom";
// import { checkPermission } from "../api/auth";


const UserPage = () => {
  // const navigate = useNavigate();
  const savedUserInfo = JSON.parse(localStorage.getItem("user"));
  console.log("savedUserInfo", savedUserInfo);
  const id = savedUserInfo.id;

  useEffect(() => {
    // 瀏覽使用者的推文
    const getUserTweetsAsync = async () => {
      try {
        const tweets = await getUserTweets(id);
        // 確認是否有tweets
        if (tweets) {
        //   setTweets(tweets.map((tweet) => ({ ...tweet })));
          console.log("tweets", tweets);
        } 
        // else {
        //   setTweets(null);
        // }
      } catch (error) {
        console.log('error', error);
      }
    };
    getUserTweetsAsync();
  }, [id]);

  // useEffect(() => {
  //   const checkTokenIsValid = async () => {
  //     const authToken = localStorage.getItem("authToken");
  //     if (!authToken) {
  //       navigate("/login");
  //     }
  //     const result = await checkPermission(authToken); //驗證通過留在 UserPage
  //     console.log("驗證通過 result: ", result)

  //     if (!result) {
  //       navigate("/login");
  //     }
  //   };

  //   checkTokenIsValid();
  // }, [navigate]);

  return (
    <div className={styles3.appContainer}>
      <div className={styles3.navbarContainer}>
        <MainNavbar>
          <NavItem title="首頁">
            <HomeIcon />
          </NavItem>

          <NavItem title="使用者列表">
            <UserActiveIcon />
          </NavItem>
          <NavItem title="設定">
            <UserActiveIcon />
          </NavItem>
          <NavItem title="推文">
            <UserActiveIcon />
          </NavItem>
        </MainNavbar>
      </div>
    </div>
  );
};
export default UserPage;
