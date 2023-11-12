import { ReactComponent as FollowingBtnIcon } from "icons/followingBtn.svg";
import { ReactComponent as NotFollowingBtnIcon } from "icons/notFollowingBtn.svg";
import styles from "styles/PopularList.module.scss";
import {
  getTopTenUsers,
  postFollowAccount,
  deleteUnfollowAccount,
} from "api/twitter.js";
import { useState, useEffect } from "react";

const PopularAccountItem = ({
  id,
  avatar,
  name,
  account,
  savedUserId,
  handleFollowClick,
  isFollowed,
}) => {
  const [isFollowedTemp, setIsFollowedTemp] = useState(isFollowed);

  useEffect(() => {
    setIsFollowedTemp(isFollowed);
  }, [isFollowed]);

  return (
    <div className={styles.PopularAccountItem}>
      <div className={styles.avatar}>
        <img src={avatar} aria-label={account} />
      </div>
      <div className={styles.accountTitle}>
        <p className={styles.accountName}>{name}</p>
        <p className={styles.tagAccountName}>{account}</p>
      </div>
      <button
        className={styles.followingBtn}
        onClick={() => {
          if (id === savedUserId) {
            alert("使用者不能跟隨自己");
          } else {
            setIsFollowedTemp(!isFollowedTemp);
            handleFollowClick(id, isFollowed);
          }
        }}
      >
        {isFollowedTemp ? <FollowingBtnIcon /> : <NotFollowingBtnIcon />}
      </button>
    </div>
  );
};

const TopTenUsersCollection = ({
  topTenUsers,
  handleFollowClick,
  savedUserId,
}) => {
  return (
    <>
      {topTenUsers.map((topTenUserItem) => {
        // const { id, name, account, avatar, isFollowed } = topTenUserItem
        return (
          <PopularAccountItem
            key={topTenUserItem.id}
            id={topTenUserItem.id}
            {...topTenUserItem}
            handleFollowClick={handleFollowClick}
            savedUserId={savedUserId}
          />
        );
      })}
    </>
  );
};

const PopularList = ({ flagForRendering, setFlagForRendering }) => {
  const token = localStorage.getItem("authToken");
  const savedUserInfo = JSON.parse(localStorage.getItem("user"));
  const savedUserId = savedUserInfo && savedUserInfo.id;

  const [topTenUsers, setTopTenUsers] = useState([]);
  // RightBanner 自己的 flagForRendering，若使用者在 main 會用到
  const [flagForRenderingSelf, setFlagForRenderingSelf] = useState(false); 
  console.log('flagForRenderingSelf in PPPPP', flagForRenderingSelf);

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
    // 要加條件式判斷是因為 main 頁面不會傳值，所以如果是在 main 頁面就不用重新渲染中間欄
    if (setFlagForRendering) {
      await setFlagForRendering(!flagForRendering);
    } else {
      setFlagForRenderingSelf(!flagForRenderingSelf);
    }
  }

  useEffect(() => {
    const getTopTenUsersAsync = async () => {
      try {
        const topTenUsersData = await getTopTenUsers();
        console.log("topTenUsersData in ppppp", topTenUsersData);
        const topTenUsers = topTenUsersData.data; //data內
        console.log("topTenUsers in pppp", topTenUsers);

        setTopTenUsers(topTenUsers.map((topTenUser) => ({ ...topTenUser })));
      } catch (error) {
        console.error("error", error);
      }
    };

    getTopTenUsersAsync();
    console.log("讓 RightBanner 重新渲染");
  }, [flagForRendering, flagForRenderingSelf]);

  return (
    <div className={styles.popularList}>
      <div className={styles.title}>
        <h4>推薦帳號</h4>
      </div>
      <TopTenUsersCollection
        topTenUsers={topTenUsers}
        handleFollowClick={handleFollowClick}
        savedUserId={savedUserId}
      />
    </div>
  );
};
export default PopularList;
