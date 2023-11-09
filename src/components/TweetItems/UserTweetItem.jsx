import { ReactComponent as LikeIcon } from "icons/like.svg";
import { ReactComponent as LikeActiveIcon } from "icons/likeActive.svg";

import { ReactComponent as CommentIcon } from "icons/comment.svg";
import styles4 from "styles/TweetsCollection.module.scss";

const UserTweetItem = ({
  userAvatar,userName,
  userAccount,
  account,
  createdAt,
  description,
  isLiked,
  likedUsersCount,
  repliesCount,
  updatedAt,
}) => {
  return (
    <div className={styles4.tweetItem}>
      <div className={styles4.avatar}>
        <img src={userAvatar} aria-label={account} />
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
                <LikeIcon className={styles4.icon} />
              ) : (
                <LikeActiveIcon className={styles4.icon} />
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
