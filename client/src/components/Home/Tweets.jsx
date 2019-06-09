import React, { useState, useEffect } from "react";

import Tweet from "./Tweet";

import dummyTweets from "../../dummyTweets";

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTweets = async () => {
      const data = await fetch("/tweet/all");
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
        {tweets.map(({ tweeter, text }, index) => (
          <Tweet tweeter={tweeter.username} text={text} key={index} />
        ))}
      </div>
    );
};
export default Tweets;
