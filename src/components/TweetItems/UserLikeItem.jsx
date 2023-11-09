import { ReactComponent as LikeActiveIcon } from "icons/likeActive.svg";
import { ReactComponent as CommentIcon } from "icons/comment.svg";
import styles4 from "styles/TweetsCollection.module.scss";


const UserLikeItem = ({
  img,
  account,
  tagAccount,
  afterTweetTime,
  message,
}) => {
  return (
    <div className={styles4.tweetItem}>
      <div className={styles4.avatar}>
        <img src={img} aria-label={account} />
      </div>
      <div>
        {/* 帳號 */}
        <div className={styles4.accountTitle}>
          <p className={styles4.accountName}>{account}</p>
          <p className={styles4.subTitle}>
            <span>{tagAccount}</span>
            <span>・{afterTweetTime}</span>
          </p>
        </div>
        <div className={styles4.messageContainer}>
          <p>{message}</p>
        </div>
        <div className={styles4.interactionContainer}>
          <p className={styles4.leftIcon}>
            <span className={styles4.iconContainer}>
              <CommentIcon className={styles4.icon} />
            </span>
            13
          </p>
          <p>
            <span className={styles4.iconContainer}>
              <LikeActiveIcon className={styles4.icon} />
            </span>
            13
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLikeItem;
