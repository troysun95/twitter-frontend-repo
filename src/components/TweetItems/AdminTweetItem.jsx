import styles from "styles/AdminTweetItem.module.scss"
import {ReactComponent as DeletIcon} from "icons/delete.svg"
import {DeleteTweet} from 'api/twitter'
import Swal from "sweetalert2"

export default function AdminTweetItem({data}) {
    const handleDeleteTweet = async() =>{
        //取得推文 id
        // const tweetId = this.id
        // //測試
        // console.log(tweetId)
        const deletMessage = await DeleteTweet()
        if(deletMessage.status === "success"){
            Swal.fire({
                position: 'top',
                title: `${deletMessage.message}`,
                timer: 1000,
                icon: 'success',
                showConfirmButton: false,
            });
        }

    }


    

    return(
        <div className={styles.tweetContainer}>
            <div className={styles.avatarWrapper}>
                <img src={data.User.avatar} alt={data.User.name} />
            </div>
            <div className={styles.tweetWrapper}>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{data.User.name}</span>
                    <div className={styles.accountWrapper}>
                        <span>@{data.account}</span>
                        <span> . {data.createdAt}</span>
                    </div>
                    
                </div>
                <div className={styles.tweetWrapper}>
                    <p className={styles.tweet}>{data.description}</p>
                </div>
                <div className={styles.iconWrapper} onClick={handleDeleteTweet}>
                    <DeletIcon/>
                </div>
            </div>
        </div>
    )
}