import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../download.png";

const Tweet = props => {
  const displayTweet = e => {
    if (e.target.classList.contains("tweet")) {
      alert(props.id);
    }
  };

  return (
    <div className="tweet" onClick={displayTweet}>
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
