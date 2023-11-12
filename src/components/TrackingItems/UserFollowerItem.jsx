import { ReactComponent as FollowingBtnIcon } from "icons/followingBtn.svg";
import { ReactComponent as NotFollowingBtnIcon } from "icons/notFollowingBtn.svg";
import styles4 from "styles/TweetsCollection.module.scss";

const userFollowerItem = ({ avatar, name, introduction, isFollowed }) => {
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
          {/* 切換 */}
          <button>
            {isFollowed ? <FollowingBtnIcon /> : <NotFollowingBtnIcon />}
          </button>
        </div>

        <div className={styles4.bioContainer}>
          <p>{introduction}</p>
        </div>
      </div>
    </div>
  );
};

export default userFollowerItem;
