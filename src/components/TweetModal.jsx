import styles from "styles/TweetModal.module.scss"
import { ReactComponent as TweetBtn } from "icons/tweetBtn.svg"
//import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as DeleteActive } from "icons/deleteActive.svg";
import {AddTweet} from "api/twitter"


export default function TweetModal({user,onClick}){
    //const navigate=useNavigate();
    const [isError, setIsError] =  useState(false)
    const [description, setDescription] =useState("");

    function handleErrorCheck(e){
        const input = e.target.value
        if(input.length >140){
            setIsError(true)
        }else{setIsError(false)}
        setDescription(input)
    }

    const handleSave = async() => {
        if(description.length <140){
            const  res = await AddTweet(description);
            if(res.data.status === "success"){
            console.log('推文成功')
            //並更新 tweets
            
            }
        }else{
            return
        }
        
    }

    return(
        <div className={styles.modalContainer}>
            <div className={styles.header}>
                 <div className={styles.iconWrapper} onClick={onClick}><DeleteActive/></div>
            </div>
            <div className={styles.toTweetWrapper}>
                <div className={styles.avatar}>
                    <img src={user.avatar} alt="avatar"/>
                </div>
                
                <input type="textarea" placeholder="有什麼新鮮事？"  value={description}  onChange={handleErrorCheck}/>
                <div className={styles.tweetBtn} onClick={handleSave}><TweetBtn/></div>
            </div>
            <div className={styles.errorMessage}>{ isError ?   '字數不可超過 140 字' : ''}</div>
        </div>
    )
}