import styles from "styles/TweetItem.module.scss"
import { ReactComponent as LikeIcon } from "icons/like.svg"
import { ReactComponent as LikeActiveIcon }  from "icons/likeActie.svg"
import { ReactComponent as ChatIcon } from "icons/chat.svg"
import {useState} from 'react'
import { useNavigate } from "react-router-dom"







export default function TweetItem({data, id}){
    const navigate = useNavigate;
    const prelikesAmount = data.likesAmount
    const prevIsLiked = data.isLiked
    const [isliked, setIsLiked] = useState(prevIsLiked);
    const [likesAmount, setlikesAmount] = useState(prelikesAmount)

    const handleLiked =() =>{
        if(isliked === true){
            setlikesAmount(prelikesAmount => prelikesAmount - 1)
            setIsLiked(!isliked)
        }else{
            setlikesAmount(prelikesAmount => prelikesAmount + 1)
            setIsLiked(!isliked)
        }
       
        //要回傳資料回到所有推文？
    }

    const  handleReplyModal =()=>{
        //modal 顯示
        
    }


    const handleRplyTweet = ()=>{
        //儲存協助跳轉用
        localStorage.setItem("RelyedTweeId:", id);
        navigate('/replylist')
    }
    
    return(
        <div className={styles.tweetContainer} id={id} onClick={(id)=>{handleRplyTweet(id)}}>
            <div className={styles.avatarWrapper}>
                <img src={data.User.avatar} alt={data.name} />
            </div>
            <div className={styles.tweetWrapper}>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{data.User.name}</span>
                    <div className={styles.accountWrapper}>
                        <span>@{data.User.account}</span>
                        <span> . {data.createdAt}</span>
                    </div>
                    
                </div>
                <div className={styles.tweetWrapper}>
                    <p className={styles.tweet}>{data.description}</p>
                </div>
                <div className={styles.iconPanel}>
                    <div className={styles.iconContainer} >
                        <i className={styles.replyIcon} onClick={handleReplyModal}>
                            <ChatIcon/>
                        </i>
                        <div className={styles.NumberWrapper}>
                            <span>{data.repliesAmount}</span>
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
        </div>

    )
}






