// import { login, adminLogin } from "api/auth.js";
import { createContext, useState, useEffect } from "react";
import {
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
        postLikeTweet: async (id) => {
          const response = await postLikeTweet(id);
          if (response.data) setChangedLikes(true);
          return response;
        },

        postUnlikeTweet: async (id) => {
          const response = await postUnlikeTweet(id);
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
