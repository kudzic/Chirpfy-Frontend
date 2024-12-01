interface Media {
  media_key: string;
  media_url: {
    tiny: string;
    small: string;
  };
  alt_text: string | undefined;
}

interface Tweet {
  
  created_at: string;
  username:string;
  text: string;
  full_name:string;
  tweet_id:string;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  hashtags: Array<{
    text: string;
  }>;
  media: Media[];
  liked_userId: [];


}

export type { Tweet, Media };
