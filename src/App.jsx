import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "context/AuthContext.jsx";


import {
  MainPage,
  UserPage,
  AdminPage,
  AdminUserPage,
  AdminMainPage,
  SettingPage,
  LoginPage,
  ReplyListPage,
  RegisterPage,
  UserFollowerPage,
  UserFollowingPage,
  UserOtherPage,
} from "pages";

import './styles/reset.scss'
import  './styles/base.scss'

const basename = process.env.PUBLIC_URL;

function App() {
  return (
    <div className="app">
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <Routes>
            <Route path="admin" element={<AdminPage />} />
            <Route path="admin/main" element={<AdminMainPage />} />
            <Route path="admin/users" element={<AdminUserPage />} />
            <Route path="main" element={<MainPage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="user/follower" element={<UserFollowerPage />} />
            <Route path="user/following" element={<UserFollowingPage />} />
            <Route path="setting" element={<SettingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="replylist" element={<ReplyListPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="user/other" element={<UserOtherPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
