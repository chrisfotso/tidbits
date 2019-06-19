import React, { useState, useEffect } from "react";

import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

import dummyTweets from "../../dummyTweets";

const Tweets = props => {
  const [tweets, setTweets] = useState([]);

  const { jwtAuthToken, isLoading, setIsLoading } = props;

  useEffect(() => {
    const abortController = new AbortController(); //Using abortController for cleanup

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtAuthToken}`, //Setting authorization header to include the JWT token passed through props
        "Content-Type": "application/json"
      },
      signal: abortController.signal
    };

    fetch("/tweet/all", fetchOptions)
      .then(data => data.json())
      .then(retrievedTweets => {
        setTweets(retrievedTweets);
        setIsLoading(false);
      });

    return function tweetsCleanup() {
      abortController.abort();
    };
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
