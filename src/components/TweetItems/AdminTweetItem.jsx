import styles from "styles/AdminTweetItem.module.scss"
import {ReactComponent as DeletIcon} from "icons/delete.svg"

export default function AdminTweetItem({data}) {
    return(
        <div className={styles.tweetContainer}>
            <div className={styles.avatarWrapper}>
                <img src={data.User.avatar} alt={data.User.name} />
            </div>
            <div className={styles.tweetWrapper}>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{data.User.name}</span>
                    <div className={styles.accountWrapper}>
                        <span>@{data.account}</span>
                        <span> . {data.createdAt}</span>
                    </div>
                    
                </div>
                <div className={styles.tweetWrapper}>
                    <p className={styles.tweet}>{data.description}</p>
                </div>
                <div className={styles.iconWrapper}>
                    <DeletIcon/>
                </div>
            </div>
        </div>
    )
}