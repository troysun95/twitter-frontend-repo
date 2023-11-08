import { useState, useEffect } from "react";

import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";
import { ReactComponent as EditProfileBtnIcon } from "icons/editProfileBtn.svg";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import SwitchButtonPanel from "components/SwitchButtonPanel";
import UserTweetItem from "components/TweetItems/UserTweetItem";

import styles from "styles/UserSelfPage.module.scss";
import styles3 from "styles/Layout3.module.scss";
import styles4 from "styles/tweetsCollection.module.scss";

import { getUserTweets } from "../api/twitter.js";
// import { useNavigate } from "react-router-dom";
// import { checkPermission } from "../api/auth";

const TweetsCollection = ({ tweets, userInfo }) => {
  return (
    <div className={styles4.tweetsCollection}>
      {tweets.map((userTweetItem) => {
        return (
          <UserTweetItem
            key={userTweetItem.id}
            {...userTweetItem}
            userAvatar={userInfo.avatar}
            userName={userInfo.name}
            userAccount={userInfo.account}
          />
        );
      })}
    </div>
  );
};
const UserProfile = ({ userInfo }) => {
  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.userProfileBg}>
        <img src={userInfo.cover} aria-label={userInfo.account} />
      </div>
      <div className={styles.avatarNameContainer}>
        <div className={styles.avatar}>
          <img src={userInfo.avatar} aria-label={userInfo.account} />
        </div>
        <div className={styles.accountTitle}>
          <p className={styles.accountName}>{userInfo.name}</p>
          <p className={styles.subTitle}>{userInfo.account}</p>
          <p className={styles.bio}>{userInfo.introduction}</p>
          <div className={styles.trackingStatus}>
            <p className={styles.followingNum}>
              {userInfo.followingNum}個追隨中
            </p>
            <p>{userInfo.followerNum}位追隨者</p>
          </div>
        </div>
      </div>
      <button className={styles.editProfileBtn}>
        <EditProfileBtnIcon />
      </button>
    </div>
  );
};

const UserContent = ({ tweets, userInfo }) => {
  return (
    <div className={styles3.content}>
      <UserProfile userInfo={userInfo} />
      <SwitchButtonPanel />

      <TweetsCollection tweets={tweets} userInfo={userInfo}>
        <UserTweetItem userInfo={userInfo} />
      </TweetsCollection>
    </div>
  );
};
const UserPage = () => {
  // const navigate = useNavigate();
  const savedUserInfo = JSON.parse(localStorage.getItem("user"));
  console.log("savedUserInfo", savedUserInfo);
  const id = savedUserInfo.id;

  // const [userContent, setUserContent] = useState('tweets')
  const [tweets, setTweets] = useState([]); //user發文
  //const [replies, setReplies] = useState([]); //user回覆

  useEffect(() => {
    // 瀏覽使用者的推文
    const getUserTweetsAsync = async () => {
      try {
        const tweets = await getUserTweets(id);
        // 確認是否有tweets
        if (tweets) {
          setTweets(tweets.map((tweet) => ({ ...tweet })));
          console.log("tweets", tweets);
        }
        // else {
        //   setTweets(null);
        // }
      } catch (error) {
        console.error("error", error);
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
      <UserContent
        // userContent={userContent}
        // onClick={handleClick}
        userInfo={savedUserInfo}
        tweets={tweets}
      />
    </div>
  );
};
export default UserPage;
