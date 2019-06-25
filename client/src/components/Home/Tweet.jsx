import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Avatar from "../../download.png";

import Tweets from "./Tweets";

const Tweet = props => {
  const [redirectLink, setRedirectLink] = useState("");

  const handleTweetClick = e => {
    const classNames = [
      "tweet__icon",
      "tweet__tweeter",
      "tweet__reply",
      "tweet__like"
    ];

    if (classNames.some(className => e.target.classList.contains(className))) {
      return;
    }

    setRedirectLink(`/tweet/${props.id}`);
  };

  const handleReplyClick = e => {
    const newReply = prompt(`Enter your reply to ${props.tweeter}`);

    if (newReply.length > 280) {
      return alert("Reply must be 280 characters or less");
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.jwtAuthToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: newReply })
    };

    fetch(`/tweet/${props.id}/reply`, fetchOptions)
      .then(data => data.json())
      .finally(() => props.history.push(`/tweet/${props.id}`))
      .catch(console.log);
  };

  const handleLikeClick = e => console.log("like");

  if (redirectLink.length) {
    return <Redirect push to={redirectLink} />;
  }

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
      <div className="tweet__buttons">
        <button
          className="tweet__reply tweet__button"
          onClick={handleReplyClick}
        >
          Reply
        </button>
        <button className="tweet__like tweet__button" onClick={handleLikeClick}>
          Like
        </button>
      </div>
    </div>
  );
};

export default Tweet;
