import { ReactComponent as FollowingBtnIcon } from "icons/followingBtn.svg";

import styles4 from "styles/TweetsCollection.module.scss";

const userFollowingItem = ({
  avatar,
  name,
  // bio,
  isFollowed,
}) => {
  return (
    <div className={styles4.tweetItem}>
      <div className={styles4.avatar}>
        <img src={avatar} aria-label={name} />
      </div>
      <div>
        <div className={styles4.accountTrackingContainer}>
          <div className={styles4.accountTitle}>
            <p className={styles4.accountName}>{name}</p>
          </div>
          <button>{isFollowed && <FollowingBtnIcon />}</button>
        </div>

        <div className={styles4.bioContainer}>
          <p>biobiobiobiobiobiobiobio</p>
        </div>
      </div>
    </div>
  );
};

export default userFollowingItem;
