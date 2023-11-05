import styles from "styles/ToTweetPanel.module.scss"
import { ReactComponent as TweetBtn } from "icons/tweetBtn.svg"
import { useState } from "react";
export default function ToTweetPanel({user,handleSubmitTweet,handleInputChange,isSubmit}){
    const [inputValue, setInputValue]  = useState("");
    //handler
    const handleChange = (event) => {
        setInputValue(event.target.value);
        handleInputChange(event.target.value);
        if(isSubmit){
            setInputValue("")
        }
      };
    
    return(
        <div className={styles.toTweetPanel}>
            <div className={styles.toTweetWrapper}>
                <div className={styles.avatar}>
                    <img src={user.avatar} alt="avatar"/>
                </div>
                <input type="text" placeholder="有什麼新鮮事？" value={inputValue}  onChange={handleChange} />
                <div className={styles.tweetBtn} onClick={handleSubmitTweet}><TweetBtn/></div>
            </div>

        </div>
    )
}