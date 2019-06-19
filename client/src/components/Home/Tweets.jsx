import React, { useState, useEffect } from "react";

import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

import dummyTweets from "../../dummyTweets";

const Tweets = props => {
  const [tweets, setTweets] = useState([]);

  const { jwtAuthToken, isLoading, setIsLoading } = props;

  useEffect(() => {
    //The function callback to useEffect is synchronous, so I have to define an async function inside of the effect and call it
    const getTweets = async () => {
      const fetchOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtAuthToken}`, //Setting authorization header to include the JWT token passed through props
          "Content-Type": "application/json"
        }
      };

      const data = await fetch("/tweet/all", fetchOptions);
      const retrievedTweets = await data.json();

      setTweets(retrievedTweets);
      setIsLoading(false);
    };

    getTweets();
  }, [isLoading]);

  const LoadingComponent = () => <div className="loading">Loading</div>;

  if (isLoading) {
    return <LoadingComponent />;
  } else
    return (
      <div className="tweets-container">
        <TweetInput jwtAuthToken={jwtAuthToken} setIsLoading={setIsLoading} />
        {tweets.map(({ tweeter, text }, index) => (
          <Tweet tweeter={tweeter.username} text={text} key={index} />
        ))}
      </div>
    );
};
export default Tweets;
