import { postFollowAccount, deleteUnfollowAccount } from "api/twitter.js";
import { ReactComponent as FollowingBtnIcon } from "icons/followingBtn.svg";
import styles4 from "styles/TweetsCollection.module.scss";

const userFollowingItem = ({
  id,
  avatar,
  name,
  introduction,
  isFollowed,
  flagForRendering,
  setFlagForRendering,
}) => {
  const token = localStorage.getItem("authToken");
  const savedUserInfo = JSON.parse(localStorage.getItem("user"));
  const savedUserId = savedUserInfo && savedUserInfo.id;

  const postFollowAccountAsync = async (token) => {
    try {
      const postFollowAccountData = await postFollowAccount(token);
      console.log(
        "postFollowAccountData PopularList元件",
        postFollowAccountData
      );
    } catch (error) {
      console.error("error", error);
    }
  };

  const deleteUnfollowAccountAsync = async (token, id) => {
    try {
      const deleteUnfollowAccountData = await deleteUnfollowAccount(
        token,
        savedUserId
      );
      console.log(
        "deleteUnfollowAccountData PopularList元件",
        deleteUnfollowAccountData
      );
    } catch (error) {
      console.error("error", error);
    }
  };
  // 追蹤按鈕邏輯  isFollowed: 有無追隨
  async function handleFollowClick(idTopUserReceived, isFollowed) {
    if (isFollowed) {
      await deleteUnfollowAccountAsync(token, idTopUserReceived);
    } else {
      await postFollowAccountAsync(token, idTopUserReceived);
    }
    await setFlagForRendering(!flagForRendering);
  }

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
          <button
            onClick={() => {
              if (id === savedUserId) {
                alert("使用者不能跟隨自己");
              } else {
                handleFollowClick(id, isFollowed);
              }
            }}
          >
            {isFollowed && <FollowingBtnIcon />}
          </button>
        </div>

        <div className={styles4.bioContainer}>
          <p>{introduction}</p>
        </div>
      </div>
    </div>
  );
};

export default userFollowingItem;
