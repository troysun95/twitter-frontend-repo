import { ReactComponent as LikeActiveIcon } from "icons/likeActive.svg";
import { ReactComponent as CommentIcon } from "icons/comment.svg";
import styles4 from "styles/TweetsCollection.module.scss";

const UserLikeItem = ({
  Tweet,
  repliesCount,
  createdAt,
  isLiked,
  likedCount,
}) => {
  const description = Tweet.description;
  const otherUserName = Tweet.User.name;
  const otherUserAccount = Tweet.User.account;
  const otherUserAvatar = Tweet.User.avatar

  return (
    <div className={styles4.tweetItem}>
      <div className={styles4.avatar}>
        <img src={otherUserAvatar} aria-label={otherUserName} />
      </div>
      <div>
        {/* 帳號 */}
        <div className={styles4.accountTitle}>
          <p className={styles4.accountName}>{otherUserName}</p>
          <p className={styles4.subTitle}>
            <span>@{otherUserAccount}</span>
            <span>・{createdAt}</span>
          </p>
        </div>
        <div className={styles4.messageContainer}>
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
              {isLiked && <LikeActiveIcon className={styles4.icon} />}
            </span>
            {likedCount}
            {/*click後 POST like或取消*/}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLikeItem;
