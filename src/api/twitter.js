import axios from 'axios';

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
    // const {data} = await axios.get(`${baseUrl}/api/users/${id}/replied_tweets`);

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
        const { data } = await axios.get(`${baseUrl}/api/users/top10`);
        // console.log('tweets.js裡的 getTopTenUsers 回傳值: data', data);
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


//編輯個人資料頁面 
//cover 與  avatar 皆為檔案格式，待確認

export const EditUserProfile = async (id,{
  name,
  introduction,
  avatar,
  password,
  cover
}) => {
  try {
    const res = await axios.put(`${baseUrl}/api/users/${id}`,{
      name,
      introduction,
      avatar,
      password,
      cover
    });
    
    return res;
    
  } catch (error) {
    console.error('[Edit UserProfile failed]: ', error);
  }
};



//使用者新增 推文 /api/tweets
export const AddTweet = async (description) => {
  try {
    const res = await axios.post(`${baseUrl}/api/tweets`,{description});
    

    return res;
    
  } catch (error) {
    console.error('[Add Tweet failed]: ', error);
  }
}

//使用者點擊推文查看特定推文 /api/tweets/:id
export const GetOneTweet = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/api/tweets/${id}`,{id});
    return res;
    
  } catch (error) {
    console.error('[Get one Tweet failed]: ', error);
  }
}


//使用者點擊推文查看特定推文 /api/tweets/:id/replies
export const getOneTweetReplies = async (id) => {
  try {
    const res = await axios.get(`${baseUrl}/api/tweets/${id}/replies`,{id});
    return res;
    
  } catch (error) {
    console.error('[Get one Tweet Replies failed]: ', error);
  }
}



//使用者回覆他人推文 /api/tweets/:id/replies
export const ReplyTweet = async ({id, comment}) => {
  try {
    const res = await axios.post(`${baseUrl}/api/tweets/${id}/replies`,{id, comment});
    
    return res;
    
  } catch (error) {
    console.error('[Get one Tweet Replies failed]: ', error);
    
  }
}