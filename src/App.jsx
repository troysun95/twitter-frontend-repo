import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {MainPage, MainReplyPage, MainTweetPage ,UserPage, AdminPage, AdminUserPage, 
  AdminMainPage, SettingPage, LoginPage, ReplyListPage, RegisterPage}  from 'pages'
import './styles/reset.scss'
import  './styles/base.scss'
// import styles from './App.module.scss'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/main" element={<AdminMainPage />} />
          <Route path="admin/users" element={<AdminUserPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="main/tweet" element={<MainTweetPage />} />
          <Route path="main/replymodal" element={<MainReplyPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="replylist" element={<ReplyListPage/>} />
          <Route path="register" element={<RegisterPage/>} />
          <Route path="*" element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
