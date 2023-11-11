import styles from "styles/ReplyedTweeet.module.scss"

const ReplyedTweeet = ({replyedTweet})=> {

    return (
        <div className={styles.tweetContainer}>
            <div className={styles.avatarWrapper}>
                <img src={replyedTweet.User.avatar} alt={replyedTweet.User.name} />
            </div>
            <div className={styles.tweetWrapper}>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{replyedTweet.User.name}</span>
                    <div className={styles.accountWrapper}>
                        <span>@{replyedTweet.User.account}</span>
                    </div>
                </div>
                <div className={styles.tweetWrapper}>
                    <p className={styles.tweet}>{replyedTweet.description}</p>
                    <span>{replyedTweet.createdAtTime} ・ {replyedTweet.createdAtDate}</span>
                </div>

            </div>
        </div>
    )
}

export default ReplyedTweeet