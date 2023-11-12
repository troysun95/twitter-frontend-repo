import styles from "styles/ReplyModal.module.scss"
import { ReactComponent as DeleteActive } from "icons/deleteActive.svg";
import {ReactComponent as ReplyBtn}  from "icons/replyBtn.svg";
import clsx from 'clsx';


export default function ReplyModal({
    replyedTweet, 
    isModalOpen, 
    onChange,
    isReplyError, 
    handleReply,
    handleModalClose,
    value}){
   

    return(
        <div className={clsx(styles.modalContainer, { [styles.open]: isModalOpen })}>
            <div className={styles.header}>
                 <div className={styles.iconWrapper} onClick={handleModalClose}><DeleteActive/></div>
            </div>
            <div className={styles.replyedTweeetContainer}>
                <div className={styles.replyedUserInfo}>
                    <div className={styles.avatar}>
                        <img src={replyedTweet.User.avatar} alt="avatar"/>
                    </div>
                    <div className={styles.accountWrapper}>
                        <span>@{replyedTweet.User.account}</span>
                        <span> ・ {replyedTweet.createdAt}</span>
                    </div>
                    <div className={styles.replyedTweeet}>
                        <p>{replyedTweet.description}</p>
                    </div>
                </div>
            </div>
            <div className={styles.replyTo}>
                <div>回覆給</div>
                <div className={styles.replyedAccont}> @{replyedTweet.account}</div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.replyWrapper}>
                <input type="textarea" placeholder="推你的回覆" value={value} onChange={(e) => onChange?.(e.target.value)}/>
                <div className={styles.replyBtn} onClick={handleReply}><ReplyBtn/></div>
            </div>
            <div className={styles.errorMessage}>{ isReplyError ?   '內容不可為空白' : ''}</div>
        </div>
    )
}