import styles from 'styles/MainNavbar.module.scss'
import { ReactComponent as Logo  } from "icons/logo.svg";
import { ReactComponent as LogOutIcon } from "icons/logout.svg";



export default function MainNavbar({children, handleClick}){
  
    return (
      <div className={styles.navbarContainer}>
        <div className={styles.navbar}>
          <div className={styles.brandContainer}>
            < Logo/>
          </div>
          {children}      
          <div className={styles.logoutContainer}>
            <div className={styles.itemWrapper}>
              <LogOutIcon />
              <div className={styles.logoutTilte} onClick={handleClick}>登出</div>
            </div>
          </div>
        </div>
      </div>
    );
   
}
