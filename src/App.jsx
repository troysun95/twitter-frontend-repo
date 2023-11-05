import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {MainPage, MainReplyPage, MainTweetPage ,UserPage, AdminPage, AdminUserPage, AdminMainPage,SettingPage}  from 'pages'
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
