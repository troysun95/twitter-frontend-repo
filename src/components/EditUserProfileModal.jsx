import styles from "styles/EditUserProfileModal.module.scss"

const EditUserProfileModal = ({isOpen, })=>{

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
            <div className={styles.errorMessage}>{ isError ?   '字數不可超過 140 字' : ''}</div>
        </div>
    )
}

export default EditUserProfileModal;