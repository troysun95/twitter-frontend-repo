import axios from 'axios';



const authURL = 'https://warm-forest-67690-2e44d4cd1684.herokuapp.com';



export const adminLogin = async ({ account, password }) => {
  try {
    const response = await axios.post(`${authURL}/api/admin/signin`, {
      account,
      password,
    });
    const  {token} = response.data.data;
    const success = response.data.status === 'success';
    // const Authorization = {headers: {
    // Authorization: 'Bearer ' + token}}
    // console.log(Authorization)
    return { success, token: token }
    
  }catch (error) {
    console.error('[AdminLogin Failed]:', error);
    return { success: false };
  }
}





export const Login = async ({ account, password }) => {
  try {
    const response = await axios.post(`${authURL}/api/users/signin`, {
      account,
      password,
    });
    const  {token} = response.data.data;
    const success = response.data.status === 'success';
    const  {user}  = response.data.data
    return { success, token: token , user: user }
    
  }catch (error) {
    console.error('[Login Failed]:', error);
    return { success: false };
  }
}
