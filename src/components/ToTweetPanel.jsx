import styles from "styles/ToTweetPanel.module.scss"
import { ReactComponent as TweetBtn } from "icons/tweetBtn.svg"
import { useState } from "react";

export default function ToTweetPanel({handleSubmitTweet ,handleInputChange,isSubmit}){
    const [inputValue, setInputValue]  = useState("");
    const user = localStorage.getItem("user")
    console.log(user)
    
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
                    <img src="" alt=""/>
                </div>
                <input type="text" placeholder="有什麼新鮮事？" value={inputValue}  onChange={handleChange} />

                <div className={styles.tweetBtn} onClick={handleSubmitTweet}><TweetBtn/></div>
                <div></div>
            </div>

        </div>
    )
}