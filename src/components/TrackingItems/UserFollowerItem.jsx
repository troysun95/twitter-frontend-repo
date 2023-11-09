import { ReactComponent as FollowingBtnIcon } from "icons/followingBtn.svg";
import { ReactComponent as NotFollowingBtnIcon } from "icons/notFollowingBtn.svg";
import styles4 from "styles/tweetsCollection.module.scss";

const userFollowerItem = ({
  img,
  account,
  tagAccount,
  afterTweetTime,
  bio,
  trackingStatus,
}) => {
  return (
    <div className={styles4.tweetItem}>
      <div className={styles4.avatar}>
        <img src={img} aria-label={account} />
      </div>
      <div>
        <div className={styles4.accountTrackingContainer}>
          <div className={styles4.accountTitle}>
            <p className={styles4.accountName}>{account}</p>
          </div>
          {/* 切換 */}
          <div>
            {trackingStatus ? <FollowingBtnIcon /> : <NotFollowingBtnIcon />}
          </div>
        </div>

        <div className={styles4.bioContainer}>
          <p>{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default userFollowerItem;
