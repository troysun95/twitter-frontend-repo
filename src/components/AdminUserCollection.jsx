import styles from "styles/AdminUsers.module.scss";
import { ReactComponent as LikeIcon } from "icons/like.svg";
import { ReactComponent as PostTweetsIcon } from "icons/postTweets.svg";
import { adminUsersData } from "data/adminUsersData.js";

const AdminUserCardItem = ({
  account,
  tagAccount,
  backgroundImg,
  img,
  tweetsNumber,
  likesNumber,
  followingNumber,
  followersNumber,
}) => {
  return (
    <div className={styles.userCardItem}>
      <div className={styles.userBackground}>
        <img src={backgroundImg} aria-label={account} />
      </div>
      <div className={styles.avatarNameContainer}>
        <div className={styles.avatar}>
          <img src={img} aria-label={account} />
        </div>
        <div className={styles.accountTitle}>
          <p className={styles.accountName}>{account}</p>
          <p className={styles.subTitle}>{tagAccount}</p>
        </div>
      </div>
      {/* 下方數據 */}
      <div className={styles.infoContainer}>
        <div className={styles.tweetsLikeStatus}>
          <p className={styles.tweetsNumber}>
            <PostTweetsIcon className={styles.icon} />
            <span>{tweetsNumber}</span>
          </p>
          <p className={styles.like}>
            <LikeIcon className={styles.icon} />
            <span>{likesNumber}</span>
          </p>
        </div>

        <div className={styles.followStatus}>
          <p className={styles.followingNum}>
            {followingNumber}個<span className={styles.greyText}>跟隨中</span>
          </p>
          <p className={styles.followersNum}>
            {followersNumber}位<span className={styles.greyText}>跟隨者</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const AdminUserCollection = () => {
  return (
    <div className={styles.tweetContainer}>
      <header className={styles.header}>
        <h4>使用者列表</h4>
      </header>
      <div className={styles.userCardsContainer}>
        {adminUsersData.map((adminUserItem) => {
          return (
            <AdminUserCardItem key={adminUserItem.id} {...adminUserItem} />
          );
        })}
      </div>
    </div>
  );
};

export default AdminUserCollection;
