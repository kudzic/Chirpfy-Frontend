import { Link } from "react-router-dom";
import TweetMedia from "./tweetMedia";
import { Tweet } from "./interfaces";
import Axios from 'axios';
import { useEffect,useState } from "react";

import "./singleTweet.scss";


interface TweetProps {
  tweet: Tweet;
  liked:boolean;
  bookmark:boolean;
}

const userId =()=>{
  if(sessionStorage.length>0 && sessionStorage.getItem('id'))
  {
    return sessionStorage.getItem('id');
  }
}

function liking(id){
  try{
      Axios.get("http://localhost:8082/api/tweet/like?tweetid="+id+"&userId="+sessionStorage.getItem('id'));
      console.log("Tweet was succeful");
  }
  catch(err){
    console.log(err);
  }}


  function unlike(id : any){
    try{
      Axios.get("http://localhost:8084/tweetservice/api/tweet/unlike?tweetid="+id+"&userId="+sessionStorage.getItem('id'));
      console.log("Tweet unliked");
    }
    catch(err){
      console.log(err);
    }

  }

 

const SingleTweet = ({ tweet,liked,bookmark }: TweetProps) => {

 const [like,setLike]=useState(tweet.likes);
 const [isliked,setIsLiked]=useState(liked);

 useEffect(()=>{
  setTimeout(()=>{
    liking
  },3)
    setLike(like)
 },[])

 

 function likin(tweetId){
  if(isliked==false){
    liking(tweetId)
    setIsLiked(true)
    console.log("liked tweet");
    
  }
  else{ 
    unlike(tweetId)
    setIsLiked(false)
    console.log("unliked tweet");
  }
 }
 

  
  return (
    <article
      className="tweet-box px-4 py-3 duration-200 cursor-pointer"
      key={tweet.tweet_id}
    >
      <div className="flex flex-row">
        <div className="mr-3 w-12 h-12 rounded-full overflow-hidden shrink-0 relative btn-hover-primary">
        
          <div className="hover-profile absolute duration-200 w-full h-full inset-0"></div>
        </div>
        <div className="flex flex-col grow">
          <div className="flex justify-between mb-0.5">
            <div className="tweet-meta flex">
              <Link className="text-dark font-bold hover:underline" to="">
                {tweet.username}
              </Link>
              <p className="flex items-center ml-1">
                <span className="text-15px text-gray">@{tweet.full_name}</span>
                <span className="text-15px text-gray mx-1">.</span>

                <Link className="text-15px text-gray hover:underline" to="">
                  <time dateTime="2022-11-03T03:13:02.000Z">14h</time>
                </Link>
              </p>
            </div>
            <button
              className="flex items-center text-gray btn-hover-primary"
              type="button"
            >
              <div className="btn-icon relative">
                <div className="hover-effect"></div>
                <svg viewBox="0 0 24 24" width="19" height="19">
                  <g>
                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                  </g>
                </svg>
              </div>
            </button>
          </div>
          <div className="tweet-content">
            <p className="text-15px">
              <span>{tweet.text}</span>
              <br />
              {tweet.hashtags &&
                tweet.hashtags.map((hashtag) => (
                  <>
                    <span>
                      <Link
                        className="text-primary hover:underline font-bold"
                        to=""
                      >
                        #{hashtag.text}
                      </Link>
                    </span>
                    <br />
                  </>
                ))}
            </p>
          </div>

          {tweet.media && (
            <div className="flex flex-row rounded-2xl overflow-hidden mt-3">
              {tweet.media.map((media, index) => (
                <TweetMedia
                  media={media}
                  mediaNum={tweet.media.length}
                  mediaIndex={index}
                />
              ))}
            </div>
          )}
          <div className="tweet-actions flex justify-between mt-3">
            <button
              className="flex items-center text-gray btn-hover-primary"
              type="button"
            >
              <div className="btn-icon relative">
                <div className="hover-effect"></div>
                <svg viewBox="0 0 24 24" width="19" height="19">
                  <g>
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                  </g>
                </svg>
              </div>
              <span className="text-13px px-3">{tweet.replies}</span>
            </button>
            <button
              className="flex items-center text-gray btn-hover-sucsess"
              type="button"
            >
              <div className="btn-icon relative">
                <div className="hover-effect"></div>
                <svg viewBox="0 0 24 24" width="19" height="19">
                  <g>
                    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                  </g>
                </svg>
              </div>
              <span className="text-13px px-3">{tweet.retweet_count}</span>
            </button>
            <button
              className="flex items-center text-gray btn-hover-danger"
              type="button"
              onClick={()=>likin(tweet.tweet_id)}
            >
              <div className="btn-icon relative">
                <div className="hover-effect"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" viewBox="0 0 512 512">
                  <path fill={isliked ? "#ff0000":"none"} stroke={isliked?'none':'black'} strokeWidth={isliked? 0:35} d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                  </svg>
              </div>
              <span className="text-13px px-3" >{like}</span>
          
            </button>
            <button
              className="flex items-center text-gray btn-hover-primary"
              type="button"
              
            >
              <div className="btn-icon relative">
                <div className="hover-effect"></div>
                <svg viewBox="0 0 24 24" width="19" height="19">
                  <g>
                    <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path>
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SingleTweet;
