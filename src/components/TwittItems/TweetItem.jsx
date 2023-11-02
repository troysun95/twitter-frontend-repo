import styles from "styles/TweetItem.module.scss"


export default function TweetItem({data, handleClick}){
    return(
    <div className={styles.tweetContainer}>
        <div className={styles.avatarWrapper}>
            <img src={data.avatar} alt={data.name} />
        </div>
        <div className={styles.tweetWrapper}>
            <div className={styles.userInfo}>
                <span className={styles.userName}>{data.name}</span>
                <div className={styles.accountWrapper}>
                    <span>@{data.account}</span>
                    <span> . {data.time}</span>
                </div>
                
            </div>
            <div className={styles.tweetWrapper}>
                <p className={styles.tweet}>{data.tweet}</p>
            </div>
            <div className={styles.iconPanel}>
                <div className={styles.iconContainer} id={data.id}  onClick={handleClick}>
                    <i className={styles.replyIcon}>回覆</i>
                    <div className={styles.NumberWrapper}>
                        <span>{data.relpyedCounts}</span>
                    </div>
                </div>
                <div className={styles.iconContainer} id={data.id} onClick={handleClick}>
                    <i className={styles.likeIcon}>喜歡</i>
                    <div className={styles.NumberWrapper}>
                        <span>{data.likedCounts}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
    
}






