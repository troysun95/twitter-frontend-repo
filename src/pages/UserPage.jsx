import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";
import { ReactComponent as EditProfileBtnIcon } from "icons/editProfileBtn.svg";
import MainNavbar from "components/MainNavbar";
import NavItem from "components/NavItem";
import SwitchButtonPanel from "components/SwitchButtonPanel";
import UserTweetItem from "components/TweetItems/UserTweetItem";
import UserReplyItem from "components/TweetItems/UserReplyItem";
import UserLikeItem from "components/TweetItems/UserLikeItem";
import HeaderName from "components/HeaderName";
import PopularList from "components/PopularList";

import styles from "styles/UserSelfPage.module.scss";
import styles3 from "styles/Layout3.module.scss";
import styles4 from "styles/TweetsCollection.module.scss";

import {
  getUserTweets,
  getUserFollowings,
  getUserFollowers,
  getUserReplies,
  getUserLikes,
  getCheckProfile,
} from "../api/twitter.js";


const TweetsCollection = ({ content, renderItem, userInfo }) => {
  return (
    <div className={styles4.tweetsCollection}>
      {content.length !== 0 ?
        (content.map((contentItem) => {
          return (
            <Fragment key={contentItem.id}>
              {renderItem({ ...contentItem, userInfo })}
            </Fragment>
          );
        })) : (
          <span>尚未有內容</span>
        )
      }
    </div>
  );
};
const UserProfile = ({ userInfo, followers, followings }) => {
  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.userProfileBg}>
        <img src={userInfo.cover} aria-label={userInfo.account} />
      </div>
      <div className={styles.avatarNameContainer}>
        <div className={styles.avatar}>
          <img src={userInfo.avatar} aria-label={userInfo.account} />
        </div>
        <div className={styles.accountTitle}>
          <p className={styles.accountName}>{userInfo.name}</p>
          <p className={styles.subTitle}>@{userInfo.account}</p>
          <p className={styles.bio}>{userInfo.introduction}</p>
          <div className={styles.trackingStatus}>
            <Link to="/user/following">
              <p className={styles.followingNum}>
                <span>{followings.length} 個</span>追隨中
              </p>
            </Link>
            <Link to="/user/follower">
              <p>
                <span>{followers.length} 位</span>追隨者
              </p>
            </Link>
          </div>
        </div>
      </div>
      <button className={styles.editProfileBtn}>
        <EditProfileBtnIcon />
      </button>
    </div>
  );
};

const UserContent = ({
  userContent,
  tweets,
  replies,
  likes,
  userInfo,
  followers,
  followings,
  handleChangeUserContent,
}) => {
  return (
    <div className={styles3.content}>
      <HeaderName tweets={tweets}/>

      <UserProfile
        userInfo={userInfo}
        followers={followers}
        followings={followings}
      />
      <SwitchButtonPanel
        userContent={userContent}
        handleChangeUserContent={handleChangeUserContent}
      />
      {userContent === "tweets" && (
        <TweetsCollection
          content={tweets}
          userInfo={userInfo}
          renderItem={UserTweetItem}
        />
      )}
      {userContent === "replies" && (
        <TweetsCollection
          content={replies}
          userInfo={userInfo}
          renderItem={UserReplyItem}
        />
      )}
      {userContent === "likes" && (
        <TweetsCollection content={likes} renderItem={UserLikeItem} />
      )}
    </div>
  );
};
const UserPage = () => {
  // const navigate = useNavigate();
  const savedUserInfo = JSON.parse(localStorage.getItem("user"));
  // console.log("savedUserInfo", savedUserInfo);
  const id = savedUserInfo.id;

  const [userContent, setUserContent] = useState("tweets");
  const [tweets, setTweets] = useState([]); //user發文
  const [replies, setReplies] = useState([]); //user回覆
  const [likes, setLikes] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  // const [likeTweet, setLikeTweet] = useState([])
  // const [UnlikeTweet, setUnlikeTweet] = useState([])
  // const [followAccount, setFollowAccount] = useState([])

  // 設置 flag 讓 TopUserSectionOther 與 RightBanner 能彼此連動
  const [flagForRendering, setFlagForRendering] = useState(false);
  const handleChangeUserContent = (clickItems) => {
    setUserContent(clickItems);
  };

  // 將 UserOtherFollowPage 要用的瀏覽項目先存起來並跳轉頁面
  // function handleFollowDetailClick(followContent) {
  //   localStorage.setItem("followContent", followContent);
  //   navigate("/user/follow");
  // }

  useEffect(() => {
    // 瀏覽使用者的推文
    const getUserTweetsAsync = async () => {
      try {
        const tweets = await getUserTweets(id);
        if (tweets) {
          setTweets(tweets.map((tweet) => ({ ...tweet })));
          console.log("tweets", tweets);
        } else {
          setTweets(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    const getUserRepliesAsync = async () => {
      try {
        const replies = await getUserReplies(id);
        if (replies) {
          setReplies(replies.map((reply) => ({ ...reply })));
        } else {
          setReplies(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    const getUserLikesAsync = async () => {
      try {
        const likes = await getUserLikes(id);
        if (likes) {
          console.log("likes tweets from USERPAGE", likes);
          setLikes(likes.map((like) => ({ ...like })));
        } else {
          setLikes(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    const getUserFollowingsAsync = async () => {
      try {
        const followings = await getUserFollowings(id);
        if (followings) {
          setFollowings(followings.map((following) => ({ ...following })));
        } else {
          setFollowings(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    const getUserFollowersAsync = async () => {
      try {
        const followers = await getUserFollowers(id);
        if (followers) {
          setFollowers(followers.map((follower) => ({ ...follower })));
        } else {
          setFollowers(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    const getCheckProfileAsync = async () => {
      try {
        const getCheckProfileData = await getCheckProfile(id);
        console.log("getCheckProfileData UUUUUUUU", getCheckProfileData);
      } catch (error) {
        console.error("error", error);
      }
    };
    getUserTweetsAsync();
    getUserRepliesAsync();
    getUserLikesAsync();
    getUserFollowingsAsync();
    getUserFollowersAsync();
    getCheckProfileAsync();
  }, [id, flagForRendering]);

  return (
    <div className={styles3.appContainer}>
      <div className={styles3.navbarContainer}>
        <MainNavbar>
          <NavItem title="首頁">
            <HomeIcon />
          </NavItem>
          <NavItem title="使用者列表">
            <UserActiveIcon />
          </NavItem>
          <NavItem title="設定">
            <UserActiveIcon />
          </NavItem>
          <NavItem title="推文">
            <UserActiveIcon />
          </NavItem>
        </MainNavbar>
      </div>
      <UserContent
        userContent={userContent}
        followers={followers}
        followings={followings}
        userInfo={savedUserInfo}
        tweets={tweets}
        replies={replies}
        likes={likes}
        handleChangeUserContent={handleChangeUserContent}
      />
      <PopularList
        flagForRendering={flagForRendering}
        setFlagForRendering={setFlagForRendering}
      />
    </div>
  );
};
export default UserPage;
