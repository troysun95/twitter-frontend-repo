import styles4 from "styles/tweetsCollection.module.scss";

const UserReplyItem = ({  Tweet, User, comment}) => {
  return (
    <div className={styles4.tweetItem}>
      <div className={styles4.avatar}>
        <img src={User.avatar} aria-label={User.name} />
      </div>
      <div>
        {/* 帳號 */}
        <div className={styles4.accountTitle}>
          <p className={styles4.accountName}>{User.name}</p>
          <p className={styles4.subTitle}>
            <span>{User.account}</span>
            <span>・{User.createdAt}</span>
          </p>
        </div>
        {/* 回覆對象 */}
        <div className={styles4.replyToContainer}>
          <p>
            回覆{" "}
            <span className={styles4.replyTo}>
              {Tweet.User.name}
            </span>
          </p>
        </div>
        <div className={styles4.messageContainer}>
          <p>{comment}</p>
        </div>
      </div>
    </div>
  )
};

export default UserReplyItem;
