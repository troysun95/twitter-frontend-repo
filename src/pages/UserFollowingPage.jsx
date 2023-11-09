import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import UserFollowingItem from "components/TrackingItems/UserFollowingItem";
import HeaderName from "components/HeaderName.jsx";
import TrackingSwitchPanel from "components/TrackingSwitchPanel"
import PopularList from "components/PopularList.jsx";

import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";

import styles3 from "styles/Layout3.module.scss";
import styles from "styles/UserSelfPage.module.scss";
import styles4 from "styles/TweetsCollection.module.scss";

import { usersBio } from "data/usersBio.js";

const TrackingCollection = () => {
  return (
    <div className={styles4.tweetsCollection}>
      {usersBio[0].follower.reverse().map((usersBio) => {
        return <UserFollowingItem key={usersBio.id} {...usersBio} />;
      })}
    </div>
  );
};

const UserContent = () => {
  return (
    <div className={styles.content}>
      <HeaderName />
      <TrackingSwitchPanel />
      <TrackingCollection>
        <UserFollowingItem />
      </TrackingCollection>
    </div>
  );
};
const UserFollowerPage = () => {
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
      <UserContent />
      <PopularList />
    </div>
  );
};
export default UserFollowerPage;
