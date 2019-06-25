import React, { useState, useEffect, Fragment } from "react";

import Tweet from "../Home/Tweet";
import Tweets from "../Home/Tweets";
import Header from "../Home/Header";

import Avatar from "../../download.png";

const UserInfo = props => {
  const { username, tweets, followers, following } = props;

  return (
    <div className="profile__overview">
      <div className="profile__intro">
        <img className="profile__icon" src={Avatar} alt="Profile picture" />
        <div className="profile__username">{username}</div>
      </div>
      <div className="profile__stats">
        <p className="profile__stat">
          <strong>{tweets.length}</strong> tidbits
        </p>
        <p className="profile__stat">
          <strong>{followers.length}</strong> followers
        </p>
        <p className="profile__stat">
          <strong>{following.length}</strong> following
        </p>
      </div>
    </div>
  );
};

const UserPage = props => {
  //Destructuring props to get the username param & history object from the route object and setJwtToken();
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
    //Querying backend with the username from the route param and setting state with the retrieved user object
    fetch(`/user/${paramsUsername}`)
      .then(data => data.json())
      .then(retrievedUser => setUser(retrievedUser))
      .finally(() => setIsLoading(false))
      .catch(err => console.log(err));
  }, [paramsUsername]);

  const LoadingComponent = () => <div className="loading">Loading</div>;

  return (
    <div className="profile">
      {isLoading ? (
        // Using ternary operator to conditionally render based on isLoading
        <LoadingComponent />
      ) : (
        <>
          <Header setJwtToken={setJwtToken} history={history} />
          <div className="profile__container">
            <UserInfo
              username={paramsUsername}
              tweets={user.tweets}
              followers={user.followers}
              following={user.following}
            />
            <Tweets
              initialTweets={user.tweets}
              onHomeScreen={false}
              history={history}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
