import styles from "styles/ReplyModal.module.scss"
import { ReactComponent as DeleteActive } from "icons/deleteActive.svg";
import {ReactComponent as ReplyBtn}  from "icons/replyBtn.svg";
import clsx from 'clsx';


export default function ReplyModal({
    Replyeduser, 
    isModalOpen, 
    onChange,
    isReplyError, 
    handleReply,
    handleModalClose,
    value}){
   

    return(
        // <div className={clsx('styles.modalContainer', {open : isModalOpen })}>
        <div className={clsx(styles.modalContainer, { [styles.modalContainerOpen]: isModalOpen })}>
            <div className={styles.replyedUser}>
                <div className={styles.avatar}>
                    <img src={Replyeduser.avatar} alt="avatar"/>
                </div>
            </div>
            <div className={styles.header}>
                 <div className={styles.iconWrapper} onClick={handleModalClose}><DeleteActive/></div>
            </div>
            <div className={styles.toTweetWrapper}>
                <input type="textarea" placeholder="有什麼新鮮事？" value={value} onChange={(e) => onChange?.(e.target.value)}/>
                <div className={styles.tweetBtn} onClick={handleReply}><ReplyBtn/></div>
            </div>
            <div className={styles.errorMessage}>{ isReplyError ?   '字數不可超過 140 字' : ''}</div>
        </div>
    )
}