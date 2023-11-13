import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
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
import {getUserFollowers} from "../api/twitter.js";

const TrackingCollection = ({ followers }) => {
  return (
    <div className={styles4.tweetsCollection}>
      {followers.map((followerItem) => {
        return <UserFollowerItem key={followerItem.id} {...followerItem} />;
      })}
    </div>
  );
};

const UserContent = ({ followers }) => {
  return (
    <div className={styles.content}>
      <HeaderName />
      <TrackingSwitchPanel />
      <TrackingCollection followers={followers}>
        <UserFollowerItem />
      </TrackingCollection>
    </div>
  );
};
const UserFollowerPage = () => {
  const savedUserInfo = JSON.parse(localStorage.getItem("user"));
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
    const getUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowers(id);
        if (followers) {
          setFollowers(followers.map((follower) => ({ ...follower })));
          console.log("followers", followers);
        } else {
          setFollowers(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    getUserFollowersAsync()
  },[id]);

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
      <UserContent followers={followers}/>
      <PopularList />
    </div>
  );
};
export default UserFollowerPage;
