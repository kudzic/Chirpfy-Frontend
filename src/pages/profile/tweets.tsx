import { useEffect, useState } from "react";
import { tweetsAPI ,userTweets } from "../../API";

import { Tweet } from "../../components/tweet/interfaces";
import Loading from "../../components/loading/loading";
import SingleTweet from "./singleTweet";

const Tweets = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const getTweets = () => {
    userTweets()
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
        <SingleTweet tweet={tweet} key={tweet.tweet_id} />
      ))}
      {!tweets.length && <Loading />}
    </>
  );
};

export default Tweets;
