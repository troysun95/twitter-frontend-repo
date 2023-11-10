import { ReactComponent as LikeIcon } from "icons/like.svg";
import { ReactComponent as LikeActiveIcon } from "icons/likeActive.svg";
import { ReactComponent as CommentIcon } from "icons/comment.svg";
import styles4 from "styles/TweetsCollection.module.scss";

const UserTweetItem = ({
  repliesCount,
  userInfo,
  Tweet,
  isLiked,
  likedUsersCount,
  createdAt,
}) => {
  const userAvatar = userInfo.avatar;
  const userName = userInfo.name;
  const userAccount = userInfo.account;
  const description = Tweet.description;
  return (
    <div className={styles4.tweetItem}>
      <div className={styles4.avatar}>
        <img src={userAvatar} aria-label={userAccount} />
      </div>
      <div>
        {/* 帳號 */}
        <div className={styles4.accountTitle}>
          <p className={styles4.accountName}>{userName}</p>
          <p className={styles4.subTitle}>
            <span>@{userAccount}</span>
            <span>・{createdAt}</span>
          </p>
        </div>
        <div className={styles4.descriptionContainer}>
          <p>{description}</p>
        </div>
        <div className={styles4.interactionContainer}>
          <p className={styles4.leftIcon}>
            <span className={styles4.iconContainer}>
              <CommentIcon className={styles4.icon} />
            </span>
            {repliesCount}
          </p>
          <p>
            <span className={styles4.iconContainer}>
              {isLiked ? (
                <LikeActiveIcon className={styles4.icon} />
              ) : (
                <LikeIcon className={styles4.icon} />
              )}
            </span>
            {likedUsersCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTweetItem;
