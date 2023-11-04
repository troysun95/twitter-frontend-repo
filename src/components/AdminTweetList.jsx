import AdminTweetItem from './TweetItems/AdminTweetItem.jsx'
import styles from "styles/AdminTweetList.module.scss"





export default function AdminTweetList({tweets, header}) {
    const tweetsList =  tweets.map((data) => {
    return(
        < AdminTweetItem data={data} key={data.id}/>
    )
        
        
        
    });
    return( 
        <>
            <div className={styles.headerContainer}>
                <h4>{header}</h4>
            </div>
            <div className={styles.mainContent}>{tweetsList}</div>
        </>
        
    )
}