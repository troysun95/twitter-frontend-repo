import styles from "styles/TweetItem.module.scss"
import { ReactComponent as LikeIcon } from "icons/like.svg"
import { ReactComponent as LikeActiveIcon }  from "icons/likeActie.svg"
import { ReactComponent as ChatIcon } from "icons/chat.svg"
import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import ReplyModal from "components/ReplyModal"
import {ReplyTweet} from "api/twitter"
import Swal from "sweetalert2"



export default function TweetItem({data, id}){
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

    const handleOtherPage =()=>{
        localStorage.setItem("UserClicked", JSON.stringify(data.User))
        const userClicked =JSON.parse(localStorage.getItem("UserClicked"))
        const userLogin =JSON.parse(localStorage.getItem("user"))
        if(userClicked.id === userLogin.id){
            navigate('/user')
        }else{
            navigate('/user/other')
        }
        
    }
   






    //回覆相關
    const handleReplyTweet = ()=>{
        //儲存協助跳轉用
        localStorage.setItem("tweet", JSON.stringify(data))
        navigate('/replylist')
    }


    const handleModalClose =()=>{
        setIsModalOpen(false)

    }

    const handleErrorCheck =(comment)=>{
        if(comment.length > 140 ){
            setIsReplyError(true)
        }else if(comment.trim().length  < 1){
            Swal.fire({
                position: "top",
                title: "內容不可為空白",
                timer: 1000,
                icon: "error",
                showConfirmButton: false,
              });
              setIsModalOpen(false)
        }else{
            setIsReplyError(false)
        }
        setComment(comment)
    }

    const handleToReply =() =>{
        localStorage.setItem("tweetTest", JSON.stringify(data))
        setIsModalOpen(true)
        
    }



    const handleReply = async() => {
        const response = JSON.parse(localStorage.getItem("tweetTest"))
        if(response){
            console.log(response.id)
        }
         handleErrorCheck(comment)
        if(!isReplyError){
            const  res = await ReplyTweet({id: response.id, comment: comment});
           if(res){
            console.log('ok')
            setRepliesAmount(repliesAmount + 1)
           }else{
            console.log('no')
           }
        }
    }

    return(
        <div className={styles.tweetContainer}  >
            <div className={styles.avatarWrapper} >
                <img src={data.User.avatar} alt={data.name} onClick={()=>{handleOtherPage() }} />
            </div>
            <div className={styles.tweetWrapper}>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{data.User.name}</span>
                    <div className={styles.accountWrapper}>
                        <span>@{data.User.account}</span>
                        <span> ・ {data.createdAt}</span>
                    </div>
                    
                </div>
                <div className={styles.tweetWrapper} onClick={()=>{handleReplyTweet()}}>
                    <p className={styles.tweet}>{data.description}</p>
     
                </div>
                <div className={styles.iconPanel}>
                    <div className={styles.iconContainer} >
                        <i className={styles.replyIcon} onClick={handleToReply}>
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
            replyedTweet={data}  
            isModalOpen={isModalOpen}  
            value={comment}
            onChange={(comment)=>{setComment(comment)}}
            handleModalClose={handleModalClose}
            handleReply={handleReply}
            isReplyError={isReplyError}/>
        </div>
    )
}






