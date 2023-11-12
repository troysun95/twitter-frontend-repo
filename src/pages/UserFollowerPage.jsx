import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import UserFollowerItem from "components/TrackingItems/UserFollowerItem";
import HeaderName from "components/HeaderName.jsx";
import TrackingSwitchPanel from "components/TrackingSwitchPanel";
import PopularList from "components/PopularList.jsx";

import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";

import styles from "styles/UserSelfPage.module.scss";
import styles3 from "styles/Layout3.module.scss";
import styles4 from "styles/TweetsCollection.module.scss";
import {
  getUserFollowers,
  getUserFollowings, getCheckProfile,
} from "../api/twitter.js";

const TrackingCollection = ({
  followers,
  flagForRendering,
  setFlagForRendering,
}) => {
  return (
    // 處理沒有followers (null)的情況
    <div className={styles4.tweetsCollection}>
      {followers && followers.length !== 0 ? (
        followers.map((followerItem) => {
          return (
            <UserFollowerItem 
              key={followerItem.id} 
              {...followerItem}
              flagForRendering={flagForRendering}
              setFlagForRendering={setFlagForRendering} 
            />
          )
        })
      ) : (<span> 目前沒有followers </span>)}
    </div>
  );
};

const UserContent = ({ 
  followers, 
  flagForRendering,
  setFlagForRendering, tweetCount }) => {
  return (
    <div className={styles.content}>
      <HeaderName toPage = '/main' tweetCount={tweetCount}/>
      <TrackingSwitchPanel />
      <TrackingCollection 
        followers={followers}
        flagForRendering={flagForRendering}
        setFlagForRendering={setFlagForRendering} />
    </div>
  );
};

const UserFollowerPage = () => {
  const navigate = useNavigate();
  // 先從 localStorage 拿使用者在 UserOtherPage 存的 userContent 當作初始值
  const savedFollowContent = localStorage.getItem("followContent");
  const savedUserInfo = JSON.parse(localStorage.getItem("user"));
  console.log("savedUserInfo", savedUserInfo);
  const savedUserId = savedUserInfo.id;
  const role = savedUserInfo.role;
  const [followers, setFollowers] = useState([]); //followers資料
  const [followings, setFollowings] = useState([]); //followers資料

  // 使用者點擊瀏覽項目最新狀態
  const [userContent, setUserContent] = useState(savedFollowContent);
  const [tweetCount, setTweetCount] = useState(null); //tweet數量
  // 負責觸發 UserSelfFollowPage 與 RightBanner 重新渲染
  const [flagForRendering, setFlagForRendering] = useState(false);

  useEffect(() => {
    // const getUserFollowingsAsync = async () => {
    //   try {
    //     const followings = await getUserFollowings(savedUserId);
    //     setFollowers(followings.map((following) => ({ ...following })));
    //   } catch (error) {
    //     console.error("error", error);
    //   }
    // };

    const getUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowers(savedUserId);
        setFollowers(followers.map((follower) => ({ ...follower })));
      } catch (error) {
        console.error("error", error);
      }
    };
    // if (savedUserId && userContent && role === "user") {
      getUserFollowersAsync();
    //   // getCheckProfileAsync();
    //   // getUserFollowingsAsync()
    //   // 還沒點想看的內容就直接到這頁就要請使用者回到自己的頁面
    // } else if (savedUserId && role === "user") {
    //   navigate("/user");
    // } else if (savedUserId && role === "admin") {
    //   navigate("/admin");
    //   // 剩下的請先登入
    // } else {
    //   navigate("/login");
    // }
  }, [flagForRendering, userContent, savedUserId, navigate, role]);

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
        followers={followers}
        flagForRendering={flagForRendering}
        setFlagForRendering={setFlagForRendering}
        tweetCount={tweetCount}
      />
      <PopularList />
    </div>
  );
};
export default UserFollowerPage;
