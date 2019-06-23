import React, { useState, useEffect } from "react";

import Tweet from "../Home/Tweet";

import Avatar from "../../download.png";

const UserPage = props => {
  const { username: paramsUsername } = props.match.params;
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
    <div classname="profile">
      <img className="tweet__icon" src={Avatar} alt="Profile picture" />
      <div className="profile__username">{paramsUsername}</div>
      {user.tweets.map(({ text, tweetId }, index) => (
        <Tweet tweeter={paramsUsername} text={text} key={index} id={tweetId} />
      ))}
    </div>
  );
};

export default UserPage;
