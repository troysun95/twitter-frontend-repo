import { ReactComponent as FollowingBtnIcon } from "icons/followingBtn.svg";
import { ReactComponent as NotFollowingBtnIcon } from "icons/notFollowingBtn.svg";
import styles from "styles/PopularList.module.scss";

const PopularAccountItem = ({ avatar, name, account, isFollowed }) => {
  return (
    <div className={styles.PopularAccountItem}>
      <div className={styles.avatar}>
        <img src={avatar} aria-label={account} />
      </div>
      <div className={styles.accountTitle}>
        <p className={styles.accountName}>{name}</p>
        <p className={styles.tagAccountName}>{account}</p>
      </div>
      <button className={styles.followingBtn}>
        {isFollowed ? <FollowingBtnIcon /> : <NotFollowingBtnIcon />}
      </button>
    </div>
  );
};

const PopularList = ({ topTenUsers }) => {
  return (
    <div className={styles.popularList}>
      <div className={styles.title}>
        <h4>推薦帳號</h4>
      </div>
      {topTenUsers.map((topTenUserItem) => {
        return (
          <PopularAccountItem
            key={topTenUserItem.id}
            {...topTenUserItem}
            // onclick
          />
        ); 
      })}
    </div>
  );
};
export default PopularList;
