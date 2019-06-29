import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import { AuthContext } from "../AuthContext";

import { Link } from "react-router-dom";
import Avatar from "../../download.png";

const Tweet = props => {
  const { jwtAuthToken } = useContext(AuthContext);
  const { id, tweeter, text, history } = props;

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

    history.push(`/tweet/${id}`);
  };

  const handleReplyClick = e => {
    const newReply = prompt(`Enter your reply to ${tweeter}`);

    if (newReply.length > 280) {
      return alert("Reply must be 280 characters or less");
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtAuthToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: newReply })
    };

    fetch(`/tweet/${id}/reply`, fetchOptions)
      .then(data => data.json())
      .finally(() => history.push(`/tweet/${id}`))
      .catch(console.log);
  };

  const handleLikeClick = e => console.log("like");

  return (
    <div className="tweet" onClick={handleTweetClick}>
      <div className="tweet__user-info">
        <img className="tweet__icon" src={Avatar} alt="Profile picture" />
        <Link
          to={`/${tweeter}`}
          style={{ textDecoration: "none", color: "#2f2f2f" }}
        >
          <div className="tweet__tweeter">{tweeter}</div>
        </Link>
      </div>
      <p className="tweet__text">{text}</p>
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

export default withRouter(Tweet);
