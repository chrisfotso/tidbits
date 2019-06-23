import React, { useState, useEffect } from "react";

import Tweet from "../Home/Tweet";
import Tweets from "../Home/Tweets";
import Header from "../Home/Header";

import Avatar from "../../download.png";

const UserPage = props => {
  const {
    setJwtToken,
    history,
    match: {
      params: { username: paramsUsername }
    }
  } = props;

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/user/${paramsUsername}`)
      .then(data => data.json())
      .then(retrievedUser => setUser(retrievedUser))
      .finally(() => setIsLoading(false))
      .catch(err => console.log(err));
  }, [paramsUsername]);

  const LoadingComponent = () => <div className="loading">Loading</div>;

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="profile">
      <Header setJwtToken={setJwtToken} history={history} />
      <img className="tweet__icon" src={Avatar} alt="Profile picture" />
      <div className="profile__username">{paramsUsername}</div>
      <Tweets initialTweets={user.tweets} onHomeScreen={false} />
    </div>
  );
};

export default UserPage;
