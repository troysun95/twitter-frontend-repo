import styles from '../styles/MainNavbar.module.scss'
import BrandIcon from '../icons/Icon.png'


export function NavItem({title}){


    return(
        <div className={styles.itemContainer}>
            <div className={styles.itemWrapper}>
                <i></i>
                <div className={styles.navtitle}>{title}</div>
            </div>
            
        </div>
    )

}




export default function MainNavbar(){

    return(
        <div className={styles.navbar}>
            <div className={styles.brandContainer}>
                <img src={BrandIcon} alt="brand-icon" />
            </div>
            <NavItem title="首頁" /> 
            <NavItem title="個人資料" /> 
            <NavItem title="設定" /> 
            <button className={styles.tweetBtn}>推文</button>
            <div className={styles.logoutContainer}>
                <div className={styles.itemWrapper}>
                    <i></i>
                    <div className={styles.logoutTilte}>登出</div>
                </div> 
            </div>
        </div>
    )
   
}
