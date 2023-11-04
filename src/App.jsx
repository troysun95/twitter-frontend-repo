import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {  MainPage,AdminPage, AdminMainPage, AdminUserPage} from 'pages'
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

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
