import styles from "styles/TweetItem.module.scss"
import { ReactComponent as LikeIcon } from "icons/like.svg"
import { ReactComponent as LikeActiveIcon }  from "icons/likeActie.svg"
import { ReactComponent as ChatIcon } from "icons/chat.svg"
import {useState} from 'react'
import { useNavigate } from "react-router-dom"








export default function TweetItem({data, id}){
    const navigate = useNavigate();
    const prelikesAmount = data.likesAmount

    const prevIsLiked = data.isLiked
    const [isliked, setIsLiked] = useState(prevIsLiked);
    const [likesAmount, setlikesAmount] = useState(prelikesAmount)
    const repliesAmount = data.repliesAmount
    //const [repliesAmount, setRepliesAmount] = useState(data.repliesAmount);
   
    const handleLiked =() =>{
        if(isliked === true){
            setlikesAmount(prelikesAmount => prelikesAmount - 1)
            setIsLiked(!isliked)
        }else{
            setlikesAmount(prelikesAmount => prelikesAmount + 1)
            setIsLiked(!isliked)
        }
       
    }

    const handleReplyModal =()=>{
        //
    }

    const handleRplyTweet = ()=>{
        //儲存協助跳轉用
        localStorage.setItem("ReplyedTweetId", data.id);
        navigate('/replylist')
    }

    
    return(
        <div className={styles.tweetContainer}  >
            <div className={styles.avatarWrapper}>
                <img src={data.User.avatar} alt={data.name} />
            </div>
            <div className={styles.tweetWrapper}>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{data.User.name}</span>
                    <div className={styles.accountWrapper}>
                        <span>@{data.User.account}</span>
                        <span> ・ {data.createdAt}</span>
                    </div>
                    
                </div>
                <div className={styles.tweetWrapper} onClick={()=>{handleRplyTweet() }}>
                    <p className={styles.tweet}>{data.description}</p>
     
                </div>
                <div className={styles.iconPanel}>
                    <div className={styles.iconContainer} >
                        <i className={styles.replyIcon} onClick={handleReplyModal}>
                            <ChatIcon/>
                        </i>
                        <div className={styles.NumberWrapper}>
                            <span>{repliesAmount}</span>
                        </div>
                    </div>
                    <div className={styles.iconContainer}>
                        <i className={styles.likeIcon} onClick={handleLiked}>
                        {isliked ? <LikeActiveIcon/> : <LikeIcon/> }
                        </i>
                        <div className={styles.NumberWrapper}>
                            <span>{likesAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ReplyModal className={styles.replyModal} Replyeduser={Replyeduser}  isOpen={isOpen}  onClick={handleClose} /> */}
        </div>
    )
}






