import styles from "styles/TweetItem.module.scss"
import { ReactComponent as LikeIcon } from "icons/like.svg"
import { ReactComponent as LikeActiveIcon }  from "icons/likeActie.svg"
import { ReactComponent as ChatIcon } from "icons/chat.svg"
import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import ReplyModal from "components/ReplyModal"
import {ReplyTweet} from "api/twitter"



export default function TweetItem({data}){
    const navigate = useNavigate();
    const [likesAmount, setlikesAmount] = useState(data.likesAmount)
    const [repliesAmount, setRepliesAmount] = useState(data.repliesAmount)
    const [isLiked, setIsLiked] = useState(data.isLiked)
    const [isModalOpen, setIsModalOpen]=useState(false)
    const [isReplyError, setIsReplyError] = useState(false)
    const [comment, setComment] = useState('')
    
   //喜歡推文
    const handleLiked =() =>{
        if(isLiked === true){
            setlikesAmount(likesAmount => likesAmount - 1)
            //將 資料 post 回 like
            setIsLiked(!isLiked)
        }else{
            setlikesAmount(likesAmount => likesAmount + 1)
            //將 資料 post 回 unlike
            setIsLiked(!isLiked)
        }
       
    }

    

    // if(comment > 140 ){
    //     setIsReplyError(true)
    // }else{
    //     setIsReplyError(false)
    // }


    const handleReplyTweet = ()=>{
        //儲存協助跳轉用
        localStorage.setItem("tweet", JSON.stringify(data))
        navigate('/replylist')
    }


    const handleModalClose =()=>{
        setIsModalOpen(false)
    }

    // const handleReply = async() =>{
    //     if(!isReplyError){
    //         const id = data.id
    //         const res = await ReplyTweet({id, comment})
    //         if(res.data.status === "success"){
    //             console.log(`回覆成功`)
    //             setRepliesAmount(setRepliesAmount + 1)
    //         }
    //     }else{
    //         console.log(`回覆字數超出限制`)
    //     }
    // }

    const handleReply = async() =>{
        if(comment.length > 140){
            setIsReplyError(true);
            console.log(`回覆字數超出限制`);
        } else {
            setIsReplyError(false);
            const id = data.id;
            const res = await ReplyTweet({id, comment});
            if(res.data.status === "success"){
                console.log(`回覆成功`);
                setComment('')
                setIsModalOpen(false)
                setRepliesAmount(repliesAmount + 1);
            }
        }
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
                <div className={styles.tweetWrapper} onClick={()=>{handleReplyTweet() }}>
                    <p className={styles.tweet}>{data.description}</p>
     
                </div>
                <div className={styles.iconPanel}>
                    <div className={styles.iconContainer} >
                        <i className={styles.replyIcon} onClick={()=>{setIsModalOpen(true)}}>
                            <ChatIcon/>
                        </i>
                        <div className={styles.NumberWrapper}>
                            <span>{repliesAmount}</span>
                        </div>
                    </div>
                    <div className={styles.iconContainer}>
                        <i className={styles.likeIcon} onClick={handleLiked}>
                        {isLiked ? <LikeActiveIcon/> : <LikeIcon/> }
                        </i>
                        <div className={styles.NumberWrapper}>
                            <span>{likesAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ReplyModal 
            Replyeduser={data.User}  
            isModalOpen={isModalOpen}  
            isReplyError={isReplyError} 
            value={comment}
            onChange={(comment)=>{setComment(comment)}}
            handleModalClose={handleModalClose}
            handleReply={handleReply}/>
        </div>
    )
}






