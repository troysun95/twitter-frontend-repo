import axios from 'axios';

const baseUrl = ' https://warm-forest-67690-2e44d4cd1684.herokuapp.com';

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


export const UnlikeTweet = async (id) => {
  try {
    const res = await axios.post(`${baseUrl}/api/tweets/:id/unlike`);
    return res.data;
  } catch (error) {
    console.error('[Unlike Tweet failed]: ', error);
  }
};



