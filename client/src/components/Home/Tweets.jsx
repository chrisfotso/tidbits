import React, { useState, useEffect } from "react";

import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

import dummyTweets from "../../dummyTweets";

const Tweets = props => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTweets = async () => {
      const fetchOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.jwtAuthToken}`,
          "Content-Type": "application/json"
        }
      };

      const data = await fetch("/tweet/all", fetchOptions);
      const retrievedTweets = await data.json();
      setTweets(retrievedTweets);
      setIsLoading(false);
    };

    getTweets();
  }, []);

  const LoadingComponent = () => <div className="loading">Loading</div>;

  if (isLoading) {
    return <LoadingComponent />;
  } else
    return (
      <div className="tweets-container">
        <TweetInput />
        {tweets.map(({ tweeter, text }, index) => (
          <Tweet tweeter={tweeter.username} text={text} key={index} />
        ))}
      </div>
    );
};
export default Tweets;
