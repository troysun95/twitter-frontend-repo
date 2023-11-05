import styles from "styles/TweetItem.module.scss"
import { ReactComponent as LikeIcon } from "icons/like.svg"
import { ReactComponent as ChatIcon } from "icons/chat.svg"
import { useNavigate } from "react-router-dom"



export default function TweetItem({data}){
    const handleGetId = (e)=> {
        //抓到點擊tweet 的 id
        const id = e.target.id
        localStorage.setItem('replyedTweetId',id )
        //可能要去postman 測試requst

    }
    
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
                <div className={styles.iconContainer} id={data.id}  onClick={handleGetId}>
                    <i className={styles.replyIcon }><ChatIcon/></i>
                    <div className={styles.NumberWrapper}>
                        <span>{data.relpyedCounts}</span>
                    </div>
                </div>
                <div className={styles.iconContainer} id={data.id}>
                    <i className={styles.likeIcon}><LikeIcon/></i>
                    <div className={styles.NumberWrapper}>
                        <span>{data.likedCounts}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
    
}






