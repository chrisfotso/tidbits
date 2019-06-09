import React from "react";
import Avatar from "../../download.png";

const Tweet = props => {
  return (
    <div className="tweet">
      <img className="tweet__icon" src={Avatar} alt="Profile picture" />
      <span className="tweet__info">
        <span className="tweet__tweeter">{props.tweeter}</span>
        <span className="tweet__text">{props.text}</span>
      </span>
    </div>
  );
};

export default Tweet;
