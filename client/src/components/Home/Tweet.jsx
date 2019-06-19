import React from "react";
import Avatar from "../../download.png";

const Tweet = props => {
  return (
    <div className="tweet">
      <div className="tweet__user-info">
        <img className="tweet__icon" src={Avatar} alt="Profile picture" />
        <div className="tweet__tweeter">{props.tweeter}</div>
      </div>
      <p className="tweet__text">{props.text}</p>
    </div>
  );
};

export default Tweet;
