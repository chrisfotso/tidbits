import React from "react";

import Tweet from "./Tweet";

import dummyTweets from "../../dummyTweets";

const Tweets = () => (
  <div className="tweets-container">
    {dummyTweets.map(({ tweeter, text }, index) => (
      <Tweet tweeter={tweeter} text={text} key={index} />
    ))}
  </div>
);
export default Tweets;
