import { useState, useEffect } from "react";
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
import { getUserFollowings } from "../api/twitter.js";

const TrackingCollection = ({ followings }) => {
  return (
    <div className={styles4.tweetsCollection}>
      {followings.map((followingItem) => {
        return <UserFollowingItem key={followingItem.id} {...followingItem} />;
      })}
    </div>
  );
};

const UserContent = ({ followings }) => {
  return (
    <div className={styles.content}>
      <HeaderName />
      <TrackingSwitchPanel />
      <TrackingCollection followings={followings}>
        <UserFollowingItem />
      </TrackingCollection>
    </div>
  );
};
const UserFollowerPage = () => {
  const savedUserInfo = JSON.parse(localStorage.getItem("user"));
  console.log("savedUserInfo", savedUserInfo);
  const id = savedUserInfo.id;

  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const getUserFollowingsAsync = async () => {
      try {
        const followings = await getUserFollowings(id);
        if (followings) {
          setFollowings(followings.map((following) => ({ ...following })));
          console.log("followers", followings);
        } else {
          setFollowings(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    getUserFollowingsAsync();
  }, [id]);

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
      <UserContent followings={followings} />
      <PopularList />
    </div>
  );
};
export default UserFollowerPage;
