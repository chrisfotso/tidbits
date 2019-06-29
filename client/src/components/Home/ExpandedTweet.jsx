import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from "../AuthContext";

import Tweet from "./Tweet";
import Tweets from "./Tweets";
import Header from "./Header";

const ExpandedTweets = props => {
  const {
    history,
    match: {
      params: { tweetId }
    }
  } = props;

  const { jwtAuthToken, setJwtToken } = useContext(AuthContext);

  const [parentTweet, setParentTweet] = useState({});
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        setParentTweet(retrievedTweet);
        setReplies(retrievedTweet.replies);
      })
      .finally(() => setIsLoading(false))
      .catch(console.log);
  }, [tweetId]); //Effect only runs if tweetId changes and thus the url changes

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
          initialTweets={replies}
          onHomeScreen={false}
        />
      </div>
    </div>
  );
};

export default ExpandedTweets;
