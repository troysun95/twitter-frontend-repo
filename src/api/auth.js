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
    console.log('admin login success')
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
    console.log('login success')
    console.log( {user} )
    return { success, token: token , user: user }
    
  }catch (error) {
    console.error('[Login Failed]:', error);
    return { success: false };
  }
}



export const Register = async ({
  name,
	account,
	email,
	password,
	checkPassword
}) => {
  try {
    const response = await axios.post(`${authURL}/api/users`, {
      name,
      account,
      email,
      password,
      checkPassword
    });
    return response;
  }catch (error) {
    console.error('[Register Failed]:', error);
    return { success: false };
  }
}



// // 驗證token是否有效
// export const checkPermission = async (authToken) => {
//   try {
//     const response = await axios.get(`${authURL}/test-token`, {
//       headers: {
//         Authorization: 'Bearer ' + authToken
//       }
//     })

//     return response.data.success
//   } catch (error) {
//     console.error('[Check Permission Failed]:', error)
//   }
// }
