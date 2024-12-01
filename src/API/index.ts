import Axios from "axios";

const data= sessionStorage.getItem("username")

export const tweetsAPI = async () =>
  await Axios.get("http://localhost:8084/tweetservice/api/tweet/tweets");

export const recomendationsAPI = async () =>
  await Axios.get("http://127.0.0.1:8000/recomendations/");

export const trendingAPI = async () =>
  await Axios.get("http://127.0.0.1:8000/trending/");

export const notificationAPI = async () =>
  await Axios.get("http://127.0.0.1:8000/notifications");

export const userTweets= async () => 
  await Axios.get("http://localhost:8084/tweetservice/api/tweet/usertweets?username="+sessionStorage.getItem("username"));

