import React, { useState } from "react";

const TweetInput = () => {
  const [tweetText, setTweetText] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(140);

  const handleChange = e => {
    const { value } = e.target;
    const { length } = value;

    setCharsRemaining(140 - length);
    setTweetText(value);
  };

  return (
    <div className="tweet-input">
      <input
        type="text"
        onChange={handleChange}
        value={tweetText}
        name="tweet-input"
        placeholder="Share a tidbit!"
        id=""
        className="tweet-input__input"
      />
      <p className="tweet-input__chars">{charsRemaining}</p>
    </div>
  );
};

export default TweetInput;
