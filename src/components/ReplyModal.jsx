import styles from "styles/TweetModal.module.scss"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as DeleteActive } from "icons/deleteActive.svg";
import {ReactComponent as ReplyBtn}  from "icons/tweetBtn.svg";


export default function ReplyModal({Replyeduser,onClick}){
    const navigate=useNavigate();
    const [isError, setIsError] =  useState(false)

    function handleErrorCheck(e){
        const input = e.target.value
        if(input.length >140){
            setIsError(true)
        }else{setIsError(false)}
        console.log(isError)
    }


    const handleReply = ()=>{
        //發送回覆 api

        //若成功發送，則回到主頁面
        navigate('/main')
    }

    return(
        <div className={styles.modalContainer}>
            <div className={styles.replyedUser}>
                <div className={styles.avatar}>
                    <img src={Replyeduser.avatar} alt="avatar"/>
                </div>
            </div>
            <div className={styles.header}>
                 <div className={styles.iconWrapper} onClick={onClick}><DeleteActive/></div>
            </div>
            <div className={styles.toTweetWrapper}>
                
                
                <input type="textarea" placeholder="有什麼新鮮事？"  onChange={handleErrorCheck}/>
                <div className={styles.tweetBtn} onClick={handleReply}><ReplyBtn/></div>
            </div>
            <div className={styles.errorMessage}>{ isError ?   '字數不可超過 140 字' : ''}</div>
        </div>
    )
}