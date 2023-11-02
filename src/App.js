import './styles/reset.scss'
import  './styles/base.scss'

import  PopularList from './components/PopularList'

//新增
import MainNavbar from 'components/MainNavbar'
import styles from './App.module.scss'

function App() {


  return (
    <>
      <div className={styles.appContainer}>
        <div className={styles.navbarContainer}>
          <MainNavbar />
          
        </div>
        <div className={styles.content}>
          置換內容
        {/* <TweetItem data={data}/>
        <Input placeholder="請輸入帳號" label="帳號" alarms="警告" /> */}
          
        </div>
        
        <PopularList/>
      </div>
    </>
    
  );
}

export default App;