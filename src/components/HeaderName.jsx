import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles3 from "styles/Layout3.module.scss";
import { ReactComponent as GoBackBtnIcon } from "icons/goBackBtn.svg";
import { getUserTweets } from "../api/twitter.js";

const HeaderName = () => {
  const savedUserInfo = JSON.parse(localStorage.getItem("user"));
  const id = savedUserInfo.id;
  const [tweets, setTweets] = useState([]); //user發文

  useEffect(() => {
    const getUserTweetsAsync = async () => {
      try {
        const tweets = await getUserTweets(id);
        // 確認是否有tweets
        if (tweets) {
          setTweets(tweets.map((tweet) => ({ ...tweet })));
        }
        // else {
        //   setTweets(null);
        // }
      } catch (error) {
        console.error("error", error);
      }
    };
    getUserTweetsAsync();
  }, [id]);


  return (
    <div className={styles3.headerContainer}>
      <Link to="/main">
        <div className={styles3.iconContainer}>
          <GoBackBtnIcon />
        </div>
      </Link>

      <div className={styles3.headerTitle}>
        <h5>{savedUserInfo.name}</h5>
        <p>{tweets.length} 推文</p>
      </div>
    </div>
  );
};
export default HeaderName