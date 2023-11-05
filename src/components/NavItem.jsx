
import styles from "styles/MainNavbar.module.scss";
import { useNavigate } from "react-router-dom";

export default function NavItem({ title, children,toRoute}) {
  const navigate = useNavigate();

  return (
    <div >
        <div className={styles.itemContainer} onClick={()=>{navigate(toRoute)}}>
          <div className={styles.itemWrapper}>
          {children}
            <div className={styles.navtitle}>{title}</div>
          </div>
        </div>  
    </div>
    
    
  );
}
