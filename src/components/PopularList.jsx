// import {useState} from 'react'
import styles from "styles/PopularList.module.scss";
import {popularListData} from "data/popularListData"

const PopularAccountItem = ({ id, img, account, tagAccount}) => {
  return (
    <div className={styles.PopularAccountItem}>
      <div className={styles.avatar}>
        <img src={img} aria-label={account}/>
      </div>
      <div className={styles.accountTitle}>
        <p className={styles.accountName}>{account}</p>
        <p className={styles.tagAccountName}>{tagAccount}</p>
      </div>
      <button className={styles.followingBtn}>正在跟隨</button>
    </div>
  );
};

const PopularList = () => {
  // const [popularAccount, setPopularAccount] = useState(popularListData);
  return (
    <>
      <div className={styles.popularList}>
        <div className={styles.title}>
          <h4>推薦帳號</h4>
        </div>
        {popularListData.map((accountItem) => {
          return (
            <PopularAccountItem
              key={accountItem.id}
              {...accountItem}
              // onclick
            />
          );
          
        })}
      </div>
    </>
  );
};
export default PopularList;
