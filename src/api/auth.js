import axios from 'axios';


//待與後端確認
const authURL = ''

//AdminPage，url 待確認  /api/admin/signin

export const  adminLogin = async({account, password}) =>{
    try {
        const { data } = await axios.post(`${authURL}/admin/signin`, {
          account,
          password,
        });
    
        const { authToken } = data;
        if (authToken) {
          return { success: true, ...data };
        }
        return data;
      } catch (error) {
        console.error('[AdminLogin Failed]:', error);
      }
};

//驗證token
export const checkPermission = async(authToken) => {
        try{
        const response = await axios.get(`${authURL}/test-token`,
        {headers: {
            Authorization: 'Bearer ' + authToken,
          },
        });
        return response.data.success;
      } catch (error) {
        console.error('[Check Permission Failed]:', error);
      }
    };
    
