import React, { useState, useEffect } from "react";

import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

const Tweets = props => {
  const {
    jwtAuthToken,
    history,
    isLoading,
    setIsLoading,
    initialTweets,
    onHomeScreen
  } = props;

  const [tweets, setTweets] = useState(props.initialTweets);

  useEffect(() => {
    const abortController = new AbortController(); //Using abortController for cleanup; in case user leaves page while request is in progress

    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtAuthToken}`, //Setting bearer authorization header to include the JWT token passed through props
        "Content-Type": "application/json"
      },
      signal: abortController.signal
    };

    if (onHomeScreen) {
      fetch("/tweet/all", fetchOptions)
        .then(data => data.json())
        .then(retrievedTweets => {
          setTweets(retrievedTweets);
          setIsLoading(false);
        });
    }

    return function tweetsCleanup() {
      abortController.abort();
    };
  });

  const LoadingComponent = () => <div className="loading">Loading</div>;

  const filteredTweets = tweets.filter(tweet => !tweet.isReply); //Filtering out all tweets that are replies to other tweets
  const tweetsToUse = onHomeScreen ? filteredTweets : tweets; //If I'm on the home screen I don't want to display tweets that are replies

  if (isLoading) {
    return <LoadingComponent />;
  } else
    return (
      <div className="tweets-container">
        {onHomeScreen && (
          <TweetInput
            jwtAuthToken={jwtAuthToken}
            setIsLoading={setIsLoading}
            url="/tweet/new"
          />
        )}
        {/* Destructuring the tweeter and text properties from each tweet document */}
        {tweetsToUse.map(({ tweeter, text, tweetId, replies }, index) => (
          <Tweet
            history={history}
            tweeter={tweeter.username}
            replies={replies}
            text={text}
            key={index}
            id={tweetId}
          />
        ))}
      </div>
    );
};
export default Tweets;
