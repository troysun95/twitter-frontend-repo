// import { login, adminLogin } from "api/auth.js";
import { createContext, useState, useEffect } from "react";
// import * as jwt from "jsonwebtoken";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import {
  // postTweets,
  // putUserSelf,
  // getUser,
  // getUserReplies,
  // getUserLikes,
  // postReply,
  postLikeTweet,
  postUnlikeTweet
} from "api/twitter.js";

const AuthContext = createContext("");
const AuthProvider = ({ children }) => {
  
  //  更新 點擊 愛心的推文
  const [changedLikes, setChangedLikes] = useState(false)

  useEffect(() => {
    setChangedLikes(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        changedLikes, setChangedLikes,
      
        postLikeTweet: async (id) => {
          const response = await postLikeTweet(id);
          console.log("postLikeData from AuthContext.jsx response", response);
          if (response.data) setChangedLikes(true);
          return response;
        },

        postUnlikeTweet: async (id) => {
          const response = await postUnlikeTweet(id);
          console.log("postUnlikeData UUUUUU from AuthContext.jsx", response);
          if (response.data) setChangedLikes(true);
          return response;
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext, AuthProvider };
