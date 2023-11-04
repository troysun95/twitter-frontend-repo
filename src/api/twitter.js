import axios from 'axios';

//
const baseUrl = 'http://localhost:3001';



//拿取 authToken

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);


//AdminPage

 export const getAdminTweets = async() => {
    try{
        const res = await axiosInstance.get(`${baseUrl}/admin/tweets`)
        return res.data.data;
    }catch(error){
        console.error('[Get Tweets failed]: ', error)
    }
} ;

export const getTweetUsers = async() =>{
    try{
        const res = await axiosInstance.get(`${baseUrl}/admin/adminUserData`)
        return res.data.data;
    }catch(error){
        console.error('[Get Users failed]: ', error)
    }
}
