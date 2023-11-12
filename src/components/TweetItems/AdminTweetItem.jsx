import styles from "styles/AdminTweetItem.module.scss"
import {ReactComponent as DeleteIcon} from "icons/delete.svg"
import {DeleteTweet} from 'api/twitter'
//import Swal from "sweetalert2"

export default function AdminTweetItem({data}) {
    
    const handleDeleteTweet = async() =>{
        const id =data.id
        console.log(id)
        const res = await DeleteTweet({id})
        //確認輸出值
        console.log(res)
    }


    

    return(
        <div className={styles.tweetContainer} >
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
                    <p className={styles.tweet} >{data.description}</p>
                </div>
                <div className={styles.iconWrapper} onClick={handleDeleteTweet}>
                    <DeleteIcon/>
                </div>
            </div>
        </div>
    )
}