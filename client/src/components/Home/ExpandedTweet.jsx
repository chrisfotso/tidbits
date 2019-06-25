import React, { useState, useEffect } from "react";

import Tweet from "./Tweet";
import Tweets from "./Tweets";

const ExpandedTweets = props => {
  const {
    history,
    jwtAuthToken,
    match: { params: tweetId }
  } = props;

  const [parentTweet, setParentTweet] = useState({});
  const [childrenTweets, setChildrenTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      Authorization: `Bearer ${jwtAuthToken}`
    };
    fetch(`/tweet/${tweetId}`, fetchOptions)
      .then(data => data.json)
      .then(retrievedTweet => {
        setParentTweet(retrievedTweet);
        setChildrenTweets(retrievedTweet.replies);
      })
      .finally(setIsLoading(false))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="expanded-tweet">
      <div className="expanded-tweet__container">
        <p>{JSON.stringify(parentTweet)}</p>
        {/* <Tweet
          tweeter={parentTweet.tweeter.username}
          text={parentTweet.text}
          id={parentTweet.tweetId}
          history={history}
        /> */}
      </div>
    </div>
  );
};

export default ExpandedTweets;
