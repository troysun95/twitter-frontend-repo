import styles4 from "styles/TweetsCollection.module.scss";

const UserReplyItem = ({ Tweet, User, comment, createdAt}) => {
  const replyToName = Tweet.User.name;
  const userAvatar = User.avatar;
  return (
    <div className={styles4.tweetItem}>
      <div className={styles4.avatar}>
        <img src={userAvatar} aria-label={User.name} />
      </div>
      <div>
        {/* 帳號 */}
        <div className={styles4.accountTitle}>
          <p className={styles4.accountName}>{User.name}</p>
          <p className={styles4.subTitle}>
            <span>{User.account}</span>
            <span>・{createdAt}</span>
          </p>
        </div>
        {/* 回覆對象 */}
        <div className={styles4.replyToContainer}>
          <p>
            回覆 <span className={styles4.replyTo}>{replyToName}</span>
          </p>
        </div>
        <div className={styles4.messageContainer}>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default UserReplyItem;
