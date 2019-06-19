import React, { useState } from "react";
import { set } from "mongoose";

const TweetInput = props => {
  const [tweetText, setTweetText] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(140);

  const { jwtAuthToken, setIsLoading } = props;

  const handleChange = e => {
    const { value } = e.target;
    const { length } = value; //event.target.length — the length of the text in the input

    if (140 - length < 0) {
      setCharsRemaining(0); //Ensuring the character counter doesn't go below zero
      //Not calling setTweetText() because I don't want the user to type more than 140 chars
    } else {
      setCharsRemaining(140 - length);
      setTweetText(value);
    }
  };

  const handleSendTweet = async () => {
    setIsLoading(true);

    const reqBody = { text: tweetText };

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtAuthToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    };

    const data = await fetch("/tweet/new", fetchOptions);
    const result = await data.json();

    console.log(result);

    setTweetText("");
    setCharsRemaining(140);
    setIsLoading(false);

    return result;
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
      <button onClick={handleSendTweet}>Share</button>
    </div>
  );
};

export default TweetInput;
