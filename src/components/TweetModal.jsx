import styles from "styles/TweetModal.module.scss"
import { ReactComponent as TweetBtn } from "icons/tweetBtn.svg"
import { useState } from "react";
import { ReactComponent as DeleteActive } from "icons/deleteActive.svg";
import clsx from 'clsx'
import {AddTweet} from "api/twitter"


export default function TweetModal({user,onClick, isOpen}){
    //const navigate=useNavigate();
    const [isTweetError, setIsTweetError] =  useState(false)
    const [description, setDescription] =useState("");

    function handleErrorCheck(e){
        const input = e.target.value
        if(input.length >140){
            setIsTweetError(true)
        }else{setIsTweetError(false)}
        setDescription(input)
    }

    const handleSave = async() => {
        if(description.length < 140 && description.length > 0){
            const  res = await AddTweet(description);
            if(res.data.status === "success"){
                setDescription('')
                console.log('推文成功')
            }
        }else{
            console.log('推文字數超過限制')
            return
        }
        
    }

    return(
        <div className={clsx(styles.modalContainer, { [styles.open]: isOpen })}>
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
            <div className={styles.errorMessage}>{ isTweetError ?   '字數不可超過 140 字' : ''}</div>
        </div>
    )
}