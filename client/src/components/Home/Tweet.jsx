import React from "react";

const Tweet = props => {
  return (
    <div className="tweets-container__tweet">
      <span className="tweet__tweeter">{props.tweeter}</span>
      <span className="tweet__text">{props.text}</span>
    </div>
  );
};

export default Tweet;
