import ReplyTweetItem from "components/TweetItems/ReplyTweetItem"

const ReplyTweetList =({replyTweets})=>{
    const replyTweetList =  replyTweets.map((data) => {
        return(
            < ReplyTweetItem data={data} key={data.id} id={data.id}/>
        )
    });
    return(
        <div>
            {replyTweetList}
        </div>
    )
}


export default ReplyTweetList ;