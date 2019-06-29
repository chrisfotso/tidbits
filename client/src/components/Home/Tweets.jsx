import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

import Tweet from "./Tweet";
import TweetInput from "./TweetInput";

const Tweets = props => {
  const { history, initialTweets, onHomeScreen } = props;

  const { jwtAuthToken } = useContext(AuthContext);

  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } else {
      setTweets(initialTweets);
      setIsLoading(false);
    }

    return function tweetsCleanup() {
      abortController.abort();
    };
  });

  const filteredTweets = tweets.filter(tweet => !tweet.isReply); //Filtering out all tweets that are replies to other tweets
  const tweetsToUse = onHomeScreen ? filteredTweets : tweets; //If I'm on the home screen I don't want to display tweets that are replies

  if (isLoading) {
    return (
      <div className="tweets-container">
        <div className="loading">Loading</div>
      </div>
    );
  } else
    return (
      <div className="tweets-container">
        {onHomeScreen && ( //If I'm on the home screen I also want to show the tweet input component
          <TweetInput setIsLoading={setIsLoading} url="/tweet/new" />
        )}
        {/* Destructuring the tweeter and text properties from each tweet document */}
        {tweetsToUse.map(({ tweeter, text, tweetId, replies }, index) => (
          <Tweet
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
