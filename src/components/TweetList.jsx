
import TweetItem from  "components/TweetItems/TweetItem"

export default function TweetList({tweets}) {
    const tweetsList =  tweets.map((data) => {
        const key = data.id;
        return(
            
            console.log(key),
            < TweetItem data={data} key={data.id}/>
        )
    });
    return( 
        <>
            <div>{tweetsList}</div>
        </>
    )
}