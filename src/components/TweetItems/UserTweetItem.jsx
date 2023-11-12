import { useState, useEffect, useContext } from "react";
import { AuthContext } from "context/AuthContext.jsx";
import { ReactComponent as LikeIcon } from "icons/like.svg";
import { ReactComponent as LikeActiveIcon } from "icons/likeActive.svg";
import { ReactComponent as CommentIcon } from "icons/comment.svg";
import styles4 from "styles/TweetsCollection.module.scss";

const UserTweetItem = ({
  id,
  description,
  userInfo,
  isLiked,
  likedUsersCount,
  repliesCount,
  createdAt,
  description
}) => {

  const { postLikeTweet, postUnlikeTweet, setChangedLikes } =
    useContext(AuthContext);

  const userAvatar = userInfo.avatar;
  const userName = userInfo.name;
  const userAccount = userInfo.account;


  const [likeState, setLikeState] = useState(isLiked); //user 有無按愛心
  const [likedNum, setLikedNum] = useState(likedUsersCount); //愛心數量

  // 點擊 愛心 功能
  const handleLike = async () => {
    console.log("目前愛心狀態", likeState); //目前愛心狀態
    console.log("目前tweet id ", id); //目前愛心狀態

    if (likeState === true) {
      const res = await postUnlikeTweet(id);
      console.log("來自TweetItem元件 check res", res);
      if (res.data) {
        if (res.data.message === "成功取消對這則推文按下喜歡！") {
          setLikeState(false);
          setLikedNum(() => {
            if (likedNum) {
              return likedNum - 1;
            } else return likedNum;
          });
          console.log("click後 愛心狀態", likeState);
          return;
        }
      } else {
        //
        return alert("取消愛心失敗");
      }
    }
    if (likeState === false) {
      const res = await postLikeTweet(id);
      console.log("來自TweetItem元件 check res", res);
      if (res) {
        if (res.message === "成功對這則推文按下喜歡！") {
          setLikeState(true);
          setLikedNum(likedNum + 1);
          return;
        } else {
          return alert("加入愛心失敗");
        }
      }
    }
  };

  useEffect(() => {
    setChangedLikes(false);
  }, [setChangedLikes]);


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
            <span className={styles4.iconContainer} onClick={handleLike}>
              {likeState ? (
                <LikeActiveIcon className={styles4.icon} />
              ) : (
                <LikeIcon className={styles4.icon} />
              )}
            </span>
            {likedNum}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTweetItem;
