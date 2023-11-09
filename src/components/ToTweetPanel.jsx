import styles from "styles/ToTweetPanel.module.scss"
import { ReactComponent as TweetBtn } from "icons/tweetBtn.svg"


export default function ToTweetPanel({onClick}){
    const user = JSON.parse(localStorage.getItem("user"))

    
    return(
        <div className={styles.toTweetPanel}>
            <div className={styles.toTweetWrapper}>
                <div className={styles.avatar}>
                    <img src={user.avatar} alt={user.name}/>
                </div>
                <input type="text" placeholder="有什麼新鮮事？"   onClick={onClick} />

                <div className={styles.tweetBtn} ><TweetBtn/></div>
                <div></div>
            </div>

        </div>
    )
}