import axios from 'axios';
import {Toast} from 'utility/helper.js'
const baseUrl = 'https://warm-forest-67690-2e44d4cd1684.herokuapp.com';

//每次發請求前，先到這邊取出token
const  token =localStorage.getItem('token')
axios.defaults.headers['Authorization'] = `Bearer ${token}`


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('未取得token')
    console.error(error);
  },
);


export const getAdminTweets = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/admin/tweets`);
    return res.data;
  } catch (error) {
    console.error('[Get Tweets failed]: ', error);
  }
};





export const getUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/admin/users`);
    return res.data;
  } catch (error) {
    console.error('[Get Users failed]: ', error);
  }
};



//MainPage

export const getTweets = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/tweets`);
    return res.data;
  } catch (error) {
    console.error('[Get TWeets failed]: ', error);
  }
};


// UserPage
// 使用者點瀏覽使用者的推文
export const getUserTweets = async (id) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/users/${id}/tweets`);
    return data;
  } catch (error) {
    console.error('[Get AllTweets failed]: ', error);
  }
};

// 使用者所有回覆推文
export const getUserReplies = async (id) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/users/${id}/replied_tweets`);
    return data;

  } catch (error) {
    console.error('[Get AllReplies failed]: ', error);
  }
};

// 使用者瀏覽 like 過的推文清單
export const getUserLikes = async (id) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/users/${id}/likes`);
    return data;

  } catch (error) {
    console.error('[Get AllLikes failed]: ', error);
  }
};

export const getUserFollowings = async (id) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/users/${id}/followings`);
    return data;

  } catch (error) {
    console.error('[Get All UserFollowings failed]: ', error);
  }
};
export const getUserFollowers = async (id) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/users/${id}/followers`);
    return data;

  } catch (error) {
    console.error('[Get All UserFollowers failed]: ', error);
  }
};

// 使用者能查看追蹤前10的使用者
export const getTopTenUsers = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/api/users/top10`);
        return data;
    } catch (error) {
        console.error('[Get top ten users Failed]: ', error);
        return error;
    }
};

export const DeleteTweet = async ({id}) => {
  try {
    const res = await axios.delete(`${baseUrl}/api/admin/tweets/${id}`, {id});
    return res;
  } catch (error) {
    console.error('[Delete Tweet failed]: ', error);
  }
};

//設定個人資料
export const EditUser = async (id,{
  account,
  name,
  email,
  password,
  checkPassword
}) => {
  try {
    const res = await axios.put(`${baseUrl}/api/users/${id}`,{
      account,
      name,
      email,
      password,
      checkPassword
    });
    return res;
  } catch (error) {
    console.error('[Edit User failed]: ', error);
  }
};
// POST /api/tweets/:id/like
export const postLikeTweet = async (id) => {
  try {
    const {data} = await axios.post(`${baseUrl}/api/tweets/${id}/like`);
    return data
  } catch (error) {
    console.error('[Post LikeTweet failed]: ', error);
  }
};

// POST /api/tweets/:id/unlike
export const postUnlikeTweet = async (id) => {
  try {
    const res = await axios.post(`${baseUrl}/api/tweets/${id}/unlike`);
    return res;
  } catch (error) {
    console.error('[Post UnlikeTweet failed]: ', error);
  }
};

// 使用者可追蹤其他使用者   POST /api/followships
export const postFollowAccount = async (authToken) => {
  try {
    const {data} = await axios.post(`${baseUrl}/api/followships`, { headers: { Authorization: "Bearer " + authToken } })
    return data;
  } catch (error) {
    console.error('[Post postFollowAccount failed]: ', error);
    return error
  }
};


// 使用者取消追蹤其他使用者 DELETE /api/followships/:id
export const deleteUnfollowAccount = async (authToken, id) => {
  try {
    const {data} = await axios.delete(`${baseUrl}/api/followships/${id}`, {
      headers: { Authorization: "Bearer " + authToken },
    });
    return data;
  } catch (error) {
    console.error('[Delete deleteUnfollowAccount failed]: ', error)
    Toast.fire({
      title: error.response.data.message,
      icon: "error",
    });
    return error
  }
};

// 使用者點擊頭像時可以瀏覽使用者個人資料  GET /api/users/:id
export const getCheckProfile = async (id) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/users/${id}`);
    return data;
  } catch (error) {
    console.error('[Get getCheckProfile failed]: ', error);
  }
}