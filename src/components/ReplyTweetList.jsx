import ReplyTweetItem from "components/TweetItems/ReplyTweetItem"

const ReplyTweetList =({tweeetReplies})=>{
    const replyTweetList =  tweeetReplies.slice(0, -1).map((data) => {
        return(
            < ReplyTweetItem data={data} key={data.id} id={data.id}  />
        )
    });
    return(
        <div>
            {replyTweetList}
        </div>
    )
}


export default ReplyTweetList ;