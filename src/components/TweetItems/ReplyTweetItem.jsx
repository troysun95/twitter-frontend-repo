import styles from "styles/ReplyTweetItem.module.scss"

const ReplyTweetItem = ({data}) => {
    const tweetReplyed = JSON.parse(localStorage.getItem("tweet"))
    return (
        <div className={styles.tweetPanel}  >
            <div className={styles.avatarWrapper}>
                <img src={data.User.avatar} alt={data.name} />
            </div>
            <div className={styles.tweetContainer}>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{data.User.name}</span>
                    <div className={styles.accountWrapper}>
                        <span>@{data.User.account}</span>
                        <span> ・ {data.createdAt}</span>
                    </div>
                </div>
                <div className={styles.replyedWrapper}>
                回覆<span className={styles.replyedAccount}>  @{tweetReplyed.User.account}</span>
                </div>
                <div className={styles.tweetWrapper} >
                    <p className={styles.tweet}>{data.comment}</p>
                </div>
            </div>
        </div>
    )
}

export  default ReplyTweetItem ;
