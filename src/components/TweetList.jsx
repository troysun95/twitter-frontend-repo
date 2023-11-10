
import TweetItem from  "components/TweetItems/TweetItem"

export default function TweetList({tweets}) {
    // tweets.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    // console.log(tweets)
    const tweetsList =  tweets.map((data) => {
        return(
            < TweetItem data={data} key={data.id} id={data.id}/>
        )
    });
    return( 
        <>
            <div>{tweetsList}</div>
        </>
    )
}