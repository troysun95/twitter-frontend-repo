import { ReactComponent as FollowingBtnIcon } from "icons/followingBtn.svg";
import { ReactComponent as NotFollowingBtnIcon } from "icons/notFollowingBtn.svg";
import styles from "styles/PopularList.module.scss";
import {
  getTopTenUsers,
  postFollowAccount,
  deleteUnfollowAccount,
} from "api/twitter.js";
import { useState, useEffect } from "react";
// import { useDataStatus } from "context/DataContext.jsx";
import { Link } from "react-router-dom";

const PopularAccountItem = ({
  id,
  avatar,
  name,
  account,
  savedUserId,
  handleFollowClick,
  isFollowed,
}) => {
  const [isClicked, setIsClicked] = useState(isFollowed);
  // const { isDataUpdate, setIsDataUpdate } = useDataStatus();/
  const userId = id
  //click 切換狀態
  // const handleClick = async () => {
  //   try {
  //     if (isClicked === false) {
  //       const data = await postFollowAccount();
  //       if (data) {
  //         console.log('追蹤誰',data);
  //         setIsClicked(true);
  //         setIsDataUpdate(!isDataUpdate);
  //       }
  //     }
  //     if (isClicked === true) {
  //       const data = await deleteUnfollowAccount(userId);
  //       if (data) {
  //         console.log("取消追蹤", data);
  //         // console.log("取消追蹤", data.followingId);
  //         setIsClicked(false);
  //         setIsDataUpdate(!isDataUpdate);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   setIsClicked(isFollowed);
  // }, [isDataUpdate, isFollowed]);

  return (
    <div className={styles.PopularAccountItem}>
      <Link to={`/users/${id}`}>
        <div className={styles.avatar}>
          <img src={avatar} aria-label={account} />
        </div>
        <div className={styles.accountTitle}>
          <p className={styles.accountName}>{name}</p>
          <p className={styles.tagAccountName}>@{account}</p>
        </div>
      </Link>

      <button
        className={styles.followingBtn}
        onClick={() => {
          if (id === savedUserId) {
            alert("使用者不能跟隨自己");
          } else {
            setIsClicked(!isClicked);
            handleFollowClick(id, isFollowed);
          }
        }}
      >
        {isClicked ? <FollowingBtnIcon /> : <NotFollowingBtnIcon />}
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
            userId={topTenUserItem.id}
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
  const savedUserInfo = JSON.parse(localStorage.getItem("user")); //目前user
  const savedUserId = savedUserInfo && savedUserInfo.id;

  const [topTenUsers, setTopTenUsers] = useState([]);
  // const { isDataUpdate } = useDataStatus();
  const [flagForRenderingSelf, setFlagForRenderingSelf] = useState(false); 

  const postFollowAccountAsync = async (token) => {
    try {
      const postFollowAccountData = await postFollowAccount(token);
    } catch (error) {
      console.error("error", error);
    }
  };

  const deleteUnfollowAccountAsync = async (token, id) => {
    try {
      const deleteUnfollowAccountData = await deleteUnfollowAccount(
        token,
        savedUserId
      )
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
        const topTenUsers = topTenUsersData.data; //陣列資料
        setTopTenUsers(topTenUsers.map((topTenUser) => ({ ...topTenUser })));
      } catch (error) {
        console.error("error", error);
      }
    };

    getTopTenUsersAsync();
  }, [flagForRendering, flagForRenderingSelf]);
  // }, [isDataUpdate])

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
