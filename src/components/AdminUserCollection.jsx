import styles from "styles/AdminUsers.module.scss";
import { ReactComponent as LikeIcon } from "icons/like.svg";
import { ReactComponent as PlusTweetsIcon } from "icons/plusTweets.svg";

const AdminUserCardItem = ({
  cover,
  account,
  name,
  avatar,
  tweetsAmount,
  likesAmount,
  followingsAmount,
  followersAmount,
}) => {
  return (
    <div className={styles.userCardItem}>
      <div className={styles.userBackground}>
        <img src={cover} aria-label={account} />
      </div>
      <div className={styles.avatarNameContainer}>
        <div className={styles.avatar}>
          <img src={avatar} aria-label={account} />
        </div>
        <div className={styles.accountTitle}>
          <p className={styles.accountName}>{name}</p>
          <p className={styles.subTitle}>{account}</p>
        </div>
      </div>
      {/* 下方數據 */}
      <div className={styles.infoContainer}>
        <div className={styles.tweetsLikeStatus}>
          <p className={styles.tweetsNumber}>
            <PlusTweetsIcon className={styles.icon} />
            <span>{tweetsAmount}</span>
          </p>
          <p className={styles.like}>
            <LikeIcon className={styles.icon} />
            <span>{likesAmount}</span>
          </p>
        </div>

        <div className={styles.followStatus}>
          <p className={styles.followingNum}>
            {followingsAmount}個<span className={styles.greyText}>跟隨中</span>
          </p>
          <p className={styles.followersNum}>
            {followersAmount}位<span className={styles.greyText}>跟隨者</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const AdminUserCollection = ({ users }) => {
  return (
    <div className={styles.tweetContainer}>
      <header className={styles.header}>
        <h4>使用者列表</h4>
      </header>
      <div className={styles.userCardsContainer}>
        {users.map((adminUserItem) => {
          return (
            <AdminUserCardItem key={adminUserItem.id} {...adminUserItem} />
          );
        })}
      </div>
    </div>
  );
};

export default AdminUserCollection;
