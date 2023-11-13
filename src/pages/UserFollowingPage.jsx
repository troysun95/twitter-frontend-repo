import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import UserFollowingItem from "components/TrackingItems/UserFollowingItem";
import HeaderName from "components/HeaderName.jsx";
import TrackingSwitchPanel from "components/TrackingSwitchPanel";
import PopularList from "components/PopularList.jsx";

import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";

import styles3 from "styles/Layout3.module.scss";
import styles from "styles/UserSelfPage.module.scss";
import styles4 from "styles/TweetsCollection.module.scss";

import { getUserFollowings, getCheckProfile } from "../api/twitter.js";

const TrackingCollection = ({
  followings, 
  flagForRendering,
  setFlagForRendering,
}) => {
  return (
    // 處理沒有followings (null)的情況
    <div className={styles4.tweetsCollection}>
      {followings.length !== 0 ? (
        followings.map((followingItem) => {
          return (
            <UserFollowingItem
              key={followingItem.id}
              {...followingItem}
              flagForRendering={flagForRendering}
              setFlagForRendering={setFlagForRendering}
            />
          );
        })
      ) : (
        <span>目前沒有追隨任何帳號</span>
      )}
    </div>
  );
};

const UserContent = ({ followings, flagForRendering, setFlagForRendering }) => {
  return (
    <div className={styles.content}>
      <HeaderName />
      <TrackingSwitchPanel />
      <TrackingCollection
        followings={followings}
        flagForRendering={flagForRendering}
        setFlagForRendering={setFlagForRendering}
      />
    </div>
  );
};
const UserFollowingPage = () => {
  const navigate = useNavigate();
  // 先從 localStorage 拿使用者在 UserOtherPage 存的 userContent 當作初始值
  // const savedFollowContent = localStorage.getItem("followContent");
  const savedUserInfo = JSON.parse(localStorage.getItem("user"));
  const savedUserId = savedUserInfo.id;
  const role = savedUserInfo.role;
  const [followings, setFollowings] = useState([]); //followings資料

  // 使用者點擊瀏覽項目最新狀態
  // const [userContent, setUserContent] = useState(savedFollowContent);
  const [tweetCount, setTweetCount] = useState(null); //tweet數量
  const [flagForRendering, setFlagForRendering] = useState(false);

  useEffect(() => {
    const getUserFollowingsAsync = async () => {
      try {
        const followings = await getUserFollowings(savedUserId);
        if (followings) {
          setFollowings(followings.map((following) => ({ ...following })));
        } else {
          setFollowings(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    const getCheckProfileAsync = async () => {
      try {
        const response = await getCheckProfile(savedUserId);
        setTweetCount(response.data.tweetCount);
      } catch (error) {
        console.error(error);
      }
    };

    // if (savedUserId && userContent && role === "user") {
      getUserFollowingsAsync();
    //   getCheckProfileAsync();
    //   // 還沒點想看的內容就直接到這頁就要請使用者回到自己的頁面
    // } else if (savedUserId && role === "user") {
    //   navigate("/user");
    // } else if (savedUserId && role === "admin") {
    //   navigate("/admins");
    //   // 剩下的請先登入
    // } else {
    //   navigate("/login");
    // }
  }, [flagForRendering, savedUserId, navigate, role]);

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
        followings={followings}
        flagForRendering={flagForRendering}
        setFlagForRendering={setFlagForRendering}
        tweetCount={tweetCount}
      />
      <PopularList />
    </div>
  );
};
export default UserFollowingPage;
