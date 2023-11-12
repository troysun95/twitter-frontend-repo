import styles from "styles/ReplyedTweeet.module.scss"
import { ReactComponent  as ChatIcon } from "icons/chat.svg"
import { ReactComponent  as LikeIcon } from "icons/like.svg"

const ReplyedTweeet = ({replyedTweet})=> {

    return (
        <div className={styles.tweetPanel}>
            <div className={styles.userInfoContainer}>
                <img src={replyedTweet.User.avatar} alt={replyedTweet.User.name} />
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{replyedTweet.User.name}</span>
                    <span className={styles.account}>@{replyedTweet.User.account}</span>
                </div>
            </div>                
            <div className={styles.tweetWrapper}>
                <p className={styles.description}>{replyedTweet.description}</p>
                <div classname={styles.timeWrapper} >
                    <span>{replyedTweet.createdAtTime} ・ {replyedTweet.createdAtDate}</span>
                </div>
            </div>
            <div className={styles.amountContainer}>
                <div className={styles.itemAcount}> {replyedTweet.repliesAmount} 
                    <span className={styles.item}>回覆</span>    
                </div>
                <div className={styles.itemAcount}>{replyedTweet.likesAmount}
                    <span className={styles.item}>喜歡次數</span>
                </div>
            </div>
            <div className={styles.iconPanel}>
                <div className={styles.icon}><ChatIcon/> </div>
                <div className={styles.icon}><LikeIcon /></div>
            </div>
        </div>
    )
}

export default ReplyedTweeet