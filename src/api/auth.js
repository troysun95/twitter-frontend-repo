import axios from 'axios';


//待與後端確認
const authURL = 'https://warm-forest-67690-2e44d4cd1684.herokuapp.com'

//AdminPage，url 待確認  /api/admin/signin

export const adminLogin = async ({ account, password }) => {
  try {
    const response = await axios.post(`${authURL}/api/admin/signin`, {
      account,
      password,
    });
    const { token } = response.data.data;
    const success = response.data.status === 'success';
    return { success, authToken: token };
    
  } catch (error) {
    console.error('[AdminLogin Failed]:', error);
    return { success: false };
  }
};

//向後端驗證金鑰
// export const checkPermission = async (authToken) => {
//   try {
//     const response = await axios.get(`${authURL}/`, {
//       headers: {
//         Authorization: 'Bearer ' + authToken,
//       },
//     });
//     //按照回傳是 success 或是 status
//     return response.data.data.success;
//   } catch (error) {
//     console.error('[Check Permission Failed]:', error);
//   }
// };


export const checkTokenIsValid = async (authToken) => {
  try {
    const response = await axios.post(`${authURL}/api/admin/signin`, {
      headers: {
                Authorization: 'Bearer ' + authToken,
              }
    });
    return response.data.isValid;
  } catch (error) {
    console.error('[Check Token Failed]:', error);
    return false;
  }
};