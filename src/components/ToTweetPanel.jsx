import styles from "styles/ToTweetPanel.module.scss"

export default function ToTweetPanel({
    avatar
}){
    return(
        <div className={styles.toTweetPanel}>
            <div className={styles.toTweetWrapper}>
                <div className={styles.avatar}>
                    <img src={avatar} alt="avatar"/>
                </div>
            </div>

        </div>
    )
}