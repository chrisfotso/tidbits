import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../download.png";

import Tweets from "./Tweets";

const Tweet = props => {
  const handleTweetClick = e => {
    if (
      e.target.classList.contains("tweet__icon") ||
      e.target.classList.contains("tweet__tweeter")
    ) {
      return;
    }

    props.history.push(`/tweet/${props.id}`);
  };

  return (
    <div className="tweet" onClick={handleTweetClick}>
      <div className="tweet__user-info">
        <img className="tweet__icon" src={Avatar} alt="Profile picture" />
        <Link
          to={`/${props.tweeter}`}
          style={{ textDecoration: "none", color: "#2f2f2f" }}
        >
          <div className="tweet__tweeter">{props.tweeter}</div>
        </Link>
      </div>
      <p className="tweet__text">{props.text}</p>
    </div>
  );
};

export default Tweet;
