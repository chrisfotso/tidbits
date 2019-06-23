import React, { useState, useEffect } from "react";

import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

const Tweets = props => {
  const {
    jwtAuthToken,
    isLoading,
    setIsLoading,
    initialTweets,
    onHomeScreen
  } = props;
  const [tweets, setTweets] = useState(props.initialTweets);

  useEffect(() => {
    const abortController = new AbortController(); //Using abortController for cleanup; in case user leaves page while request is in progress

    if (!initialTweets.length) {
      const fetchOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtAuthToken}`, //Setting bearer authorization header to include the JWT token passed through props
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
    }

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
        {onHomeScreen && (
          <TweetInput
            jwtAuthToken={jwtAuthToken}
            setIsLoading={setIsLoading}
            url="/tweet/new"
          />
        )}
        {/* Destructuring the tweeter and text properties from each tweet document */}
        {tweets.map(({ tweeter, text, tweetId }, index) => (
          <Tweet
            tweeter={tweeter.username}
            text={text}
            key={index}
            id={tweetId}
          />
        ))}
      </div>
    );
};
export default Tweets;
