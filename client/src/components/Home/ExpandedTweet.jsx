import React, { useState, useEffect } from "react";

import Tweet from "./Tweet";
import Tweets from "./Tweets";
import Header from "./Header";

const ExpandedTweets = props => {
  const {
    history,
    jwtAuthToken,
    setJwtToken,
    match: {
      params: { tweetId }
    }
  } = props;

  const [parentTweet, setParentTweet] = useState({});
  const [childrenTweets, setChildrenTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("id", tweetId);
    const fetchOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtAuthToken}`, //Putting JWT token in request for verification
        Accept: "application/json"
      }
    };

    fetch(`/tweet/${tweetId}`, fetchOptions)
      .then(data => data.json())
      .then(retrievedTweet => {
        //Setting state with the retrieved data
        setParentTweet(retrievedTweet);
        setChildrenTweets(retrievedTweet.replies);
        console.log("retrieved", retrievedTweet);
        console.log("replies", retrievedTweet.replies);
      })
      .finally(() => setIsLoading(false))
      .catch(console.log);
  }, [tweetId]); //Effect only runs if these variables change

  if (isLoading)
    return (
      <div className="expanded">
        <div classname="loading">Loading</div>
      </div>
    );

  return (
    <div className="expanded">
      <Header setJwtToken={setJwtToken} history={history} />
      <div className="expanded__container">
        <Tweet
          jwtAuthToken={jwtAuthToken}
          tweeter={parentTweet.tweeter.username}
          text={parentTweet.text}
          id={parentTweet.tweetId}
          history={history}
        />
        <Tweets
          jwtAuthToken={jwtAuthToken}
          history={history}
          initialTweets={childrenTweets}
          onHomeScreen={false}
          // isLoading={isLoading}
          // setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default ExpandedTweets;
