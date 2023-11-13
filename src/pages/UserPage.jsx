import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "icons/home.svg";
import { ReactComponent as UserActiveIcon } from "icons/userActive.svg";
import { ReactComponent as EditProfileBtnIcon } from "icons/editProfileBtn.svg";
import { ReactComponent as SettingIcon } from "icons/setting.svg"
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
import EditUserProfileModal from "components/EditUserProfileModal.jsx";

import {
  getUserTweets,
  getUserFollowings,
  getUserFollowers,
  getUserReplies,
  getUserLikes,
  getTopTenUsers,
  postLikeTweet,
  postUnlikeTweet,
  postFollowAccount,
  deleteUnfollowAccount,
  getCheckProfile,
} from "../api/twitter.js";

// import {postLikeTweet, postUnlikeTweet} from "../api/like.js"

const TweetsCollection = ({ content, renderItem, userInfo }) => {
  return (
    <div className={styles4.tweetsCollection}>
      {content.map((contentItem) => {
        return (
          <Fragment key={contentItem.id}>
            {renderItem({ ...contentItem, userInfo })}
          </Fragment>
        );
      })}
    </div>
  );
};
const UserProfile = ({ userInfo, followers, followings }) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const[isOpen, setIsopen] = useState(false)
  const handleModalClose =() =>{
    setIsopen(false)
  }

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
      <button className={styles.editProfileBtn} onClick={()=>{setIsopen(true)}}>
        <EditProfileBtnIcon />
      </button>
      <EditUserProfileModal isOpen={isOpen} user={user} handleModalClose={handleModalClose}/>
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
      <HeaderName />

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
  console.log("savedUserInfo", savedUserInfo);
  const id = savedUserInfo.id;

  const [userContent, setUserContent] = useState("tweets");
  const [tweets, setTweets] = useState([]); //user發文
  const [replies, setReplies] = useState([]); //user回覆
  const [likes, setLikes] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [topTenUsers, setTopTenUsers] = useState([]);
  // const [likeTweet, setLikeTweet] = useState([])
  // const [UnlikeTweet, setUnlikeTweet] = useState([])
  // const [followAccount, setFollowAccount] = useState([])

  const handleChangeUserContent = (clickItems) => {
    setUserContent(clickItems);
  };

  useEffect(() => {
    // 瀏覽使用者的推文

    //取得使用者最新個人資料
    




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
          console.log("replies", replies);
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
          setLikes(likes.map((like) => ({ ...like })));
          console.log("likes", likes);
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
          console.log("followings", followings);
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
          console.log("followers", followers);
        } else {
          setFollowers(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    const getTopTenUsersAsync = async () => {
      try {
        const topTenUsersData = await getTopTenUsers();
        const topTenUsers = topTenUsersData.data; //data內
        if (topTenUsers) {
          setTopTenUsers(topTenUsers.map((topTenUser) => ({ ...topTenUser })));
        } else {
          setTopTenUsers(null);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    const postLikeTweetAsync = async () => {
      try {
        const postLikeData = await postLikeTweet(id);
        console.log("postLikeData UUUUU", postLikeData);
        if (postLikeData) {
          console.log(postLikeData);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    const postUnlikeTweetAsync = async () => {
      try {
        const postUnlikeData = await postUnlikeTweet(id);
        console.log("postUnlikeData UUUUUU", postUnlikeData);
      } catch (error) {
        console.error("error", error);
      }
    };

    const postFollowAccountAsync = async () => {
      try {
        const postFollowAccountData = await postFollowAccount();
        console.log("postFollowAccountData UUUUU", postFollowAccountData);
      } catch (error) {
        console.error("error", error);
      }
    };

    const deleteUnfollowAccountAsync = async () => {
      try {
        const deleteUnfollowAccountData = await deleteUnfollowAccount(id);
        console.log(
          "deleteUnfollowAccountData UUUUUU",
          deleteUnfollowAccountData
        );
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
    getTopTenUsersAsync();
    postLikeTweetAsync();
    postUnlikeTweetAsync();
    postFollowAccountAsync();
    deleteUnfollowAccountAsync();
    getCheckProfileAsync();
  }, [id]);

  return (
    <div className={styles3.appContainer}>
      <div className={styles3.navbarContainer}>
        <MainNavbar >
          <NavItem title="首頁">
            <HomeIcon />
          </NavItem>
          <NavItem title="使用者列表">
            <UserActiveIcon />
          </NavItem>
          <NavItem title="設定">
            <SettingIcon />
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
      <PopularList topTenUsers={topTenUsers} />
    </div>
  );
};
export default UserPage;
