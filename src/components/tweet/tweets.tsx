import { useEffect, useState } from "react";
import { tweetsAPI ,likingAPI } from "../../API";


import { Tweet } from "./interfaces";
import Loading from "../loading/loading";
import SingleTweet from "./singleTweet";

const Tweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const getTweets = () => {
    tweetsAPI()
      .then((res) => {
        setTweets(res.data);
        
        console.log(res.data);
      })
      .catch((error) => {
        setTweets([]);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      getTweets();
    }, 1500);
  }, []);
  return (
    <>
      {tweets.map((tweet) => (

        
    
        <SingleTweet tweet={tweet} liked={tweet.liked_userId.includes(sessionStorage.length>0 && sessionStorage.getItem("id"))} bookmark={false}  key={tweet.tweet_id} />
      ))}
      {!tweets.length && <Loading />}
    </>
  );
};

export default Tweets;
