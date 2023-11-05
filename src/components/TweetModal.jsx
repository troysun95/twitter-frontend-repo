import styles from "styles/TweetModal.module.scss"
import { ReactComponent as TweetBtn } from "icons/tweetBtn.svg"
import { useNavigate } from "react-router-dom";
import {user} from "data/user"

export default function TweetModal(){
    const navigate=useNavigate();

    return(
        <div className={styles.modalContainer}>
            <div className={styles.toTweetWrapper}>
                <div className={styles.avatar}>
                    <img src={user.avatar} alt="avatar"/>
                </div>
                <input type="text" placeholder="有什麼新鮮事？"/>
                <div className={styles.tweetBtn} onClick={()=>{navigate("/main");}}><TweetBtn/></div>
            </div>

        </div>
    )
}