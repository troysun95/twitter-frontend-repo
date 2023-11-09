import axios from 'axios';

const baseUrl = 'https://warm-forest-67690-2e44d4cd1684.herokuapp.com';

//每次發請求前，先到這邊取出token(全域？)
const  token =localStorage.getItem('token')
axios.defaults.headers['Authorization'] = `Bearer ${token}`


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('取得token')
      console.log(config.headers)
    }
    return config;
  },
  (error) => {
    console.log('no取得token')
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
    // const res = await axios.get(`${baseUrl}/api/users/${id}/tweets`);
    const {data} = await axios.get(`${baseUrl}/api/users/${id}/tweets`);

    console.log('tweets.js裡的 getUserTweets 回傳值: ', data);
    // 這邊要注意回傳內容，只有一層 data
    // return res.data;
    return data;
  } catch (error) {
    console.error('[Get AllTweets failed]: ', error);
  }
};

// 使用者所有回覆推文
export const getUserReplies = async (id) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/users/${id}/replied_tweets`);
    console.log('tweets.js裡的 getUserReplies 回傳值: ', data);
    return data;

  } catch (error) {
    console.error('[Get AllReplies failed]: ', error);
  }
};

// 使用者瀏覽 like 過的推文清單
export const getUserLikes = async (id) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/users/${id}/likes`);
    console.log('tweets.js裡的 getUserLikes 回傳值: ', data);
    return data;

  } catch (error) {
    console.error('[Get AllLikes failed]: ', error);
  }
};

export const getUserFollowings = async (id) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/users/${id}/followings`);
    console.log('tweets.js裡的 getUserFollowings 回傳值: ', data);
    return data;

  } catch (error) {
    console.error('[Get All UserFollowings failed]: ', error);
  }
};
export const getUserFollowers = async (id) => {
  try {
    const {data} = await axios.get(`${baseUrl}/api/users/${id}/followers`);
    console.log('tweets.js裡的 getUserFollowers 回傳值: ', data);
    return data;

  } catch (error) {
    console.error('[Get All UserFollowers failed]: ', error);
  }
};

// 使用者能查看追蹤前10的使用者
export const getTopTenUsers = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/api/users`);
        console.log('tweets.js裡的 getTopTenUsers 回傳值: data', data);
        return data;
    } catch (error) {
        console.error('[Get top ten users Failed]: ', error);
        return error;
    }
};