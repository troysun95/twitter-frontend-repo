import { useEffect, useContext } from "react";
import { AuthContext } from "context/AuthContext.jsx";
import { ReactComponent as LikeActiveIcon } from "icons/likeActive.svg";
import { ReactComponent as CommentIcon } from "icons/comment.svg";
import styles4 from "styles/TweetsCollection.module.scss";

const UserLikeItem = ({
  id,
  Tweet,
  repliesCount,
  createdAt,
  isLiked,
  likedCount,
}) => {
  console.log("該tweet的id", id);
  const { postUnlikeTweet, setChangedLikes } = useContext(AuthContext);

  const description = Tweet.description;
  const otherUserName = Tweet.User.name;
  const otherUserAccount = Tweet.User.account;
  const otherUserAvatar = Tweet.User.avatar;

  // 取消 愛心 功能
  const handleLike = async () => {
    try {
      const response = await postUnlikeTweet(id);
      console.log("來自likeItem元件 check response", response);
      // if (!response.data) {
      if (response && response.data) {
        alert("取消like");
      } else {
        alert("取消like失敗");
      }
    } catch (error) {
      console.error("取消喜歡失敗", error);
      alert("取消喜歡失敗");
    }
  };

  useEffect(() => {
    setChangedLikes(false);
  }, [setChangedLikes]);

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
            <span className={styles4.iconContainer} onClick={handleLike}>
              {isLiked && <LikeActiveIcon className={styles4.icon} />}
            </span>
            {likedCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLikeItem;
